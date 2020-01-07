import {
    colorPickerTool,
    fillBucketTool,
    pencilTool,
    strokeTool,
    eraseTool,
} from './ToolFunctions';

import {
    BUCKET_TOOL,
    COLOR_PICKER_TOOL,
    PENCIL_TOOL,
    STROKE_TOOL,
    ERASE_TOOL,
} from '../consts';

export default function UseTool(options) {
    const { tool } = options;
    switch(tool){
        case BUCKET_TOOL:
            return fillBucketTool(options);
        case COLOR_PICKER_TOOL:
            return colorPickerTool(options);
        case PENCIL_TOOL:
            return pencilTool(options);
        case STROKE_TOOL:
            return strokeTool(options);
        case ERASE_TOOL:
            return eraseTool(options);
        default:
            throw Error(`Unknown tool: ${tool}`);
    }
}