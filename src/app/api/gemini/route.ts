// api/gemini.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    Timestamp,
    query,
    orderBy,
    limit,
} from "firebase/firestore";

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY_MS = 20000; // Penting: Lebih besar dari 18s yang disarankan
const API_TIMEOUT_MS = 30000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Gemini API call timed out")), ms)
        ),
    ]);
}

async function callGeminiWithRetry(
    prompt: string,
    retries = 0
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await withTimeout(
            model.generateContent(prompt),
            API_TIMEOUT_MS
        );
        const responseText =
            result.response.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            throw new Error("No valid response text from Gemini API");
        }
        return responseText;
    } catch (error: any) {
        const isQuotaError =
            error.status === 429 ||
            (error.response && error.response.status === 429);
        const isTimeoutError = error.message === "Gemini API call timed out";

        if ((isQuotaError || isTimeoutError) && retries < MAX_RETRIES) {
            const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, retries);
            console.warn(
                `[Retry Attempt ${retries + 1}/${MAX_RETRIES}]: ${
                    isQuotaError ? "Quota Exceeded" : "Timeout"
                }. Retrying in ${delay / 1000} seconds...`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
            return callGeminiWithRetry(prompt, retries + 1);
        } else {
            console.error(
                "Final Gemini API Error after retries:",
                error.message
            );
            throw error;
        }
    }
}

export async function POST() {
    try {
        const wordCollection = collection(db, "Word");

        // --- STRATEGI CACHING BARU: Coba ambil dari Firestore DULU ---
        const CACHE_MIN_WORDS = 5; // Jumlah kata minimum yang harus ada di cache Firestore

        // Ambil 5 kata terbaru dari Firestore (atau lebih, tergantung kebutuhan)
        const cachedWordsQuery = query(
            wordCollection,
            orderBy("createdAt", "desc"),
            limit(CACHE_MIN_WORDS)
        );
        const cachedSnapshot = await getDocs(cachedWordsQuery);
        const fetchedWordsFromCache = cachedSnapshot.docs.map((doc) =>
            doc.data()
        );

        // Jika kita memiliki cukup kata di Firestore, KEMBALIKAN dari sana!
        if (fetchedWordsFromCache.length >= CACHE_MIN_WORDS) {
            console.log(
                `[Cache Hit]: Returning ${CACHE_MIN_WORDS} words from Firestore.`
            );
            // Filter data agar sesuai dengan WordData (jika perlu penyesuaian)
            const wordsToReturn = fetchedWordsFromCache.map((data) => ({
                word: data.word,
                arti: data.arti,
                type: data.type,
                spelling: data.spelling,
                grammar: data.grammar || {}, // Pastikan grammar ada
                example: data.example || { en: "", id: "" },
            }));
            return NextResponse.json(wordsToReturn);
        }
        // --- AKHIR STRATEGI CACHING BARU ---

        // Jika tidak ada cukup di cache Firestore, baru panggil Gemini
        console.log("[Cache Miss]: Fetching new words from Gemini API.");
        const wordSnap = await getDocs(wordCollection);
        const existingWords = wordSnap.docs.map((doc) =>
            doc.data().word?.toLowerCase()
        );
        const maxExclude = 50; // Pertahankan ini untuk prompt yang lebih pendek
        const excludeList = existingWords.slice(-maxExclude).join(", ");

        const prompt = `Provide 5 formal academic English words for intermediate IELTS learners, excluding: ${excludeList}.
Format as JSON array of objects: {word, arti(Bahasa), spelling(phonetic), type(part of speech), grammar:{concept, explanation}, example:{en, id(Bahasa)}}.`;

        const responseText = await callGeminiWithRetry(prompt);

        const jsonMatch = responseText.match(/\[\s*{[\s\S]*}\s*\]/);
        if (!jsonMatch) {
            console.error(
                "Failed to extract JSON from response:",
                responseText
            );
            throw new Error("Failed to extract JSON from Gemini response");
        }

        const words = JSON.parse(jsonMatch[0]);

        // Simpan kata-kata baru ke Firestore
        for (const word of words) {
            await addDoc(wordCollection, {
                word: word.word,
                arti: word.arti,
                type: word.type,
                spelling: word.spelling,
                example: {
                    id: word.example.id,
                    en: word.example.en,
                },
                grammar: word.grammar || {}, // Pastikan grammar disimpan
                createdAt: Timestamp.now(),
            });
        }
        console.log("New words generated by Gemini and saved to Firestore.");

        return NextResponse.json(words);
    } catch (error: any) {
        console.error("Error in /api/gemini POST handler:", error.message);
        let status = 500;
        if (error.message.includes("timed out")) {
            status = 504;
        } else if (
            error.status === 429 ||
            (error.response && error.response.status === 429)
        ) {
            status = 429;
        }
        return NextResponse.json(
            {
                error:
                    error.message ||
                    "Failed to generate words due to an unknown error.",
            },
            { status: status }
        );
    }
}
