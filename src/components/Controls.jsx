import React from "react";

export default function Controls({ field, time, fields, times, onField, onTime }) {
    return (
        <div className="controls">
            <label className="control">
                <span className="control-label">Field</span>
                <select value={field} onChange={e => { onField(e.target.value); onTime(""); }}>
                    <option value="">Select Field</option>
                    {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </label>

            <label className="control">
                <span className="control-label">Time</span>
                <select value={time} onChange={e => onTime(e.target.value)} disabled={!field}>
                    <option value="">Select Time</option>
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </label>
        </div>
    );
}
