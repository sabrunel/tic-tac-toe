class UI {
    constructor() {
        // UI elements
        this.boardElement = document.querySelector("#board");
        this.outcomeText = document.querySelector("#outcome-text");
        this.restartGameBtn = document.querySelector("button");
    }

    showRestartBtn() {
        this.restartGameBtn.classList.add("visible");
    }

    setOutComeText(text) {
        this.outcomeText.innerText = text;
    }

    clearOutcomeText() {
        this.outcomeText.innerText = "";
    }
}


class GameBoard {
    constructor() {
        this.startingBoard = ["", "", "", "", "", "", "", "", ""];
    }

    get activeCells() {
        return document.querySelectorAll(".cell");
    }

    drawBoard(parentElement) {
        this.startingBoard.forEach((_cell) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            parentElement.append(cell);
        })
    }

    drawMark(cell, mark) {
        cell.classList.add(mark);
    }

    clearBoard(parentElement) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.lastChild);
        }
    }
}


class Game {
    constructor(gameBoard, ui) {
        this.gameBoard = gameBoard;
        this.ui = ui;
        this.x_class = "cross";
        this.o_class = "circle";
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
        this.gameBoard.drawBoard(this.ui.boardElement);

        // Set click listeners
        this.cellElements = this.gameBoard.activeCells;

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
            return cell.classList.contains(this.x_class)
            || cell.classList.contains(this.o_class);
        })
    }

    endGame() {
        // Disable all click listeners
        this.cellElements.forEach((cellElement) => {
            cellElement.replaceWith(cellElement.cloneNode(true));
        })

        // Enable the Restart Game button
        this.ui.showRestartBtn();
        this.ui.restartGameBtn.addEventListener("click", this.resetGameHandler.bind(this))
    }

    playRoundHandler(e) {
        // Place a mark
        const currentCell = e.target;
        const currentMark = this.isCrossTurn ? this.x_class : this.o_class

        this.gameBoard.drawMark(currentCell, currentMark);

        // Check the outcome
        if (this.checkForWin(currentMark)) {
            this.ui.setOutComeText(`${currentMark} wins`);
            this.endGame();
        } else if (this.checkForDraw()) {
            this.ui.setOutComeText("It's a draw!");
            this.endGame();
        } else {
            this.swapTurns();
        }
    }

    resetGameHandler() {
        // Clear the current board
        this.gameBoard.clearBoard(this.ui.boardElement);

        // Clear the outcome text
        this.ui.clearOutcomeText();

        // Start a new game
        this.startGame();
    }
}

const game = new Game(
    new GameBoard(),
    new UI()
);

game.startGame();

