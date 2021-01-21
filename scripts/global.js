function moveLine(tx,ty,speed){//移动
    isEat();
    let snakeEnd = fullSnake.node[fullSnake.length-1],snakeHead = fullSnake.node[0];
    let x = parseInt(snakeHead.style.left),y = parseInt(snakeHead.style.top);
    
    if(!isFail(snakeHead.style.left,snakeHead.style.top)){    
        x+=11*tx;
        y+=11*ty;
        snakeEnd.style.left = x+"px";
        snakeEnd.style.top = y+"px";
        let tempNode = snakeEnd;
        fullSnake.node.pop();
        fullSnake.node.unshift(tempNode);
    }else{
        alert("You Lost");
        restart();
        return true;
    }
    movement = setTimeout(moveLine,speed,tx,ty,speed);
}

function restart(){//游戏重启
    if(!document.getElementsByClassName) return false;
    let snakeNodes = document.getElementsByClassName("snakeNode");
    while(snakeNodes.length){
        snakeNodes[0].remove();
    }
    fullSnake.node = [];
    fullSnake.length = 0;
    addSnake();
    produceFood();
    moveLine(fullSnake.stateX,fullSnake.stateY,500);
    
}

function isFail(x,y){//判断是否游戏结束
    x = parseInt(x);
    y = parseInt(y);
    if(fullSnake.length > 4){
        let nodes = fullSnake.node;
        for(let i = 1; i < fullSnake.length; i++){
            let tx = parseInt(nodes[i].style.left), ty = parseInt(nodes[i].style.top);
            if(Math.abs(tx-x) < 11 && Math.abs(ty-y) < 11){
                return true;
            }
        }
    }
    if(y<=fullSnake.endtop || x<=fullSnake.endleft || y>=fullSnake.endbottom || x>=fullSnake.endright){
        return true;
    }else{
        return false;
    }
}

function selectFrom(startNumber, endNumber) {//随机生成数字
    var choice = endNumber - startNumber + 1;
    return Math.floor(Math.random() * choice + startNumber)
}


function produceFood(){//生产食物
    let x = selectFrom(fullSnake.endleft,fullSnake.endright);
    let y = selectFrom(fullSnake.endtop,fullSnake.endbottom);
    food.style.left = x +"px";
    food.style.top = y +"px";
    return true;
}

function isEat(){//判断是否吃了食物
    let snakeHead = fullSnake.node[0];
    let sx = parseInt(snakeHead.style.left), sy = parseInt(snakeHead.style.top);
    let fx = parseInt(food.style.left),fy = parseInt(food.style.top);
    if(Math.abs(sx-fx) < 11 && Math.abs(sy-fy) < 11){
        fullSnake.score++;
        produceFood();
        addSnake();
        return true;
    }else{
        return false;
    }
}


function gameStart(){
    //创建游戏区域
    if(!document.createElement) return false;
    let gameSpace = document.createElement("div");
    gameSpace.setAttribute("class","gameSpace");
    if(!document.getElementsByClassName) return false;
    let backgrounds = document.getElementsByClassName("background");
    if(backgrounds.length == 0) return false;
    let background = backgrounds[0];
    background.appendChild(gameSpace); 

    //初始化蛇
    fullSnake = {
        endtop : 81,
        endbottom : 659,
        endleft : 61,
        endright : 639,
        stateX : 0,
        stateY : -1,
        length : 0,
        node : [],
        score : 0,
    }
    addSnake();

    //addFood
    food = document.createElement("div");
    food.setAttribute("class","food");
    gameSpace.appendChild(food);
    produceFood();
    moveLine(fullSnake.stateX,fullSnake.stateY,500);

    //监听键盘
    document.onkeydown = function(event){
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode == 37){//left
            if(fullSnake.stateX == 1) return false;
            clearTimeout(movement);
            fullSnake.stateX = -1;
            fullSnake.stateY = 0;
            moveLine(fullSnake.stateX,fullSnake.stateY,500);
        }else if(e && e.keyCode == 38){//up
            if(fullSnake.stateY == 1) return false;
            clearTimeout(movement);
            fullSnake.stateX = 0;
            fullSnake.stateY = -1;
            moveLine(fullSnake.stateX,fullSnake.stateY,500);
        }else if(e && e.keyCode == 39){//right
            if(fullSnake.stateX == -1) return false;
            clearTimeout(movement);
            fullSnake.stateX = 1;
            fullSnake.stateY = 0;
            moveLine(fullSnake.stateX,fullSnake.stateY,500);
        }else if(e && e.keyCode == 40){//down
            if(fullSnake.stateY == -1) return false;
            clearTimeout(movement);
            fullSnake.stateX = 0;
            fullSnake.stateY = 1;
            moveLine(fullSnake.stateX,fullSnake.stateY,500);
        }
    }
    return true;
}

function addSnake(){
    let snake = document.createElement("div");
    snake.setAttribute("class","snakeNode");
    if(!document.getElementsByClassName) return false;
    let gameSpaces = document.getElementsByClassName("gameSpace");
    if(gameSpaces.length == 0) return false;
    let gameSpace = gameSpaces[0];
    gameSpace.appendChild(snake);
    
    if(fullSnake.length!=0){
        let lastNode = fullSnake.node[fullSnake.length-1],firstNode = fullSnake.node[0];
        let x = parseInt(lastNode.style.left),y = parseInt(lastNode.style.top);
        if(fullSnake.length == 1 || (lastNode.style.left == firstNode.style.left || lastNode.style.top == firstNode.style.top)){
            snake.style.top = (11*-fullSnake.stateY+y)+"px";
            snake.style.left = (11*-fullSnake.stateX+x)+"px";
        }else{
            if(fullSnake.stateX == 0){
                let less = firstNode.style.left - lastNode.style.left;
                let flag = -less/Math.abs(less);
                snake.style.left = 10*flag+x + "px";
                snake.style.top = y + "px";
            }else{
                let less = firstNode.style.top - lastNode.style.top;
                let flag = -less/Math.abs(less);
                snake.style.top = 10*flag+y + "px";
                snake.style.left = x + "px";
            }
        }
        
    }else{
        snake.style.left = "350px";
        snake.style.top = "350px";
    }
    fullSnake.node.push(snake);
    fullSnake.length++;
    return true; 
}

window.onload = gameStart;