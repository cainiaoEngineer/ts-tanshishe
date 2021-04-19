
//引入样式
import './style/index.less'

//测试代码
// const food = new Food();
// console.log(food.X,food.Y);
// food.change();
// console.log(food.X,food.Y);

import GameControl from './moduls/GameControl'
const gameControl = new GameControl();

setInterval(
    ()=>{
        console.log(gameControl.direction)
    },1000
)