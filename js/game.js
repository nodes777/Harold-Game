var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60)
    };

var canvas = document.createElement('canvas');
var width = 1000;
var height = 550;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var haroldImg = new Image();
haroldImg.src = 'img/harold.png';

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

};

var render = function() {
    context.fillStyle = "tan";
    context.fillRect(0, 0, width, height);
    player.render();
};

/*Create Paddle Class*/
function Harold(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}
/*Create Paddle methods that are shared across both players*/
Harold.prototype.render = function() {
    context.drawImage(haroldImg, player.harold.x, player.harold.y);
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

/*Create Paddles player and comp*/

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
            this.harold.move(-4, 0); //to the left by 4 px
        } else if (value == 39) { // right arrow
            this.harold.move(4, 0); //to the right by 4 px
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