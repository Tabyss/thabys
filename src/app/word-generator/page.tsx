"use client";
import { useState } from "react";
import './style.scss'
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { MdFormatListBulleted } from "react-icons/md";

type WordData = {
    word: string;
    arti: string;
    type: string;
    spelling: string;
    example: {
        id: string,
        en: string
    };
};

export default function Generate() {
    const [words, setWords] = useState<WordData[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchWords = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/gemini", { method: "POST" });

            if (!res.ok) {
                throw new Error(`API request failed with status ${res.status}`);
            }

            const data: WordData[] = await res.json();
            setWords(data);

            const wordCollection = collection(db, "Word");
            for (const word of data) {
                await addDoc(wordCollection, {
                    word: word.word,
                    arti: word.arti,
                    type: word.type,
                    spelling: word.spelling,
                    example: {
                        id: word.example.id,
                        en: word.example.en
                    },
                    createdAt: Timestamp.now(),
                });
            }

            console.log("Words (with timestamps) saved to Firestore");
        } catch (error) {
            console.error("Error saving words:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSavedWords = async () => {
        setLoading(true);
        try {
            const wordCollection = collection(db, "Word");
            const snapshot = await getDocs(wordCollection);
            const savedWords: WordData[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    word: data.word,
                    arti: data.arti,
                    type: data.type,
                    spelling: data.spelling,
                    example: data.example || { en: "", id: "" },
                };
            });
            setWords(savedWords);
            console.log("Loaded saved words from Firestore");
        } catch (error) {
            console.error("Error fetching saved words:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="generator">
            <h1 className="generator-title">Daily English Words</h1>
            <div className="generator-btn">
                <div className="button text">
                    <div className="shadow"></div>
                    <button onClick={fetchWords} disabled={loading}>
                        {loading ? "Loading..." : "Learn Words"}
                    </button>
                </div>
                <div className="button icon">
                    <div className="shadow"></div>
                    <button onClick={fetchSavedWords} disabled={loading}>
                        <MdFormatListBulleted />
                    </button>
                </div>
            </div>
            <div className="generator-word">
                {words.map((word, index) => (
                    <div key={index} className="card">
                        <strong>{word.word}</strong>
                        <div className="card-text-arti">
                            <div className="card-text-arti-spell">
                                <em>[{word.spelling}]</em>
                                <p> · {word.type}</p>
                            </div>
                            <p className="card-text-1">{word.arti}</p>
                        </div>
                        <div className="card-text-ex">
                            <p>
                                <span className="font-medium">[Ex.] </span>
                                <span className="font-medium">{word.example.en}</span><br />
                                <span className="font-medium-outline">({word.example.id})</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
