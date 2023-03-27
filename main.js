class GameBoard {
    constructor() {
        this.boardElement = document.querySelector("#board");
        this.x_class = "cross";
        this.o_class = "circle";
        this.startingBoard = ["", "", "", "", "", "", "", "", ""];
    }

    get activeCells() {
        return document.querySelectorAll(".cell");
    }

    drawBoard() {
        this.startingBoard.forEach((_cell) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            this.boardElement.append(cell);
        })
    }

    drawMark(cell, mark) {
        cell.classList.add(mark);
    }
}


class Game {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.isCrossTurn = true;
    }

    startGame() {
        // Draw the board
        this.gameBoard.drawBoard();

        // Set click listeners
        const cells = this.gameBoard.activeCells;
        
        cells.forEach((cell) => {
            cell.addEventListener("click", this.playRoundHandler.bind(this), {once:true});
        });
    }

    swapTurns() {
        this.isCrossTurn = !this.isCrossTurn;
    }

    playRoundHandler(e) {
        // Place a mark
        const currentCell = e.target;
        const currentMark = this.isCrossTurn ? this.gameBoard.x_class : this.gameBoard.o_class

        this.gameBoard.drawMark(currentCell, currentMark);

        // Check for a win

        // Check for a draw

        // Swap turns
        this.swapTurns();
    }
}

game = new Game(new GameBoard());
game.startGame();