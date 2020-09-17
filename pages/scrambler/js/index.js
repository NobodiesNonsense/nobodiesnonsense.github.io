const Plane = {
    X: 'x',
    Y: 'y',
    Z: 'z'
}

const Side = {
    L: 'L',
    R: 'R',
    U: 'U',
    D: 'D',
    F: 'F',
    B: 'B'
}

const Modifier = {
    Double: '2',
    Prime: '\'',
    Normal: ''
}

// Define a 'Move' (a turn of the cube).
class Move {
    constructor(cubeSize, face, modifier) {
        this.cubeSize = cubeSize
        this.face = face
        this.modifier = modifier
    }

    // Return the plaintext form of this move.
    toString() {
        return this.face.toUpperCase() + this.modifier
    }
}

// Fetch a random property from an objects keys.
function fetchRandomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]]
}

// Convert a scramble to a string.
function convertScrambleToString(moves) {
    return moves.reduce((prev, cur) => {
        return `${prev} ${cur.toString()}`
    }, '')
}

// Generate a scramble.
function generateScramble(cubeSize, numTurns) {
    let moves = []
    let prevTurn
    let newTurn

    for (let i = 0; i < numTurns; i++) {
        do {
            newTurn = fetchRandomProperty(Side)
        } while (prevTurn === newTurn)

        moves.push(new Move(cubeSize, newTurn, fetchRandomProperty(Modifier)))
        prevTurn = newTurn
    }

    return moves
}

// Generate a readable scramble.
function generateStringScramble(cubeSize, numTurns) {
    return convertScrambleToString(generateScramble(cubeSize, numTurns))
}

// Display the scramble.
function displayScramble() {
    let el = document.getElementById("text-scramble")
    el.innerText = generateStringScramble(3, 25)
}

function copyToClipboard(e) {
    var copyText = document.getElementById("text-scramble")
    var textArea = document.createElement("textarea")
    textArea.value = copyText.textContent.substring(1, copyText.innerText.length + 1)
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("Copy")
    textArea.remove()

    return false
}

// Function used because document.onload doesn't work with Electron.
function onLoad() {
    displayScramble()
}