function getKeyString(x, y) {
  return `${x}x${y}`;
}

function createName() {
    let rand_int = Math.floor(Math.random() * 1000)
    let int_as_str = rand_int.toString()
    return "User" + int_as_str
}

(function () {

    // our player
    let playerId;
    let playerRef;
    // all other things
    let players; // local state of other players
    let leaves; // local state of leaves
    let bugs; // local state of bugs

    // listen to clicks
    const gameBoard = document.getElementById('gameboardContainer');
    gameBoard.addEventListener('click', handleClick);

    function handleClick(e) {
        const x = e.target.cellIndex;
        const y = e.target.parentElement.rowIndex;

        console.log("Leaf clicked at location:", "x: ", x, " y: ", y);

    }

    function initGame() {
        const allPlayersRef = firebase.database().ref(`players`)
        const allBugsRef = firebase.database().ref(`bugs`)
        const allLeavesRef = firebase.database().ref(`leaves`)

        allPlayersRef.on("value", (snapshot) => {
            // Does something when a change occurs
            players = snapshot.val() || {};
        })

        allBugsRef.on("value", (snapshot) => {
            // Do something when a change occurs in bugs
        })

        allLeavesRef.on("value", (snapshot) => {
            // Do something when a change occurs in bugs
        })

        allLeavesRef.on("child_added", (snapshot) => {
            // Change leaves when new leaf added
            const addedLeaf = snapshot.val();
        })

        allPlayersRef.on("child_added", (snapshot) => {
            // fires when a new player is added in the tree
            const addedPlayer = snapshot.val();
            const characterElement = document.createElement('div')
            // TODO: to add the player to a score grid-cell on side of window (where scores go)

            if (addedPlayer.id === playerId) {

            }
        })
    }

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            //You're logged in!
            playerId = user.uid; // current user ID
            playerRef = firebase.database().ref(`players/${playerId}`); // how we interact with firebase node, to change values and remove from tree

            const name = createName();
            // playerNameInput.value = name;
            
            playerRef.set({
                id: playerId,
                name,
                score: 0,
            })
            
            //Remove me from Firebase when I diconnect
            playerRef.onDisconnect().remove();
            
            // //Begin the game now that we are signed in
            initGame();
        } else {
            //You're logged out.
        }
    })

    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
            console.log(errorCode, errorMessage);
    });

})();
