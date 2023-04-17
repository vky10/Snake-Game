const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle='yellow';
const cs=67;
const w=1000;
const h=600;
let food=null;
let Score=0;

class Snake{

    constructor(){
        this.init_len=5;
        this.direction='right';
        this.cells=[]
    }

    createSnake(){
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
                x:i,
                y:0
            });
        }
    }
    drawSnake(){
        for(let i=0;i < this.cells.length;i++){
            const cell=this.cells[i];
            if(i=== this.cells.length-1){
                pen.fillStyle = 'red';
            }
            else{
                pen.fillStyle = 'yellow';
            }
         pen.fillRect(cell.x*cs-2,cell.y*cs-2,cs-2,cs-2);
        }
    }

    updateSnake() {
        const headx=this.cells[this.cells.length-1].x;
        const heady=this.cells[this.cells.length-1].y;

        let nextx;
        let nexty;

        if(food.x===headx && food.y===heady){
            food=generateRandomFood();
            Score++;
        }
        else{
            this.cells.shift();
        }

        // if(headx*cs-cs<=0 || headx*cs+cs>=w-cs ||heady*cs<=0 || heady*cs+cs>=h-cs){
        //     gameover();
        // }

        if(this.direction==='left'){
            nextx=headx-1;
            nexty=heady;
            if(nextx*cs<0){
                gameover();
            }
        }

       else if(this.direction==='up'){
            nextx=headx;
            nexty=heady-1;
            if(nexty*cs<0){
                gameover();
            }
        }
        else if(this.direction==='down'){
            nextx=headx;
            nexty=heady+1;
          if(nexty*cs>h-cs){
            gameover();
          }
        }
        else if(this.direction==='right'){
            nextx=headx+1;
            nexty=heady;
            if(nextx*cs>w-cs){
                gameover();
            }
        }


        this.cells.push({
            x:nextx,
            y:nexty
        });

        // this.cells.shift();
    }

    changeSnakeDirection(direction){
        this.direction=direction;
    }
}

const snake=new Snake();
// snake.createSnake();

function init(){
snake.createSnake();
snake.drawSnake();
food=generateRandomFood();

function keypressed(e){
    if(e.key==='ArrowLeft'){
        snake.changeSnakeDirection('left');
    }
    else if(e.key==='ArrowDown'){
        snake.changeSnakeDirection('down');
    }
    else if(e.key==='ArrowUp'){
        snake.changeSnakeDirection('up');
    }
    else if(e.key==='ArrowRight'){
        snake.changeSnakeDirection('right');
    }
}

document.addEventListener('keydown',keypressed);
}

function draw(){
    pen.clearRect(0,0,w,h);
    pen.fillStyle='red'
    pen.font='40px serif';
    pen.fillText(`Score : ${Score}`,50,50);
    pen.fillRect(food.x *cs,food.y *cs,cs,cs);
    pen.fillStyle='yellow';
    snake.drawSnake();
}

function update(){

    snake.updateSnake();
}

function gameLoop(){
    update();
    draw();
}

function generateRandomFood(){
    const foodx=Math.floor(Math.random()*(w-cs)/cs);
    const foody=Math.floor(Math.random()*(h-cs)/cs);

    const food={
        x:foodx,
        y:foody
    }
    return food;
}

init();

const id=setInterval(gameLoop,100);

function gameover(){
    clearInterval(id);
}