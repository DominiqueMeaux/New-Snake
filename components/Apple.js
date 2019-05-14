import {
    widthInBlock,
    heightInBlock,
    ctx,
    blockSize
} from '../app'

import Block from './Block'

class Apple {
    constructor() {
        this.position = new Block(
            Math.floor(Math.random() * (widthInBlock - 2) + 1),
            Math.floor(Math.random() * (heightInBlock - 2) + 1),
            ctx,
            blockSize
        );
    }
    draw() {
        this.position.drawCircle('#FB1');
    }
    move() {
        const randomCol = Math.floor(Math.random() * (widthInBlock - 2) + 1);
        const randomRow = Math.floor(Math.random() * (widthInBlock - 2) + 1);
        this.position = new Block(randomCol, randomRow, ctx, blockSize);
    }
}

export default Apple