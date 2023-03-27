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
        this.winningCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
        this.isCrossTurn = true;
    }

    startGame() {
        // Draw the board
        this.gameBoard.drawBoard();

        // Set click listeners
        this.cellElements = this.gameBoard.activeCells;
        console.log(this.cellElements);

        this.cellElements.forEach((cellElement) => {
            cellElement.addEventListener("click", this.playRoundHandler.bind(this), {once:true});
        });
    }

    swapTurns() {
        this.isCrossTurn = !this.isCrossTurn;
    }

    checkForWin(mark) {
        return this.winningCombos.some(combo => {
            return combo.every(index => {
                return this.cellElements[index].classList.contains(mark);
            })
        })
    }

    checkForDraw() {
        const cellList = Array.prototype.slice.call(this.cellElements);
        return cellList.every(cell => {
            return cell.classList.contains(this.gameBoard.x_class)
            || cell.classList.contains(this.gameBoard.o_class);
        })
    }

    playRoundHandler(e) {
        // Place a mark
        const currentCell = e.target;
        const currentMark = this.isCrossTurn ? this.gameBoard.x_class : this.gameBoard.o_class

        this.gameBoard.drawMark(currentCell, currentMark);

        // Check for a win
        if (this.checkForWin(currentMark)) {
            console.log(`${currentMark} wins`);
        } else if (this.checkForDraw()) {
            // Check for a draw
            console.log("It's a draw");
        } else {
            // Swap turns
            this.swapTurns();
        }
    }
}

game = new Game(new GameBoard());
game.startGame();