// src/hooks/useScorePads.js
import { useRef, useState } from "react";
import { useBeep } from "./useBeep";

export function useScorePads() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    const beep = useBeep();
    const vibrate = (ms = 15) => { if (navigator.vibrate) try { navigator.vibrate(ms); } catch {} };
    const nudge = () => { beep(); vibrate(); };

    const adjust = (which, delta) => {
        if (which === "A") setA(v => Math.max(0, v + delta));
        else               setB(v => Math.max(0, v + delta));
        nudge();
    };

    // long-press: first tap decrements after hold; otherwise increment on release
    const pressTimer = useRef(null);
    const onPadDown = (which) => {
        pressTimer.current = setTimeout(() => {
            adjust(which, -1);
            pressTimer.current = null;
        }, 450);
    };
    const onPadUp = (which) => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
            adjust(which, +1);
        }
    };

    const resetScores = () => { setA(0); setB(0); };

    return { a, b, adjust, onPadDown, onPadUp, resetScores };
}
