import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { loadState, saveState } from '../localStorage';

const persistedState = loadState();
console.log('starting with state:', persistedState);
const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    const newState = store.getState();
    //console.log('saving state!', newState);
    saveState(newState);
})

export default store;