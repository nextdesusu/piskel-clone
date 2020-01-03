export function loadState() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return false;
        return JSON.parse(serializedState);
    } catch (err) {
        return false;
    }
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
        return true;
    } catch (err) {
        return false;
    }
}