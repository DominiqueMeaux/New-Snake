import {
    ctx,
    width,
    height,
    blockSize
} from './app'

import { score, bestScore } from './score'

/**
 * Les fonctions
 */

//dessin du plateau
function drawBorder() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
}



function drawScore() {
    ctx.font = '18px Monospace';
    ctx.fillStyle = '#1d1d1d';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, blockSize, blockSize);
}

//Meilleur score
function drawBestScore() {
    ctx.font = '18px Monospace';
    ctx.fillStyle = '#1d1d1d';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Best: ${bestScore}`, blockSize, blockSize * 3);
}

//Sauvegarde du meilleur score dans localStorage
function saveBestScore() {
    if (score > bestScore) {
        window.localStorage.setItem('bestScore', score);
    }
}

//speed
function setSpeed() {
    const start = 70;
    const end = 16;
    const maxScore = 15;
    const delay = Math.floor(Math.max(start - (start - end) * score / maxScore, end));
    return delay;
}

export {
    drawBorder,
    drawScore,
    drawBestScore,
    saveBestScore,
    setSpeed
}
