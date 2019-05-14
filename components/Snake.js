import {
    widthInBlock,
    heightInBlock,
    gameOver,
    apple
} from '../app'

import { addScore } from '../score'

import Block from './Block'

class Snake {
    constructor() {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5),
        ];
        this.direction = 'right';
    }
    draw() {
        this.segments.map(segment => segment.drawSquare('#BADA55'));
    }
    setDirection(newDirection) {
        this.direction = newDirection;
    }

    checkCollision(head) {
        //collision avec les murs ( renvoi true si le serpent touche un mur)
        const leftCollision = head.col === 0;
        const topCollision = head.row === 0;
        const rightCollision = head.col === widthInBlock - 1;
        const bottomCollision = head.row === heightInBlock - 1;

        const wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
        let selfCollision = false;
        this.segments.map(segment => {
            if (head.collide(segment)) {
                selfCollision = true;
            }
        })
        return selfCollision || wallCollision;
    }

    move() {
        const head = this.segments[0];
        let newHead;
        if (this.direction === 'right') {
            newHead = new Block(head.col + 1, head.row);
        }
        else if (this.direction === 'left') {
            newHead = new Block(head.col - 1, head.row);
        }
        else if (this.direction === 'up') {
            newHead = new Block(head.col, head.row - 1);
        }
        else if (this.direction === 'down') {
            newHead = new Block(head.col, head.row + 1);
        }
        if (this.checkCollision(newHead)) {
            gameOver();
            return;
        }


        //unshift: rajoute un élément au début du tableau
        this.segments.unshift(newHead);
        //transforme la pomme à la collision en tête de serpent pour le faire grandir
        if (newHead.collide(apple.position)) {
            addScore()
            apple.move();
        }
        else {
            this.segments.pop();
        }
        //pop: supprime le dernière élément d'un tableau

    }

}
export default Snake