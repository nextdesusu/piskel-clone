import {
    CHANGE_RESOLUTION,
    CHANGE_TOOL,
    CHANGE_COLOR,
} from '../consts';

export function changeResolution(newW, newH) {
    return {
        type: CHANGE_RESOLUTION,
        payload: {
            width: newW,
            height: newH,
        },
    }
}

export function changeTool(tool) {
    return {
        type: CHANGE_TOOL,
        payload: tool,
    }
}

export function changeColor(newColor) {
    return {
        type: CHANGE_COLOR,
        payload: Array.from(newColor),
    }
}