import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/firebaseConfig"; // Make sure your Firebase config is correct
import { collection, getDocs } from "firebase/firestore";

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST() {
    try {
        const wordSnap = await getDocs(collection(db, "Word"));
        const existingWords = wordSnap.docs.map((doc) =>
            doc.data().word?.toLowerCase()
        );
        const maxExclude = 100;
        const excludeList = existingWords.slice(-maxExclude).join(", ");

          const prompt = `Generate 5 formal academic English words suitable for intermediate IELTS learners that are NOT in this list: ${excludeList}.

  Return ONLY a JSON array like:

  [
    {
      "word": "Significant",
      "arti": "Penting; memiliki dampak atau arti yang besar.",
      "spelling": "sig-NIF-uh-kunt",
      "type": "Adjective",
      "grammar": {
        "concept": "Adjective usage in academic writing",
        "explanation": "Often used before nouns to emphasize importance, e.g., 'a significant difference'."
      },
      "example": {
        "en": "There was a significant improvement in student performance.",
        "id": "Terdapat peningkatan yang signifikan dalam performa siswa."
      }
    }
  ]

  Requirements:
  - Include exactly 5 academic English words.
  - Each word must include: meaning in Bahasa, phonetic spelling, part of speech, grammar usage, and one example with ID translation.
  - Focus on words helpful for essays, papers, and formal discussions.
  - Output JSON only. No explanation.`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
            return Promise.race([
                promise,
                new Promise<never>((_, reject) =>
                    setTimeout(
                        () => reject(new Error("Gemini API call timed out")),
                        ms
                    )
                ),
            ]);
        }

        const result = await withTimeout(model.generateContent(prompt), 15000);
        const responseText =
            result.response.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            throw new Error("No response from Gemini API");
        }

        const jsonMatch = responseText.match(/\[\s*{[\s\S]*}\s*\]/);
        if (!jsonMatch) {
            throw new Error("Failed to extract JSON from response");
        }

        const words = JSON.parse(jsonMatch[0]);

        return NextResponse.json(words);
    } catch (error) {
        const err = error as Error;
        console.error("Gemini API Error:", err.message);
        return NextResponse.json(
            { error: err.message || "Failed to fetch words" },
            { status: 500 }
        );
    }
}
