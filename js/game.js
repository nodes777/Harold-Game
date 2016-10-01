var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
/*Create canvas and 2d context*/
var canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 550;
var context = canvas.getContext("2d");

/*Image loading onto canvas*/
var haroldImgRight = new Image();
haroldImgRight.src = "img/haroldRight.png";
var haroldImgLeft = new Image();
haroldImgLeft.src = "img/haroldLeft.png";

/*Init*/
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
    harold.update();
    for (var i = 0; i < foodArr.length; i++) {
        foodArr[i].update();
    }
    for (i = 0; i < bubbleArr.length; i++) {
        bubbleArr[i].update(foodArr);
    }
    healthUpdate();

    var timeInMs = Date.now();
    checkForFood(timeInMs);
};

var render = function() {
    context.fillStyle = "tan";
    context.fillRect(0, 0, canvas.width, canvas.height);
    harold.render();
    for (var i = 0; i < foodArr.length; i++) {
        foodArr[i].render();
    }
    for (i = 0; i < bubbleArr.length; i++) {
        bubbleArr[i].render();
    }
    healthRender();
};

var foodArr = [];
var bubbleArr = [];

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

Harold.prototype.update = function() {
    for (var key in keysDown) {
        var value = Number(key);
        if (value == 37) { //left arrow key
            this.move(-4, 0);
            this.img = haroldImgLeft; //to the left by 4 px
        } else if (value == 39) { // right arrow
            this.move(4, 0); //to the right by 4 px
            this.img = haroldImgRight; //flip harold to the face the right
        } else if (value == 38) { // up
            this.move(0, -4);
        } else if (value == 40) {
            this.move(0, 4);
        } else {
            this.move(0, 0);
        }
    }
    this.health -= .05;
    if (this.health < 0) {
        this.health = 0;
    }
};

/*Create Harold methods*/
Harold.prototype.render = function() {
    context.drawImage(harold.img, harold.x, harold.y);
};

Harold.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
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
Harold.prototype.blowBubble = function() {
    if( this.img == haroldImgRight){
    var bubble = new Bubble(this.x+this.width, this.y);
    } else{
    var bubble = new Bubble(this.x, this.y);
    }
    bubbleArr.push(bubble);
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

/*Create Food Class*/
function Food(x, y, downSpeed, color) {
    this.ball = new Ball(x, y, downSpeed, color);
}

Food.prototype.render = function() {
    this.ball.render();
};

Food.prototype.update = function() {
    this.ball.update();
    if(this.ball.top_y > canvas.height){
        foodArr.splice(this.spotInArr, 1);
        /*splice removes from the array but the spotInArr is still the same as when food was spawned, so you have to update the foodArr*/
        updateFoodArr();
    }
    /*hit the player*/
    if (this.ball.top_y < (harold.y + harold.height) && this.ball.bottom_y > harold.y && this.ball.leftSide < (harold.x + harold.width) && this.ball.rightSide > harold.x) {
        foodArr.splice(this.spotInArr, 1);
        updateFoodArr();
        if (harold.health + 10 > 100) {
            harold.health = 100;
        } else {
            harold.health += 10;
        }
    }

};

/*Instantiate items on screen*/
var harold = new Harold(175, 480, 70, 36);

/*Health*/
var barGraphic = {
    x: 20,
    y: 30,
    width: 300,
    height: 20
};

var maxHealth = 100;
var percent = harold.health / maxHealth;

function healthRender() {
    context.fillStyle = "black";
    context.fillRect(barGraphic.x, barGraphic.y, barGraphic.width, barGraphic.height);

    context.fillStyle = "red";
    context.fillRect(barGraphic.x, barGraphic.y, barGraphic.width * percent, barGraphic.height);
}

function healthUpdate() {
    percent = harold.health / maxHealth;
}

/*Spawning food*/
function spawnFood() {
    var food = new Food(Math.floor((Math.random() * 1000) + 50), 100, 1, "#8B4513");
    foodArr.push(food)
    food.spotInArr = foodArr.indexOf(food);
}
var spawnRate = 2000; //every 2 seconds
var lastSpawn = -1;

function checkForFood(time) {
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnFood();
    }
}

function updateFoodArr() {
    for (var i = 0; i < foodArr.length; i++) {
       foodArr[i].spotInArr = foodArr.indexOf(foodArr[i]);
    }
}

/*Bubble*/
function Bubble(x, y) {
    this.ball = new Ball(x, y, -1, "#4c4cdb");
}

Bubble.prototype.render = function() {
    this.ball.render();
};

Bubble.prototype.update = function(foodArr) {
    this.ball.update();
    this.ball.x_speed= 0;
        for (var i = 0; i < foodArr.length; i++) {
            if (this.ball.x + this.ball.radius + foodArr[i].ball.radius > foodArr[i].ball.x
            && this.ball.x < foodArr[i].ball.x + this.ball.radius + foodArr[i].ball.radius
            && this.ball.y + this.ball.radius + foodArr[i].ball.radius > foodArr[i].ball.y
            && this.ball.y < foodArr[i].ball.y + this.ball.radius + foodArr[i].ball.radius)
            {
                var distance = Math.sqrt(
                ((this.ball.x - foodArr[i].ball.x) * (this.ball.x - foodArr[i].ball.x))
              + ((this.ball.y - foodArr[i].ball.y) * (this.ball.y - foodArr[i].ball.y))
               );
                if (distance < this.ball.radius + foodArr[i].ball.radius)
                {
                    /*food and bubble balls have collided*/
                    /*bubble to the left*/
                    if(this.ball.x < foodArr[i].ball.x) {
                        this.ball.x_speed = -2;
                    }
                    /*bubble to the right*/
                    else if (this.ball.x > foodArr[i].ball.x){
                        this.ball.x_speed = 2;
                    }
                    /*bubble is straight on*/
                    else {
                        this.ball.x = this.ball.x-6;
                    }
                }
            }
        }
};

/*Controls*/

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    if (event.keyCode == 32) {
        harold.blowBubble();
    }
    delete keysDown[event.keyCode];
});

