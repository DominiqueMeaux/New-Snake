let score = 0;
//creation de la fonction de modification de la variable score
//A faire quand on a des export des variable car elle est immutable
function addScore() { score += 1 }
//initialisation du best score trouvé dans 
//localStorage
const bestScore = window.localStorage.getItem('bestScore') || 0;

export {
    score,
    bestScore,
    addScore
}