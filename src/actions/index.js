import {
    CHANGE_RESOLUTION,
    CHANGE_TOOL,
    CHANGE_COLOR,
} from '../consts';

export function changeResolution(newRes) {
    return {
        type: CHANGE_RESOLUTION,
        payload: newRes,
    }
}

export function changeTool(toolId) {
    return {
        type: CHANGE_TOOL,
        payload: toolId,
    }
}

export function changeColor(newColor) {
    return {
        type: CHANGE_COLOR,
        payload: newColor,
    }
}