
let bug = 0;
let flipState = 0;

const leaf = document.getElementById('clickLeaf');
const back = document.getElementById('bugBack');


function bugEntered(){
    back.style.backgroundImage = "url('media/leaf-back-redBug.svg')"
}

function bugLeft(){
    back.style.backgroundImage = "url('media/leaf-back.svg')"
}



// function transformLeaf(){

//     if(flipState == 0){
//         leaf.style.transform = 'rotateY(-1620deg)';
//         leaf.style.animation = 'fadeOut 1500ms';
//         flipState = 1;
//     }else{
//         leaf.style.transform = 'rotateY(0deg)';
//         leaf.style.animation = 'fadeOut 1500ms';
//         flipState = 0;
//     }



// }

function transformLeaf(){

    leaf.style.transform = 'rotateY(-1620deg)';

    leaf.style.animation = 'fadeOut 1500ms';

}



leaf.addEventListener('click',transformLeaf);