# Harold Game
Harold is my fish and he [lives in his bowl](https://taylornodell.bandcamp.com/track/harolds-song). This is a game where you play as harold. I'm not sure where it's going or what the goals will be but this was inspired by [this song I wrote](https://taylornodell.bandcamp.com/track/harolds-song), which was very popular at the camp I worked at the summer of 2016.

##APIs, Frameworks and Methods##
* Bootstrap
* Canvas
* Prototypical method of object construction
* requestAnimationFrame
* AABB and Circular Collision detection

##To-Dos##
* Create end game:Blow 100 bubbles, have them "nest" at the top, can't run out of health, rank on number of bubbles made like cat clicker
* refactor collision code, no need to rewrite it twice for bubbles and food. Also harold food collisions.
* factor out utility code into different file: Collision detection, food arr update, spawnfood, health, boundries
* Background graphics
* Figure out bubble food hierarchy. Why do I need food.render() and bubble.render(); They should fall back to the same thing. Well they do different things. The part that they share is ball.update, which includes their movement, is inheirtened. But the parts they don't, like bubbles don't give health, because they have seperate update functions as well.
* Add music

##Bugs##
