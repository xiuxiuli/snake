
class ScorePanel {
    score = 0;
    level = 1;

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    maxLevel: number;
    scoreEachLevel: number;

    constructor(maxLevel: number = 10, scoreEachLevel: number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.scoreEachLevel = scoreEachLevel;
    }

    addScore(){
        this.score++;
        this.scoreEle.innerHTML = this.score + '';

        if (this.score % this.scoreEachLevel == 0){
            this.upLevel();
        }
    }

    upLevel(){
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + '';
        }
    }
}

export default ScorePanel;

// const panel = new ScorePanel();
// for (let i = 0; i < 100; i++){
//     panel.addScore();
// }