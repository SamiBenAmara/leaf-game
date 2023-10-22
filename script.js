//Initialize grid space as a table and add the onclick event listener

const gameboardContainer = document.getElementById('gameboardContainer')
const audio = new Audio();
audio.src = "media//Audio//leafCrunch.mp3";

const GRID_SIZE = 15

function generateGrid(gridSize) {
    for (let i = 0; i < gridSize; i++){
    let row=gameboardContainer.insertRow();
    for(let j=0;j<gridSize;j++){
        let gamePiece = row.insertCell();
        gamePiece.setAttribute("xPos",j);
        gamePiece.setAttribute("yPos",i);
        gamePiece.classList.add("gamePiece");
        
        let leafDiv=document.createElement("div");
        leafDiv.classList.add("leaf");
        
        let frontDiv=document.createElement("div");
        frontDiv.classList.add("front");
        
        let backDiv=document.createElement("div");
        backDiv.classList.add("back");
        
        leafDiv.appendChild(frontDiv);
        leafDiv.appendChild(backDiv);
        
        gamePiece.appendChild(leafDiv);
        gamePiece.onclick= function(){
            let coordinates={"x":-1,"y":-1}
            coordinates.x=this.cellIndex;
            coordinates.y=this.parentNode.rowIndex;
            console.log(coordinates);
            let leafObj=this.querySelector("div .leaf");
            transformLeaf(leafObj);
        };
    }
}
}

function transformLeaf(leafObject){
    // audio.load();
    // audio.play();

    leafObject.style.transform = 'rotateY(-1620deg)';

    leafObject.style.animation = 'fadeOut 1500ms';

    leafObject.style.opacity = 0;

}

const scoreboard = document.getElementById('scoreboard')

function createScoreboard(players) {
    for (let i = 0; i < players; i++) {
        let scoreboardContainer = document.createElement('div');
        scoreboardContainer.classList.add("scoreboardContainer");
        scoreboard.appendChild(scoreboardContainer);
        let scoreName = document.createElement('div');
        scoreName.textContent = (`Player ${[i+1]}`);
        scoreboardContainer.appendChild(scoreName);
        let scoreCount = document.createElement('div');
        scoreCount.id = `score${[i]}`
        scoreCount.textContent = (0)
        scoreboardContainer.appendChild(scoreCount);
    }
}

createScoreboard(4)

generateGrid(GRID_SIZE)
