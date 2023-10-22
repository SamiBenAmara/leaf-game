
let bug = 0;
let flipState = 0;

const leaf = document.getElementById('clickLeaf');
const back = document.getElementById('bugBack');


function bugEntered(){
    back.style.backgroundImage = "url('../LeafImg/leaf-back-redBug.svg')"
}

function bugLeft(){
    back.style.backgroundImage = "url('../LeafImg/leaf-back.svg')"
}


function transformLeaf(){

    if(flipState == 0){
        leaf.style.transform = 'rotateY(-1620deg)';
        flipState = 1;
    }else{
        leaf.style.transform = 'rotateY(0deg)';
        flipState = 0;
    }
}


leaf.addEventListener('click',transformLeaf);