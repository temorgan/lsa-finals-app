import React, { useMemo, useRef, useState, useEffect } from "react";
import "./App.css";

import { listFields, listTimesForField, findRow, splitTeams } from "./data/schedule";
import { useBeep } from "./hooks/useBeep";
import { saveResult, removeResult } from "./lib/storage";

import Controls from "./components/Controls";
import ScorePad from "./components/ScorePad";
import SummaryChips from "./components/SummaryChips";

export default function App() {
    const [field, setField] = useState("");
    const [time, setTime] = useState("");
    const [summary, setSummary] = useState({ group: "", field: "", time: "", ref: "" });
    const [teams, setTeams] = useState([]);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [toast, setToast] = useState(null);

    const beep = useBeep();

    const fields = useMemo(() => listFields(), []);
    const times  = useMemo(() => field ? listTimesForField(field) : [], [field]);

    // when field/time changes, derive summary & teams
    useEffect(() => {
        if (!field || !time) {
            setTeams([]);
            setSummary({ group: "", field: "", time: "", ref: "" });
            setA(0); setB(0);
            return;
        }
        const row = findRow(field, time);
        if (row) {
            setTeams(splitTeams(row[3]));
            setSummary({ group: row[4], field: row[1], time: row[2], ref: row[5] || "" });
        } else {
            setTeams([]);
            setSummary({ group: "", field, time, ref: "" });
        }
        setA(0); setB(0);
    }, [field, time]);

    // haptic/sonic nudge
    const vibrate = (ms = 15) => { if (navigator.vibrate) try { navigator.vibrate(ms); } catch {} };
    const nudge = () => { beep(); vibrate(); };

    // score adjusters (+/- & long-press)
    const adjust = (which, delta) => {
        if (which === "A") setA(v => Math.max(0, v + delta));
        else setB(v => Math.max(0, v + delta));
        nudge();
    };
    const pressTimer = useRef(null);
    const onPadDown = (which) => {
        pressTimer.current = setTimeout(() => { adjust(which, -1); pressTimer.current = null; }, 450);
    };
    const onPadUp = (which) => {
        if (pressTimer.current) { clearTimeout(pressTimer.current); pressTimer.current = null; adjust(which, +1); }
    };

    // save/undo
    const submit = () => {
        if (!teams.length) return;
        const payload = {
            group: summary.group, field, time, ref: summary.ref,
            match: teams.join(" v "), score: `${a}-${b}`, ts: Date.now()
        };
        saveResult(payload);
        setToast({ text: "Saved. Tap to undo.", data: payload });
        setA(0); setB(0);
    };
    const undo = () => {
        if (toast?.data?.ts) removeResult(toast.data.ts);
        setToast(null);
    };

    const canScore = teams.length === 2;

    return (
        <main>
            <section className="card">
                <Controls
                    field={field} time={time}
                    fields={fields} times={times}
                    onField={setField} onTime={setTime}
                />

                <SummaryChips summary={summary} fallbackField={field} fallbackTime={time} />

                {canScore && (
                    <div className="scorePadWrap">
                        <ScorePad
                            team={teams[0]} value={a}
                            onMinus={() => adjust("A", -1)} onPlus={() => adjust("A", +1)}
                            onPointerDown={() => onPadDown("A")} onPointerUp={() => onPadUp("A")}
                        />
                        <div className="divider">–</div>
                        <ScorePad
                            team={teams[1]} value={b}
                            onMinus={() => adjust("B", -1)} onPlus={() => adjust("B", +1)}
                            onPointerDown={() => onPadDown("B")} onPointerUp={() => onPadUp("B")}
                        />
                    </div>
                )}

                <div className="row" style={{ marginTop: 12 }}>
                    <button
                        className="btn clear"
                        onClick={() => { setField(""); setTime(""); setTeams([]); setA(0); setB(0); }}
                    >
                        Clear
                    </button>
                    <button className="btn submit" disabled={!canScore} onClick={submit}>
                        Submit Result
                    </button>
                </div>
            </section>

            {toast && <div className="toast" onClick={undo}>{toast.text}</div>}
        </main>
    );
}
