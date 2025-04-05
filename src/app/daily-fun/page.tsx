"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from "firebase/firestore";
import "./style.scss";

const DailyFunNews = () => {
    const [dailyUpdates, setDailyUpdates] = useState<{ id: string; text: string; datetime: Timestamp }[]>([]);
    const [newText, setNewText] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const dailyRef = collection(db, "Daily");
            const q = query(dailyRef, orderBy("datetime", "desc"));
            const querySnapshot = await getDocs(q);

            const updates = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text,
                    datetime: data.datetime
                };
            });

            setDailyUpdates(updates);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const applyMasonry = () => {
            if (!listRef.current) return;
            const containerWidth = listRef.current.clientWidth;
            const itemWidth = 250;
            const numColumns = Math.max(1, Math.floor(containerWidth / itemWidth));
            
            let columnHeights = new Array(numColumns).fill(0); 
            
            const items = Array.from(listRef.current.children) as HTMLDivElement[];
            
            items.forEach((item) => {
                let minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

                console.log(minColumnIndex)

                item.style.gridColumnStart = String(minColumnIndex + 1);
                const rowHeight = 20; 
                item.style.gridRowEnd = `span ${Math.ceil(item.clientHeight / rowHeight)}`;

                columnHeights[minColumnIndex] += item.clientHeight;
            });

            console.log("Columns:", numColumns, "Column Heights:", columnHeights);
        };

        setTimeout(applyMasonry, 100);
        window.addEventListener("resize", applyMasonry);
        return () => window.removeEventListener("resize", applyMasonry);
    }, [dailyUpdates]);

    const handleAdd = async () => {
        if (!newText.trim()) return;

        const newEntry = {
            text: newText,
            datetime: Timestamp.now(),
        };

        const docRef = await addDoc(collection(db, "Daily"), newEntry);

        setDailyUpdates((prev) => [{ id: docRef.id, ...newEntry }, ...prev]);
        setNewText("");
    };

    return (
        <div className="daily">
            <h1>Daily Fun News</h1>

            <div className="input">
                <textarea
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="What fun Today!!!"
                />
                <div className="button">
                    <div className="shadow"></div>
                    <button onClick={handleAdd} className="bg-blue-500 text-white p-2 mt-2 rounded">
                        Add Entry
                    </button>
                </div>
            </div>

            <div className="list" ref={listRef}>
                {dailyUpdates.map((update, i) => (
                    <div key={update.id} className={`list-item-${i+1}`}>
                        <p className="text">{update.text}</p>
                        <p className="date">
                            {update.datetime.toDate().toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyFunNews;
