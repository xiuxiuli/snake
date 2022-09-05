class Snake {
    snakeBox: HTMLElement; //snake container
    head: HTMLElement;  //snake head
    bodyCubes: HTMLCollectionOf<HTMLElement>; //snake body, head included

    constructor() {
        this.snakeBox = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div') as HTMLElement;
        this.bodyCubes = this.snakeBox.getElementsByTagName('div')!;
    }

    //x and y are coordinates of snake head
    get x() { 
        return this.head.offsetLeft;
    }
    get y() {
        return this.head.offsetTop;
    }

    set x(value: number) {
        if (this.x === value) return; //if user do not move it
         
        if (value < 0 || value > 290) { //hit wall
            throw new Error("Snake hits the wall!");
        }

        //no backward move
        //if cube[1] exist, it has more than 1 cube, then head XY != cube[1]'s XY
        if (this.bodyCubes[1] && 
            (this.bodyCubes[1]).offsetLeft === value){
                if (value > this.x) value = this.x - 10; 
                else value = this.x + 10;
        }

        this.moveBody();

        this.head.style.left = value +'px';

        this.checkHeadBody(); //check if it hits its body
    }
    set y(value: number) {
        if (this.y === value) return;

        if(value < 0 || value > 290){
            throw new Error("Snake hits the wall!");
        }
        //no backward move
        //if cube[1] exist, it has more than 1 cube, then head XY != cube[1]'s XY
        if (this.bodyCubes[1] && 
            (this.bodyCubes[1] as HTMLElement).offsetTop === value){
                if (value > this.y) value = this.y - 10; 
                else value = this.y + 10;
        }

        this.moveBody();

        this.head.style.top = value +'px';

        this.checkHeadBody(); //check if it hits its body
    }

    //when snake eat a food, body get longer
    addBody(){
        this.snakeBox.insertAdjacentHTML("beforeend", "<div></div>");
    }

    /* change body cubes's x and y, from tail to head-1. 
    head doesnt need to move
    */
    moveBody(){
        let length = this.bodyCubes.length;
        for (let i = length -1; i > 0; i--){
            let prevX = (this.bodyCubes[i-1]).offsetLeft; //get prev cube's x
            let prevY = (this.bodyCubes[i-1]).offsetTop; //get prev cube's y

            (this.bodyCubes[i]).style.left = prevX + 'px';
            (this.bodyCubes[i]).style.top = prevY + 'px';
        }
    }

    checkHeadBody() {
        //get all bodycubes to see of they have any collapse cordinate with head
        //means it hits his own body
        for (let i = 1; i < this.bodyCubes.length; i++){
            if (this.x === (this.bodyCubes[i]).offsetLeft) {
                let bc = this.bodyCubes[i];
                if (this.x === bc.offsetLeft && this.y == bc.offsetTop){
                    throw new Error("Snake hit itself!");
                }
            }
        }
    }
}

export default Snake;