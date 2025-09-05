const KEY = "lsa-results";

// push newest on top, return updated list
export function saveResult(payload) {
    const list = getResults();
    list.unshift(payload);
    localStorage.setItem(KEY, JSON.stringify(list));
    return list;
}

export function getResults() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
}

export function removeResult(ts) {
    const list = getResults();
    const idx = list.findIndex(x => x.ts === ts);
    if (idx > -1) list.splice(idx, 1);
    localStorage.setItem(KEY, JSON.stringify(list));
    return list;
}
