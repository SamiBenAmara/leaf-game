const gameboardContainer = document.getElementById('gameboardContainer')

for (let i = 0; i < 64; i++){
    let gamePiece = document.createElement('div')
    gamePiece.classList.add('gamePiece')
    gameboardContainer.appendChild(gamePiece)
}
