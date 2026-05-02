export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}