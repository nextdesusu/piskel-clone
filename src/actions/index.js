import {
    CHANGE_RESOLUTION,
    CHANGE_TOOL,
    CHANGE_COLOR,
} from '../consts';

const OBJECT_TYPE = 'object';
const NUMBER_TYPE = 'number';

const requiredType = (funcName, type, target) => {
    if (typeof target !== type) {
        throw Error(`${funcName}: type have to be ${type}, instead got: ${typeof target}`);
    }
}

export function changeResolution(newRes) {
    requiredType('changeResolution', NUMBER_TYPE, newRes);
    return {
        type: CHANGE_RESOLUTION,
        payload: newRes,
    }
}

export function changeTool(toolId) {
    requiredType('changeTool', NUMBER_TYPE, toolId);
    return {
        type: CHANGE_TOOL,
        payload: toolId,
    }
}

export function changeColor(newColor) {
    requiredType('changeColor', OBJECT_TYPE, newColor);
    return {
        type: CHANGE_COLOR,
        payload: Array.from(newColor),
    }
}