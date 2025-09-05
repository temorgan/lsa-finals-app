import { useEffect, useRef } from "react";

export function useBeep() {
    const ctxRef = useRef(null);

    useEffect(() => {
        return () => {
            if (ctxRef.current) {
                try { ctxRef.current.close(); } catch {}
            }
        };
    }, []);

    return () => {
        if (!ctxRef.current) {
            try {
                ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            } catch {
                return;
            }
        }
        const ctx = ctxRef.current;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 880;
        g.gain.value = 0.0001;
        o.connect(g).connect(ctx.destination);
        o.start();
        const now = ctx.currentTime;
        g.gain.setValueAtTime(0.02, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        o.stop(now + 0.1);
    };
}
