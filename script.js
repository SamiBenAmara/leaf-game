//Initialize grid space as a table and add the onclick event listener

let coordinatesArray = [];
let bugCoordinatesArray = [];
var leavesTurned=0;
var bugsFound=0;

function generateBugCoordinates() {

    let numOfCoordinates = 256;
    let index = 0;

    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            let temp = [i, j];
            coordinatesArray.push(temp);
        }
    }    

    for (let i = 0; i < 16; i++) {
        index = Math.floor(Math.random() * numOfCoordinates);
        bugCoordinatesArray.push(coordinatesArray[index]);
        numOfCoordinates--;
        coordinatesArray.splice(index, 1);
    }

    for (let i = 0; i < 16; i++) {
            console.log(`${bugCoordinatesArray[i][0]} ${bugCoordinatesArray[i][1]}`);
    }
}

function checkIfBugIsHere(x, y) {
    
    for (let i = 0; i < 16; i++) {

        if (bugCoordinatesArray[i][0] == x && bugCoordinatesArray[i][1] == y) {
            return true;
        }
    }

    return false;

}

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

        let bugDiv = document.createElement("div");
        bugDiv.classList.add("red_bug");
        
        leafDiv.appendChild(frontDiv);
        leafDiv.appendChild(backDiv);
        
        gamePiece.appendChild(leafDiv);
        bugDiv.style.display = "none";
        gamePiece.appendChild(bugDiv);

        gamePiece.onclick= function(){
            let coordinates={"x":-1,"y":-1}
            coordinates.x=this.cellIndex;
            coordinates.y=this.parentNode.rowIndex;
            console.log(coordinates);
            let isBugHere = checkIfBugIsHere(coordinates.x, coordinates.y);
            console.log(isBugHere);
            let leafObj=this.querySelector("div .leaf");
            let bugObj = this.querySelector("div .red_bug");
            transformLeaf(leafObj, isBugHere);
            if (isBugHere) {
                leafObj.style.display = "none";
                if(window.getComputedStyle(bugObj).getPropertyValue("display")!="block")
                {
                    bugsFound++;
                    document.getElementById("FoundBugs").textContent="Bugs Found: "+bugsFound.toString();
                }
                bugObj.style.display = "block";
            }
        };
    }
}
}

function leafToBug(leafObject) {
    leafObject.style.backgroundImage = "url('/media/redbug.svg')";
}

function transformLeaf(leafObject){
    // audio.load();
    // audio.play();
    opacity=parseFloat(window.getComputedStyle(leafObject).getPropertyValue("opacity"));
    if(opacity==1)
    {
        leavesTurned++;
        document.getElementById("leavesFound").textContent="Leaves flipped: "+leavesTurned.toString();
    }
    leafObject.style.transform = 'rotateY(-1620deg)';

    leafObject.style.animation = 'fadeOut 1500ms';

    leafObject.style.opacity = 0;
    
}

const scoreboard = document.getElementById('scoreboard')

function createScoreboard() {
    // for (let i = 0; i < players; i++) {
        let found = document.createElement('div');
        found.classList.add("scoreboardContainer");
        found.id="FoundBugs";
        found.textContent="Bugs flipped: "+leavesTurned.toString();
        let leaves = document.createElement('div');
        leaves.classList.add("scoreboardContainer");
        leaves.id="leavesFound";
        leaves.textContent="Leaves Found: "+bugsFound.toString();
        scoreboard.appendChild(found);
        scoreboard.appendChild(leaves);
    }
generateBugCoordinates();
createScoreboard();
generateGrid(GRID_SIZE)
