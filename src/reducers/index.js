import {
    CHANGE_RESOLUTION,
    CHANGE_TOOL,
    CHANGE_COLOR
} from '../consts';

const initialState = {
    resolution: 0,
    currentTool: 0,
    currentColor: new Uint8Array(4),
    previousColor: new Uint8Array(4),
};

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_RESOLUTION:
            return { ...state, resolution: action.payload };
        case CHANGE_TOOL:
            return { ...state, currentTool: action.payload };
        case CHANGE_COLOR:
            return { ...state, previousColor: state.currentColor, currentColor: action.payload };
        default:
            return state;
    }
};