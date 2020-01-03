import {
    colorPickerTool,
    fillBucketTool,
    pencilTool,
    strokeTool,
} from './ToolFunctions';

export default function UseTool(options) {
    const { tool } = options;
    switch(tool){
        case 0:
            return fillBucketTool(options);
        case 1:
            return colorPickerTool(options);
        case 2:
            return pencilTool(options);
        case 3:
            return strokeTool(options);
        default:
            throw Error(`Unknown id of tool: ${tool}`);
    }
}