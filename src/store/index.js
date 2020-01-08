import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { PENCIL_TOOL } from '../consts';
import {
    loadState,
    saveState,
} from '../localStorage';

const persistedState = loadState() || {};

const initialState = {
    resolution: {
        width: 4,
        height: 4,
    },
    currentTool: PENCIL_TOOL,
    currentColor: [0, 0, 0, 255],
    previousColor: [255, 255, 255, 255],
};

const finalStore = {
    ...initialState,
    ...persistedState,
};

console.log('starting width store', finalStore)

const store = createStore(
    rootReducer,
    finalStore,
);

store.subscribe(() => {
    const newState = store.getState();
    saveState(newState);
})

export default store;