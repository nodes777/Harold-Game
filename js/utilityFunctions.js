/*Spawning food*/
function spawnFood() {
    var food = new Food(Math.floor((Math.random() * 1000) + 50), 0, 1, "#8B4513");
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

/*Update Food Array*/
function updateFoodArr() {
    for (var i = 0; i < foodArr.length; i++) {
        foodArr[i].spotInArr = foodArr.indexOf(foodArr[i]);
    }
}

/*Collision Detection*/
function collisionCheck(thisBall, array, i) {
    if (thisBall.ball.x + thisBall.ball.radius + array[i].ball.radius > array[i].ball.x &&
        thisBall.ball.x < array[i].ball.x + thisBall.ball.radius + array[i].ball.radius &&
        thisBall.ball.y + thisBall.ball.radius + array[i].ball.radius > array[i].ball.y &&
        thisBall.ball.y < array[i].ball.y + thisBall.ball.radius + array[i].ball.radius) {
        var distance = Math.sqrt(
            ((thisBall.ball.x - array[i].ball.x) * (thisBall.ball.x - array[i].ball.x)) +
            ((thisBall.ball.y - array[i].ball.y) * (thisBall.ball.y - array[i].ball.y))
        );
        if (distance < thisBall.ball.radius + array[i].ball.radius) {
            /*food and bubble balls have collided*/
            /*bubble to the left*/
            if (thisBall.ball.x < array[i].ball.x) {
                thisBall.ball.x_speed = -2;
            }
            /*bubble to the right*/
            else if (thisBall.ball.x > array[i].ball.x) {
                thisBall.ball.x_speed = 2;
            }
            /*bubble is straight on*/
            else {
                thisBall.ball.x = thisBall.ball.x - 6;
            }
        }
    }
}

function boundryCheck(obj, canvas) {
    if (obj.x < 0) { // all the way to the left
        obj.x = 0;
        obj.x_speed = 0;
    } else if (obj.x + obj.width > canvas.width) { // all the way to the right
        obj.x = canvas.width - obj.width;
        obj.x_speed = 0;
    }
}

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