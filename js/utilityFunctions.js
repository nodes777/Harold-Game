var winAmount = 100;
var factArray = [];
/*Spawning food*/
function spawnFood() {
    var food = new Food(Math.floor((Math.random() * 1000) + 50), 0, 1, "#8B4513", "#8B4513");
    foodArr.push(food);
    food.spotInArr = foodArr.indexOf(food);
}
var spawnRate = 1000; //every 1 seconds
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
            return true;
        } else {
            return false;
        }
    }
}

function checkBubblesAtTop(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].nest === true && arr[i].counted === false) {
            nestCount++;
            arr[i].counted = true;
            octo.updateNestCount(data.game.nestCount);
        }
    }
    if (nestCount >= winAmount) {
        console.log("you win!");
        displayWin(nestCount);
    }
}

function updateBubbleCounter(count) {
    /*context.font="25px Fresca"; //On canvas
    context.fillStyle = 'black';
    context.fillText(count,900,50);*/
    document.getElementById("nestCountSide").innerHTML = octo.getNestCount();
}

function updateTitle() {
    title = document.getElementById("title");
    facts = document.getElementById("facts");
    count = octo.getNestCount();
    if (count <= 10) {
        title.innerHTML = "Baby Bubble Blower";
        facts.innerHTML = factArray[0];
    } else if (count <= 20) {
        title.innerHTML = "Novice Nester";
        facts.innerHTML = factArray[1];
    } else if (count <= 30) {
        title.innerHTML = "Growing Gourami";
        facts.innerHTML = factArray[2];
    } else if (count <= 40) {
        title.innerHTML = "Capable Cluster Creator";
        facts.innerHTML = factArray[3];
    } else if (count <= 50) {
        title.innerHTML = "Blue Bubble Bomber";
        facts.innerHTML = factArray[4];
    } else if (count <= 60) {
        title.innerHTML = "Mekong Mound Maker";
        facts.innerHTML = factArray[5];
    } else if (count <= 70) {
        title.innerHTML = "Adept Aphrophils";
        facts.innerHTML = factArray[6];
    } else if (count <= 80) {
        title.innerHTML = "Betta Bubble Boss";
        facts.innerHTML = factArray[7];
    } else if (count <= 90) {
        title.innerHTML = "Splendid Splendens Superhero";
        facts.innerHTML = factArray[8];
    } else if (count <= 100) {
        title.innerHTML = "Labyrinth Lung Leader";
        facts.innerHTML = factArray[9];
    } else if (count <= 110) {
        title.innerHTML = "Gourami God";
        facts.innerHTML = factArray[10];
    }
}

function bubbleToBubble() {
    if (this.ball.x < bubbleArr[i].ball.x) {
        this.ball.x_speed = -2;
        this.ball.y_speed = bubbleArr[i].ball.y_speed;
    }
    /*bubble to the right*/
    else if (this.ball.x > bubbleArr[i].ball.x) {
        this.ball.x_speed = 2;
        this.ball.y_speed = bubbleArr[i].ball.y_speed;
    }
    /*bubble is straight on*/
    else {
        this.ball.x = this.ball.x - 6;
        this.ball.y_speed = bubbleArr[i].ball.y_speed;
    }
    /*if the bubble it touches is part of the nest, this bubble becomes a part of the nest*/
    if (bubbleArr[i].nest === true) {
        this.nest = true;
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

function increaseHealth() {
    if (harold.health + 10 > 100) {
        harold.health = 100;
    } else {
        harold.health += 10;
    }
}

function reduceHealth() {
    if (harold.health - 5 < 0) {
        harold.health = 0;
    } else {
        harold.health -= 5;
    }
}

function hide() {
    document.getElementById("endGame").style.display = 'none';
}

function displayWin(count) {
    if (count == winAmount && data.game.wonAlready === false) {
        document.getElementById("endGame").style.display = 'block';
        data.game.wonAlready = true;
    }
}

function disableMovement() {
    harold.update = null;
}

function doMovement(value) {
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
    } else if (value == 65) { //A key
        this.move(-4, 0);
        this.img = haroldImgLeft;
    } else if (value == 68) { // D key
        this.move(4, 0);
        this.img = haroldImgRight;
    } else if (value == 87) { // W key
        this.move(0, -4);
    } else if (value == 83) { //S key
        this.move(0, 4);
    } else {
        this.move(0, 0);
    }
}
