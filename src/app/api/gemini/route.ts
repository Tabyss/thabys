import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/firebaseConfig"; // Make sure your Firebase config is correct
import { collection, getDocs } from "firebase/firestore";

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDuhPZvDAxrrSNrsEfkRenWWJj8kaNtJuE");

export async function POST() {
    try {
        const wordSnap = await getDocs(collection(db, "Word"));
        const existingWords = wordSnap.docs.map((doc) =>
            doc.data().word?.toLowerCase()
        );
        const excludeList = existingWords.join(", ");

        const prompt = `Generate 5 academic English words suitable for an intermediate English learner that are NOT in the following list: ${excludeList}. 
        Return them in a JSON array with this structure:

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

Instructions:
- Generate exactly 5 formal English words used in academic writing.
- For each word, include:
  - "word": the English word.
  - "arti": its meaning in Bahasa Indonesia.
  - "spelling": phonetic spelling.
  - "type": part of speech (noun, verb, etc.).
  - "grammar": explanation of how this word is typically used in grammar (e.g., collocations, passive, formal tone).
  - "example": one full academic-style sentence in English + Indonesian translation.

Focus:
- Prioritize vocabulary and grammar patterns helpful for writing essays, papers, or formal discussions.
- Use clear and accurate academic contexts.
- Return only the JSON array. Do not include extra explanation.
`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
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
