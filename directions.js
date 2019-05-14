import {
    endGame,
    snake
} from './app'

const directions = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

/**
 * Events
 */
const move = () => (
window.addEventListener('keydown', function (event) {
    if (endGame) {
        window.location.reload();
    }
    const newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
})
)

export default move