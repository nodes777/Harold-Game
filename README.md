# Harold Game
Harold is my fish and he [lives in his bowl](https://taylornodell.bandcamp.com/track/harolds-song)

##APIs, Frameworks and Methods##
* Bootstrap
* Canvas
* Prototypical method of object construction
* requestAnimationFrame

##To-Dos##
* Create end game
* Background graphics
* Figure out bubble food hierarchy. Why do I need food.render() and bubble.render(); They should fall back to the same thing. Well they do different things. The part that they share is ball.update, which includes their movement, is inheirtened. But the parts they don't, like bubbles don't give health, because they have seperate update functions as well.
* Add music
* Bubble/food collision?

##Bugs##
* Bubbles always come out of left side, even when tail is there.