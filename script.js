//Initialize grid space as a table and add the onclick event listener

const gameboardContainer = document.getElementById('gameboardContainer')

for (let i = 0; i < 15; i++){
    let row=gameboardContainer.insertRow();
    for(let j=0;j<15;j++){
        let gamePiece = row.insertCell();
        gamePiece.setAttribute("xPos",j);
        gamePiece.setAttribute("yPos",i);
        gamePiece.classList.add("gamePiece");
        gamePiece.onclick= function(){
            let coordinates={"x":-1,"y":-1}
            coordinates.x=this.cellIndex;
            coordinates.y=this.parentNode.rowIndex;
            console.log(coordinates);
        };
    }
}
