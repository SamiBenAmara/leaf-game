//Initialize grid space as a table and add the onclick event listener

const gameboardContainer = document.getElementById('gameboardContainer')

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
        };
    }
}
}

generateGrid(16)
