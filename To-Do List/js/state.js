import { getFromStorage, saveToStorage } from "./storage.js";

export const state = {
    todos: getFromStorage("todos", []),
    filter: getFromStorage("filter", "all")
};

export function saveTodos() {
    saveToStorage("todos", state.todos);
}

export function saveFilter() {
    saveToStorage("filter", state.filter);
}