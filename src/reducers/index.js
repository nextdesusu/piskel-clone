import {
    CHANGE_RESOLUTION,
    CHANGE_TOOL,
    CHANGE_COLOR
} from '../consts';

export default function rootReducer(state, action) {
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