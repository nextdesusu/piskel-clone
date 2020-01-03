export function extractColor(colorData){
    if (typeof colorData === "string"){
        return `#${colorData}`;
    } else if (colorData.length === 3) {
        return `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`;
    } else if (colorData.length === 4){
        const max = Math.max(...colorData);
        const opacity = colorData[3] / max;
        return `rgba(${colorData[0]}, ${colorData[1]}, ${colorData[2]}, ${opacity})`;
    }
}

export function normalizeColors(colorData){
    for (let i = 0; i < colorData.length; i++){
        for (let j = 0; j < colorData.length; j++){
            colorData[i][j] = extractColor(colorData[i][j]);
        }
    }
}

export function swapColorToBOrW(arr, i, j, k){
    const sum = arr[i] + arr[j] + arr[k];
    const avg = 382;
    const maxColor = 255;
    const minColor = 0;
    //765 382
    if (typeof sum !== "number"){
        throw Error(`Wrong type! ${typeof sum}`);
    }
    if (sum > avg){
        arr[i] = maxColor;
        arr[j] = maxColor;
        arr[k] = maxColor;
    } else {
        arr[i] = minColor;
        arr[j] = minColor;
        arr[k] = minColor;
    }
}