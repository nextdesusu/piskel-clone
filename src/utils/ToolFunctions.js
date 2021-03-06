import { nonRecursiveFillBucket, bresenhamAlgorithm } from './Alghoritms';

const getPixelCoords = (coords, del) => Math.ceil((coords) / del) - 1;

export function colorPickerTool(options) {
    const {
        canvas,
        X,
        Y,
        setColor
    } = options;
    const ctx = canvas.getContext('2d');
    const colorData = ctx.getImageData(X, Y, 1, 1).data;
    function onEnd(event){
        setColor(colorData);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mouseup', onEnd);
}

export function paintAllSameColor(options) {
    const {
        canvas,
        width,
        height,
        color
    } = options;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    function onEnd(event){
        ctx.fillRect(0, 0, width, height);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mouseup', onEnd);
}

export function fillBucketTool(options){
    const {
        canvas,
        pixelSizeX,
        pixelSizeY,
        color,
        width,
        height,
        delX,
        delY,
        X,
        Y
    } = options;
    const ctx = canvas.getContext('2d');
    const startX = getPixelCoords(X, delX);
    const startY = getPixelCoords(Y, delY);
    const calcW =  width / pixelSizeX;
    const calcH = height / pixelSizeY;
    const toChange = ctx.getImageData(X, Y, 1, 1).data;
    ctx.fillStyle = color;

    const isArrsEqual = (arr1, arr2) => {
        const [ r1, g1, b1, a1 ] = arr1;
        const [ r2, g2, b2, a2 ] = arr2;
        return ((r1 === r2) && (g1 === g2) && (b1 === b2) && (a1 === a2));
    }

    const shouldPaint = (x, y) => {
        const startX = x * pixelSizeX;
        const startY = y * pixelSizeY;
        const toCompare = ctx.getImageData(startX, startY, 1, 1).data;
        return isArrsEqual(toChange, toCompare);
    }

    const colorSwapper = (x, y) => {
        const startX = x * pixelSizeX;
        const startY = y * pixelSizeY;
        ctx.fillRect(startX, startY, pixelSizeX, pixelSizeY);
    }

    const onEnd = (event) => {
        nonRecursiveFillBucket(colorSwapper, shouldPaint, startX, startY, calcH, calcW);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mouseup', onEnd);
}

export function pencilTool(options) {
    const {
        canvas,
        pixelSizeX,
        pixelSizeY,
        color,
        delX,
        delY,
        X,
        Y
    } = options;
    const ctx = canvas.getContext('2d');
    const lineStartX = getPixelCoords(X, delX);
    const lineStartY = getPixelCoords(Y, delY);
    ctx.fillStyle = color;

    const colorSwapper = (x, y) => {
        const startX = x * pixelSizeX;
        const startY = y * pixelSizeY;
        ctx.fillRect(startX, startY, pixelSizeX, pixelSizeY);
    }

    const swapColor = (event) => {
        const eventEndX = event.offsetX;
        const eventEndY = event.offsetY;
        const lineEndX = getPixelCoords(eventEndX, delX);
        const lineEndY = getPixelCoords(eventEndY, delY);
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
        pixelSizeX,
        pixelSizeY,
        color,
        delX,
        delY,
        X,
        Y
    } = options;
    const ctx = canvas.getContext('2d');
    const lineStartX = getPixelCoords(X, delX);
    const lineStartY = getPixelCoords(Y, delY);
    ctx.fillStyle = color;

    const colorSwapper = (x, y) => {
        const startX = x * pixelSizeX;
        const startY = y * pixelSizeY;
        ctx.fillRect(startX, startY, pixelSizeX, pixelSizeY);
    }

    const onEnd = (event) => {
        const eventEndX = event.offsetX;
        const eventEndY = event.offsetY;
        const lineEndX = getPixelCoords(eventEndX, delX);
        const lineEndY = getPixelCoords(eventEndY, delY);;
        bresenhamAlgorithm(colorSwapper, lineStartX, lineStartY, lineEndX, lineEndY);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mouseup', onEnd);
}

export function eraseTool(options) {
    const {
        canvas,
        pixelSizeX,
        pixelSizeY,
        color,
        delX,
        delY,
        X,
        Y
    } = options;

    const ctx = canvas.getContext('2d');
    const lineStartX = getPixelCoords(X, delX);
    const lineStartY = getPixelCoords(Y, delY);;
    ctx.fillStyle = color;

    const colorErase = (x, y) => {
        const startX = x * pixelSizeX;
        const startY = y * pixelSizeY;
        ctx.clearRect(startX, startY, pixelSizeX, pixelSizeY);
    }

    const eraser = (event) => {
        const eventEndX = event.offsetX;
        const eventEndY = event.offsetY;
        const lineEndX = getPixelCoords(eventEndX, delX);
        const lineEndY = getPixelCoords(eventEndY, delY);
        colorErase(lineEndX, lineEndY);
    }

    const onEnd = (event) => {
        canvas.removeEventListener('mousemove', eraser);
        canvas.removeEventListener('mouseup', onEnd);
    }

    canvas.addEventListener('mousemove', eraser);
    canvas.addEventListener('mouseup', onEnd);
    colorErase(lineStartX, lineStartY);
}