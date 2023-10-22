function getKeyString(x, y) {
  return `${x}x${y}`;
}

function createName() {
    let rand_int = Math.floor(Math.random() * 1000)
    let int_as_str = rand_int.toString()
    return "Player " + int_as_str
}

(function () {

    // our player
    let playerId;
    let playerRef;
    // all other things
    let players = {}; // local state of other players
    let leaves = {}; // local state of leaves
    let bugs = {}; // local state of bugs

    // listen to clicks
    const gameBoard = document.getElementById('gameboardContainer');
    gameBoard.addEventListener('click', handleClick);

    function handleClick(e) {
        // console.log(e);
        const leaf = e.target.closest('td');
        // console.log(leaf);
        const x = leaf.getAttribute("ypos");
        const y = leaf.getAttribute("xpos");

        // console.log("Leaf clicked at location:", "x: ", x, " y: ", y);
        // console.log(typeof(x), typeof(y))

        const leafKey = getKeyString(x, y);
        leaves[leafKey] = true;
        const leafRef = firebase.database().ref(`leaves/${leafKey}`);
        leafRef.set({
            x,
            y,
        })
    }

    const resetButton = document.getElementById("Reset");
    resetButton.addEventListener('click', resetClick);

    function resetClick(e) {
        const allLeavesRef = firebase.database().ref(`leaves`);
        allLeavesRef.remove();

        // clear local leaves
        leaves = {};

        location.reload();
        // let gameBoard = document.getElementById("gameboardContainer");
        // while (gameBoard.rows.length > 0) {
        //     gameBoard.deleteRow[0];
        // }
        // generateGrid(15);
    }

    function initGame() {
        const allPlayersRef = firebase.database().ref(`players`);
        const allBugsRef = firebase.database().ref(`bugs`);
        const allLeavesRef = firebase.database().ref(`leaves`);

        allPlayersRef.on("value", (snapshot) => {
            // Does something when a change occurs
            players = snapshot.val() || {};
        })

        allBugsRef.on("value", (snapshot) => {
            // Do something when a change occurs in bugs
            bugs = snapshot.val() || {};
        })

        allLeavesRef.on("value", (snapshot) => {
            // Do something when a change occurs in leaves
            leaves = snapshot.val() || {};
        })

        allLeavesRef.on("child_added", (snapshot) => {
            // Change leaves when new leaf added
            const addedLeaf = snapshot.val();

            let addedLeaf_x = addedLeaf.x;
            let addedLeaf_y = addedLeaf.y;
            console.log(addedLeaf_x, addedLeaf_y);

            const addedLeafKey = getKeyString(addedLeaf_x, addedLeaf_y);
            leaves[addedLeafKey] = true;

            let toChangeLeafContainer = document.getElementById("gameboardContainer").rows[addedLeaf_x].cells[addedLeaf_y];
            console.log(toChangeLeafContainer);
            transformLeaf(toChangeLeafContainer.querySelector("div .leaf"));
        })

        allLeavesRef.on("child_removed", (snapshot) => {
            leaves = {};
            location.reload();
        })

        allPlayersRef.on("child_added", (snapshot) => {
            // fires when a new player is added in the tree
            const addedPlayer = snapshot.val();
            console.log("Player added: ", addedPlayer);
            // TODO: to add the player to a score grid-cell on side of window (where scores go)
            const scoreBoard = document.getElementById("scoreboard");

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
