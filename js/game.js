var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60)
    };
/*Create canvas and 2d context*/
var canvas = document.createElement('canvas');
var width = 1000;
var height = 550;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

/*Image loading onto canvas*/
var haroldImgRight = new Image();
haroldImgRight.src = 'img/haroldRight.png';
var haroldImgLeft = new Image();
haroldImgLeft.src = 'img/haroldLeft.png';


window.onload = function() {
    document.getElementById("canvas").appendChild(canvas);
    animate(step);
};

var step = function() {
    update(); //Update positions
    render(); //Draw them on the screen
    animate(step); //repeat
};

var update = function() {
    player.update();
    //ball.update();
    food.update();
    food2.update();
    for (i = 0; i < foodArr.length; i++) {
        foodArr[i].update();
    }
    healthUpdate();

    var timeInMs = Date.now();
    checkForFood(timeInMs);

};

var render = function() {
    context.fillStyle = "tan";
    context.fillRect(0, 0, width, height);
    player.render();
    //ball.render();
    food.render();
    food2.render();
    for (i = 0; i < foodArr.length; i++) {
        foodArr[i].render();
    }
    healthRender();

};

var foodArr = [];

/*Create Harold Class*/
function Harold(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
    this.img = haroldImgRight;
    this.health = 100;
}
/*Create Harold methods that are shared across both players*/
Harold.prototype.render = function() {
    context.drawImage(player.harold.img, player.harold.x, player.harold.y);
};

Harold.prototype.move = function(x, y) {
    this.x += x; //add x to position
    this.y += y;
    this.x_speed = x; //the speed is the value passed in Player.proto.update
    this.y_speed = y;

    /*Boundries*/
    if (this.x < 0) { // all the way to the left
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > canvas.width) { // all the way to the right
        this.x = canvas.width - this.width;
        this.x_speed = 0;
    } else if (this.y < 0) { // all the way to the top
        this.y = 0;
        this.y_speed = 0;
    } else if (this.y + this.height > canvas.height) { // all the way to the bottom
        this.y = canvas.height - this.height;
        this.y_speed = 0;
    }
};

/*Create Ball class for bubbles and food*/
function Ball(x, y, downSpeed, color) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = downSpeed;
    this.radius = 5;
    this.color = color;
}

Ball.prototype.render = function() {
    /*Put "pen" down on canvas*/
    context.beginPath();
    /*Draw an arc starting at the x and y, using the radius, and the angle in radians, Counter Clockwise is false*/
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
};

Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
    this.leftSide = this.x - 5; //left side of ball
    this.top_y = this.y - 5; //top of ball
    this.rightSide = this.x + 5; //right side of ball
    this.bottom_y = this.y + 5; //bottom of ball
};

/*Create Player Class*/
function Player() {
    this.harold = new Harold(175, 480, 70, 36);
}

Player.prototype.render = function() {
    this.harold.render();
};

Player.prototype.update = function() {
    for (var key in keysDown) {
        var value = Number(key);
        if (value == 37) { //left arrow key
            this.harold.move(-4, 0);
            this.harold.img = haroldImgLeft; //to the left by 4 px
        } else if (value == 39) { // right arrow
            this.harold.move(4, 0);//to the right by 4 px
            this.harold.img = haroldImgRight; //flip harold to the face the right
            } else if (value == 38) { // up
                this.harold.move(0, -4);
            } else if (value == 40) {
               this.harold.move(0, 4);
        } else {
            this.harold.move(0, 0);
        }
    }
    this.harold.health-=.05;
    if (this.harold.health<0){
        this.harold.health=0;
    }
};

/*Create Food Class*/
function Food(x,y, downSpeed, color) {
    this.ball = new Ball(x, y, downSpeed, color);
}

Food.prototype.render = function() {
    this.ball.render();
};

Food.prototype.update = function() {
    this.ball.update();
        if (this.ball.top_y < (player.harold.y + player.harold.height) && this.ball.bottom_y > player.harold.y && this.ball.leftSide < (player.harold.x + player.harold.width) && this.ball.rightSide > player.harold.x) {
            // hit the player
             if (player.harold.health+10>100){
                player.harold.health=100;
            } else {
                player.harold.health+=10;
            }
            this.ball.y_speed = -3;
            this.ball.x_speed += (player.harold.x_speed / 2);
            this.ball.y += this.ball.y_speed;
        }

};

/*Instantiate items on screen*/
var player = new Player();
//var ball = new Ball(200, 300);
var food = new Food(600, 100, 1, "#8B4513");
var food2 = new Food(Math.floor((Math.random() * 300) + 50), 100, 1, "#8B4513");

/*Health*/
var barGraphic = {
    x: 20,
    y: 30,
    width: 300,
    height: 20
};
var maxHealth = 100;
var percent = player.harold.health/maxHealth;
    function healthRender(){
    context.fillStyle = "black";
    context.fillRect(barGraphic.x, barGraphic.y, barGraphic.width, barGraphic.height);

    context.fillStyle = "red";
    context.fillRect(barGraphic.x, barGraphic.y, barGraphic.width * percent, barGraphic.height);
}
    function healthUpdate(){
        percent = player.harold.health/maxHealth;
    }


/*Spawning food*/
function spawnFood() {
    var food3 = new Food(Math.floor((Math.random() * 300) + 50), 100, 1, "#8B4513");
    foodArr.push(food3);
}
var spawnRate = 2000; //every 2 seconds
var lastSpawn = -1;

function checkForFood(time) {

    if (time > (lastSpawn + spawnRate)) {
        console.log("checked");
        lastSpawn = time;
        spawnFood();
    }
}



/*Controls*/

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});