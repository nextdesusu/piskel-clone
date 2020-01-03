import {
    CHANGE_RESOLUTION,
    CHANGE_TOOL,
    CHANGE_COLOR
} from '../consts';

const initialState = {
    resolution: '',
    currentTool: '',
    currentColor: '',
    previousColor: '',
};

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_RESOLUTION:
            return { ...state, workingOn: action.payload }
        case CHANGE_TOOL:
            return { ...state, currentTool: action.payload }
        case CHANGE_COLOR:
            return { ...state, previousColor: state.currentColor, currentColor: action.payload }
        default:
            return state;
    }
};