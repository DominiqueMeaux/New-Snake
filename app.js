import Snake from './components/Snake'
import Apple from './components/Apple'
import move from './directions'
import {
    drawBorder,
    drawScore,
    drawBestScore,
    saveBestScore,
    setSpeed
} from './helpers'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
//definition de la grille
const blockSize = 10;
const widthInBlock = width / blockSize;
const heightInBlock = height / blockSize;

let endGame = false;



/**
 * Les blocks
 */



const snake = new Snake();
const apple = new Apple();
move()

function gameOver() {
    ctx.font = '60px Monospace';
    ctx.fillStyle = '#1d1d1d';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', width / 2, height / 2);
    endGame = true;
}


function interval() {
    if (endGame) {
        saveBestScore();
        window.cancelAnimationFrame(play);
        return;
    }
    ctx.clearRect(0, 0, width, height);
    snake.move();
    snake.draw();
    apple.draw();
    drawScore();
    drawBestScore();
    drawBorder();
    setTimeout(() => play = window.requestAnimationFrame(interval), setSpeed());
}
//Démarrer le jeu
let play = window.requestAnimationFrame(interval);





export {
    ctx,
    width,
    height,
    blockSize,
    widthInBlock,
    heightInBlock,
    gameOver,
    apple,
    endGame,
    snake
}
window.onload = function () {
    TweenMax.set('body', { opacity: 1 });
    let tl1 = new TimelineMax();


    tl1
        .from('.title', 1.2, { delay: 0.1, scale: 0, top: "50%", left: "50%", opacity: 0, ease: Back.easeOut.config(1.7) })
}