export function nonRecursiveFillBucket(changeColor, checkMethod, startX, startY, h, w) {
    if (startY < 0 || startY > h - 1 || startX< 0 || startX > w - 1 || !checkMethod) return;

    const stack = [[startX, startY], ];
    while (stack.length > 0){
        let point = stack.pop();
        let [x, y] = point;

        if (y < 0 || y > h - 1 || x < 0 || x > w - 1) continue;

        if (!checkMethod(x, y)){
            changeColor(x, y)
            stack.push([x + 1, y]);
            stack.push([x - 1, y]);
            stack.push([x, y + 1]);
            stack.push([x, y - 1]);
        }
    }
}

export function bresenhamAlgorithm(cb, x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    let condition = true;

    while(condition) {
        cb(x0, y0); // Do what you need to for this
 
        if ((x0 === x1) && (y0 === y1)) {
            condition = false;
        }

        let e2 = 2*err;
        if (e2 > -dy) { err -= dy; x0  += sx; }
        if (e2 < dx) { err += dx; y0  += sy; }
    }
}