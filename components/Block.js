import {
    ctx,
    blockSize
} from '../app'

class Block {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
    //création du block pour le snake
    drawSquare(color) {
        const x = this.col * blockSize;
        const y = this.row * blockSize;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockSize, blockSize);
    }
    drawCircle(color) {
        const centerX = (this.col * blockSize) + blockSize / 2;
        const centerY = (this.row * blockSize) + blockSize / 2;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, blockSize / 2, 0, Math.PI * 2, false);
        ctx.fill();
    }
    collide(block) {
        return this.col === block.col && this.row === block.row;
    }
}

export default Block