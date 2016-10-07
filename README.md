# Harold Game
Harold is my fish and he [lives in his bowl](https://taylornodell.bandcamp.com/track/harolds-song). This is a game where you play as harold. You must blow 100 bubbles in a bubble nest to win, but blowing bubbles reduces your health which you must replenish with food. This was inspired by [this song I wrote](https://taylornodell.bandcamp.com/track/harolds-song), which was very popular at the camp I worked at the summer of 2016.

##APIs, Frameworks and Methods##
* Bootstrap
* Canvas
* Prototypical method of object construction
* requestAnimationFrame
* AABB and Circular Collision detection

##To-Dos##
* refactor to  MVC. Data for nestCount, maybe for bubble and food array
* Create bubble counter writing
* Create end screen if you run out of health
* Create rank on number of bubbles made like cat clicker
* Harold collision with bubbles?
* Background graphics
* Figure out bubble food hierarchy. Why do I need food.render() and bubble.render(); They should fall back to the same thing. Well they do different things. The part that they share is ball.update, which includes their movement, is inheirtened. But the parts they don't, like bubbles don't give health, because they have seperate update functions as well.
* Add music
* Add wikipedia entries for every ten bubbles blown
* Make health bar look tolerable

##Bugs##
* Food and Harold fall in front of tank edges, especially at the bottom// fix by drawing those last in render chain
* Pressing both directions on arrow or WASD gives double speed to harold
* You can lose after you win

##Attributions##
* Arrow Key Icon - Bruno Landowski - Noun Project
* Space Bar Icon - Arthur Shlain - Noun Project
