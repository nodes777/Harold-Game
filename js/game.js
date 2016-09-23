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
    ball.render();

};

var render = function() {
    context.fillStyle = "tan";
    context.fillRect(0, 0, width, height);
    player.render();
    ball.render();
};

/*Create Harold Class*/
function Harold(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
    this.img = haroldImgRight;
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
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

Ball.prototype.render = function() {
    /*Put "pen" down on canvas*/
    context.beginPath();
    /*Draw an arc starting at the x and y, using the radius, and the angle in radians, Counter Clockwise is false*/
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
};

Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var leftSide = this.x - 5; //left side of ball
    var top_y = this.y - 5; //top of ball
    var rightSide = this.x + 5; //right side of ball
    var bottom_y = this.y + 5; //bottom of ball
};


/*Create Player Class*/
function Player() {
    this.harold = new Harold(175, 480, 50, 10);
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
};


var player = new Player();

var ball = new Ball(200, 300);

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});


/*Octo*/
var octo = {

    getCompScore: function() {
        return data.game.compScore;
    },
    getPlayerScore: function() {
        return data.game.playerScore;
    },
    updateCompScore: function(score) {
        data.game.compScore = score;
        view.renderScore();
    },
    updatePlayerScore: function(score) {
        data.game.playerScore = score;
        view.renderScore();

    }
};

/*Data*/
var data = {
    game: {
        compScore: 0,
        playerScore: 0
    }
};

/*View*/
var view = {
    renderScore: function() {
        document.getElementById("cScore").innerHTML = octo.getCompScore();
        document.getElementById("pScore").innerHTML = octo.getPlayerScore();
    }
};