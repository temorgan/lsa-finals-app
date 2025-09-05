// src/hooks/useMatchSelector.js
import { useMemo, useEffect, useState } from "react";
import { listFields, listTimesForField, findRow, splitTeams } from "../data/schedule";

export function useMatchSelector() {
    const [field, setField] = useState("");
    const [time, setTime]   = useState("");

    const fields = useMemo(() => listFields(), []);
    const times  = useMemo(() => (field ? listTimesForField(field) : []), [field]);

    const [summary, setSummary] = useState({ group: "", field: "", time: "", ref: "" });
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (!field || !time) {
            setTeams([]);
            setSummary({ group: "", field: "", time: "", ref: "" });
            return;
        }
        const row = findRow(field, time);
        if (!row) {
            setTeams([]);
            setSummary({ group: "", field, time, ref: "" });
        } else {
            setTeams(splitTeams(row[3]));
            setSummary({ group: row[4], field: row[1], time: row[2], ref: row[5] || "" });
        }
    }, [field, time]);

    const clear = () => { setField(""); setTime(""); };

    return { field, setField, time, setTime, fields, times, summary, teams, clear };
}
