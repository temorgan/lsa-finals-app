import React from "react";

export default function SummaryChips({ summary, fallbackField, fallbackTime }) {
    if (!fallbackField || !fallbackTime) return null;

    return (
        <div className="row" style={{ marginTop: 10 }}>
      <span className="pill">
        Group: <span className="strong">{summary.group || "—"}</span>
      </span>
            <span className="pill">Field: {summary.field || fallbackField}</span>
            <span className="pill">Time: {summary.time || fallbackTime}</span>
            <span className="pill">Ref: {summary.ref || "—"}</span>
        </div>
    );
}
