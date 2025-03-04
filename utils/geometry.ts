
type Rectangle = {
    start: { x: number; y: number };
    end: { x: number; y: number };
    width: number;
  };
  
export function doRectanglesOverlap(rect1: Rectangle, rect2: Rectangle): boolean {
    // Calculate the edges of the rectangles
    const left1 = Math.min(rect1.start.x, rect1.end.x);
    const right1 = Math.max(rect1.start.x, rect1.end.x);
    const top1 = Math.min(rect1.start.y, rect1.end.y);
    const bottom1 = Math.max(rect1.start.y, rect1.end.y);

    const left2 = Math.min(rect2.start.x, rect2.end.x);
    const right2 = Math.max(rect2.start.x, rect2.end.x);
    const top2 = Math.min(rect2.start.y, rect2.end.y);
    const bottom2 = Math.max(rect2.start.y, rect2.end.y);

    // Check if one rectangle is on the left side of the other
    if (right1 <= left2 || right2 <= left1) {
        return false;
    }

    // Check if one rectangle is above the other
    if (bottom1 <= top2 || bottom2 <= top1) {
        return false;
    }

    // Rectangles overlap
    return true;
}
