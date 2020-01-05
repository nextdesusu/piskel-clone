export function nonRecursiveFillBucketOld(paint, shouldPaint, startX, startY, h, w) {
    if (startY < 0 || startY > h - 1 || startX< 0 || startX > w - 1 || !shouldPaint(startX, startY)) return;
    const visited = new Set();
    const stack = [[startX, startY], ];
    while (stack.length > 0){
        let point = stack.pop();
        let [x, y] = point;

        if (y < 0 || y > h - 1 || x < 0 || x > w - 1) continue;
        if (shouldPaint(x, y)){
            paint(x, y);
            const p1 = [x + 1, y];
            if (!visited.has(p1)) {
                stack.push(p1);
                visited.add(p1);
            }
            const p2 = [x, y + 1];
            if (!visited.has(p2)){
                stack.push(p2);
                visited.add(p2);
            }
            const p3 = [x - 1, y];
            if (!visited.has(p3)){
                stack.push(p3);
                visited.add(p3);
            }
            const p4 = [x, y - 1];
            if (!visited.has(p4)){
                stack.push(p4);
                visited.add(p4);
            }
        }
    }
}

export function nonRecursiveFillBucket(paint, shouldPaint, startX, startY, h, w) {
    if (startY < 0 || startY > h - 1 || startX< 0 || startX > w - 1 || !shouldPaint(startX, startY)) return;
    const stack = [[startX, startY], ];
    while (stack.length > 0){
        const point = stack.pop();
        const [x, y] = point;
        paint(x, y);
        if (y < 0 || y > h - 1 || x < 0 || x > w - 1) continue;
        if (shouldPaint(x + 1, y)) stack.push([x + 1, y]);
        if (shouldPaint(x, y + 1)) stack.push([x, y + 1]);
        if (shouldPaint(x - 1, y)) stack.push([x - 1, y]);
        if (shouldPaint(x, y - 1)) stack.push([x, y - 1]);
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