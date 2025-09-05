// Date, Field, Time, Match, Group, Ref
export const ROWS = [
    ["Saturday, Sept 6, 2025","Field 4","8:00","Celtics v Chievo","PEW","Wilson"],
    ["Saturday, Sept 6, 2025","Field 5","8:00","Rangers v Norwich","PEW","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","8:00","Spurs v Real","ATM","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","8:45","Inter v Hearts","PEW","Wilson"],
    ["Saturday, Sept 6, 2025","Field 5","8:45","Palace v Ducks","PEW","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","8:45","United v Chievo","GAT","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","9:30","Rangers v Celtics","GPE","Mo"],
    ["Saturday, Sept 6, 2025","Field 5","9:30","Parma v Spurs","GPE","Jean"],
    ["Saturday, Sept 6, 2025","Field 4","10:15","Celtics v Inter","PEW","Mo"],
    ["Saturday, Sept 6, 2025","Field 5","10:15","Rangers v Ducks","PEW","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","10:15","Celtics v Real","ATM","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","11:00","Norwich v Chievo","PEW","Mo"],
    ["Saturday, Sept 6, 2025","Field 5","11:00","Palace v Hearts","PEW","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","11:00","United v Milan","ATM","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","11:45","Rangers v Spurs","GPE","Mo"],
    ["Saturday, Sept 6, 2025","Field 5","11:45","Parma v Celtics","GPE","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","11:45","Rangers v Chelsea","ATM","Stacey"],
    ["Saturday, Sept 6, 2025","Field 2","12:30","United v Spurs","ATM","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","12:30","Chelsea v Norwich","GAT","Wilson"],
    ["Saturday, Sept 6, 2025","Field 5","12:30","Palace v Chievo","GAT","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","13:15","Chelsea v Milan","ATM","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","13:15","United v Real","GAT","Wilson"],
    ["Saturday, Sept 6, 2025","Field 5","13:15","Rangers v Real","ATM","Jean"],
    ["Saturday, Sept 6, 2025","Field 4","14:00","Celtics v Palace","PEW","Wilson"],
    ["Saturday, Sept 6, 2025","Field 5","14:00","Rangers v Inter","PEW","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","14:00","Palace v Chelsea","GAT","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","14:45","Norwich v Hearts","PEW","Wilson"],
    ["Saturday, Sept 6, 2025","Field 5","14:45","Chievo v Ducks","PEW","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","14:45","United v Norwich","GAT","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","15:30","Rangers v Parma","GPE","Mo"],
    ["Saturday, Sept 6, 2025","Field 5","15:30","Spurs v Celtics","GPE","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","15:30","Chelsea v Celtics","ATM","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","16:15","Rangers v Spurs","ATM","Mo"],
    ["Saturday, Sept 6, 2025","Field 5","16:15","Milan v Real","ATM","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","16:15","Palace v Real","GAT","Stacey"],
    ["Saturday, Sept 6, 2025","Field 4","17:00","Chievo v Chelsea","GAT","Mo"],
    ["Saturday, Sept 6, 2025","Field 5","17:00","United v Celtics","ATM","Jean"],
    ["Saturday, Sept 6, 2025","Field 2","17:00","Chelsea v Celtics","ATM","Stacey"],
];

// Helpers focused on this dataset
export const listFields = () => Array.from(new Set(ROWS.map(r => r[1])));
export const listTimesForField = (field) =>
    Array.from(new Set(ROWS.filter(r => r[1] === field).map(r => r[2])));
export const findRow = (field, time) =>
    ROWS.find(r => r[1] === field && r[2] === time) || null;
export const splitTeams = (s = "") => {
    const [a = "", b = ""] = s.split(" v ");
    return [a, b];
};
