// src/hooks/useLocalResults.js
import { useState } from "react";

const KEY = "lsa-results";

export function useLocalResults() {
    const [toast, setToast] = useState(null);

    const save = (payload) => {
        const list = JSON.parse(localStorage.getItem(KEY) || "[]");
        list.unshift(payload);
        localStorage.setItem(KEY, JSON.stringify(list));
        setToast({ text: "Saved. Tap to undo.", data: payload });
    };

    const undo = () => {
        if (!toast?.data) return;
        const list = JSON.parse(localStorage.getItem(KEY) || "[]");
        const idx = list.findIndex(x => x.ts === toast.data.ts);
        if (idx > -1) {
            list.splice(idx, 1);
            localStorage.setItem(KEY, JSON.stringify(list));
        }
        setToast(null);
    };

    return { toast, save, undo, clearToast: () => setToast(null) };
}
