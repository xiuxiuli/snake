import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    direction: string = 'ArrowRight'; //snake's moving direction

    isAlive = true; //snake is still alive?

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init(); //start a game
    }

    //initialize, call this function to start a game
    init() {
        //listen keyboard event
        document.addEventListener('keydown', this.keydownHandler.bind(this));

        //call run() function to let snake moves
        this.run();
    }

    /*
    ArrowUp - Up
    ArrowDown - Down
    ArrowLeft - Left
    ArrowRight - Right
    */
    keydownHandler(event: KeyboardEvent){
        //firstly check if user clicking the right keys: up|down|left|right
        this.direction = event.key;
    }

    //snake moves as (this.direction) indicates
    // up: top-
    // down: top+
    // left: left-
    // right: left+
    run() {
        let X = this.snake.x;
        let Y = this.snake.y;

        //change x and y
        switch(this.direction) {
            case "ArrowUp":
                Y -= 10;
                break;

            case "ArrowDown":
                Y += 10;
                break;

            case "ArrowLeft":
                X -= 10;
                break;
        
            case "ArrowRight":
                X += 10;
                break;
        }

        //check if snake eat a food
        this.checkEat(X, Y);

        try {
            this.snake.x = X;
            this.snake.y = Y;
        } catch (e) {
            alert((e as Error).message + 'Game Over!');
            this.isAlive = false; // so that it stops moving
        }

        //set a timer to keep the snake run every 300msec
        this.isAlive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1)*30);
        
    }

    checkEat(x: number, y: number){
        if (x === this.food.x && y === this.food.y) {
            //show another new food
            this.food.relocate();
            //score++
            this.scorePanel.addScore();
            //snake longer
            this.snake.addBody();
        }
    }  
}

export default GameControl;