//引入其他的类
import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from './ScorePanel'

//游戏控制器，控制其他的所有类
class GameControl{
    //定义三个属性
    //蛇
    snake: Snake;
    //食物
    food: Food;
    //记分牌
    scorePanel: ScorePanel; 

    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    //创建一个属性用来记录游戏是否结束
    isLive = true;
    
    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 2);
        this.init();
    }

    //游戏的初始化方法，调用后游戏即开始
    init(){
        //绑定键盘按下的事件
        document.addEventListener('keydown',this.keyDownHandler.bind(this));
        //调用run方法，使蛇移动
        this.run();
    }


    /* 
        ArrowUp Up
        ArrowRight Right
        ArrowDown Down
        ArrowLeft Left
    */

    //创建一个键盘按下的响应函数
    keyDownHandler(event:KeyboardEvent){
        //需要检查event.key是否合法(用户是否按了正确的按键)
        //修改direction属性
        this.direction = event.key;
    }

    //创建一个控制蛇移动的方法
    run(){
        /* 根据方向(this.direction)来使蛇的位置改变：
        上 top减少
        下 top增加
        左 left减少
        右 left增加
         */
        
        //获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        //根据按键方向修改X,Y值
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                //向上移动，Y减少
                Y -= 10;
               break;
            case "ArrowRight":
            case "Right":
                //向 右移动，X增加
                X += 10;
               break;
            case "ArrowDown":
            case "Down":
                //向下移动，Y增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                //向左移动，X减少
                X -= 10;
                break;
        }

        //检查蛇是否吃到了食物
        this.checkEat(X,Y);
         

        //修改蛇的X和Y值
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e){
            //说明游戏结束
            alert(e.message + 'GAME OVER!')
            //将isLive设为false
            this.isLive=false
        }
       

        //开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level - 1) * 30)
    }

    //定义一个方法，检查蛇是否吃到了食物
    checkEat(X:Number, Y:number){
       if(X === this.food.X && Y === this.food.Y){
            //食物位置要重置
            this.food.change();
            //分数增加
            this.scorePanel.addScore();
            //蛇增加一节
            this.snake.addBody();
       }
    }
}

export default GameControl;