import { nonRecursiveFillBucket, bresenhamAlgorithm } from './Alghoritms';
import { extractColor } from './ColorFunctions';

export function colorPickerTool (options) {
    const {
        canvas,
        X,
        Y,
        setColor
    } = options;
    const ctx = canvas.getContext('2d');
    const colorData = ctx.getImageData(X, Y, 1, 1).data;
    const [ r, g, b, a ] = colorData;
    const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    function onEnd(event){
        setColor(newColor);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mouseup', onEnd);
}

export function fillBucketTool(options){
    const {
        canvas,
        pixelSize,
        color,
        width,
        height,
        X,
        Y
    } = options;
    const ctx = canvas.getContext('2d');
    const startX = Math.ceil(X / pixelSize) - 1;
    const startY = Math.ceil(Y / pixelSize) - 1;
    ctx.fillStyle = color;

    const toChange = ctx.getImageData(startX, startY, 1, 1).data;

    function checkMethod(x, y) {
        const toCompare = ctx.getImageData(x, y, 1, 1).data;
        const [ r1, g1, b1, a1 ] = toCompare;
        const [ r2, g2, b2, a2 ] = color;
        return;
    }

    function changeColor(x, y) {
        ctx.fillRect(x, y, 1, 1);
    }

    function onEnd(event){
        nonRecursiveFillBucket(changeColor, checkMethod, startX, startY, height, width);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mouseup', onEnd);
}

export function pencilTool(options) {
    const {
        canvas,
        pixelSize,
        color,
        X,
        Y
    } = options;

    const ctx = canvas.getContext('2d');
    const lineStartX = Math.ceil(X / pixelSize) - 1;
    const lineStartY = Math.ceil(Y / pixelSize) - 1;
    ctx.fillStyle = color;

    const colorSwapper = (x, y) => {
        const startX = x * pixelSize;
        const startY = y * pixelSize;
        ctx.fillRect(startX, startY, pixelSize, pixelSize);
    }

    const swapColor = (event) => {
        const eventEndX = event.offsetX;
        const eventEndY = event.offsetY;
        const lineEndX = Math.ceil(eventEndX / pixelSize) - 1;
        const lineEndY = Math.ceil(eventEndY / pixelSize) - 1;
        colorSwapper(lineEndX, lineEndY);
    }

    const onEnd = (event) => {
        canvas.removeEventListener('mousemove', swapColor);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mousemove', swapColor);
    canvas.addEventListener('mouseup', onEnd);
    colorSwapper(lineStartX, lineStartY);
}

export function strokeTool(options) {
    const {
        canvas,
        pixelSize,
        color,
        X,
        Y
    } = options;
    const ctx = canvas.getContext('2d');
    const lineStartX = Math.ceil(X / pixelSize) - 1;
    const lineStartY = Math.ceil(Y / pixelSize) - 1;
    ctx.fillStyle = color;

    const colorSwapper = (x, y) => {
        let startX = x * pixelSize, startY = y * pixelSize;
        ctx.fillRect(startX, startY, pixelSize, pixelSize);
    }

    const onEnd = (event) => {
        const eventEndX = event.offsetX;
        const eventEndY = event.offsetY;
        const lineEndX = Math.ceil(eventEndX / pixelSize) - 1;
        const lineEndY = Math.ceil(eventEndY / pixelSize) - 1;
        bresenhamAlgorithm(colorSwapper, lineStartX, lineStartY, lineEndX, lineEndY);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mouseup', onEnd);
}