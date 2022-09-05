
class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('food')!;
    }

    get x(){
        return this.element.offsetLeft;
    }
    get y(){
        return this.element.offsetTop;
    }

    relocate() {
        //range of food's x and y: 0 - 290; 
        //304 - border - foodsize = 304 - 2*2 - 10 = 290
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

// const food = new Food();
// console.log(food.x, food.y);
// console.log(food.relocate());

export default Food;