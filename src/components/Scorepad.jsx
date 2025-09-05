import React from "react";

export default function ScorePad({ team, value, onMinus, onPlus, onPointerDown, onPointerUp }) {
    return (
        <div
            className="pad"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            <div className="team">{team}</div>
            <div className="score" aria-live="polite">{value}</div>
            <div className="controls-row">
                <button className="btn minus" onClick={(e)=>{e.stopPropagation(); onMinus();}} aria-label={`Minus 1 ${team}`}>−</button>
                <button className="btn plus" onClick={(e)=>{e.stopPropagation(); onPlus();}} aria-label={`Plus 1 ${team}`}>+1</button>
            </div>
        </div>
    );
}
