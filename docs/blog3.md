---
title: Blog Post 3
layout: template
filename: blog3
---

## Blog Post #3 - Starting work on MVP - April 22nd, 2021

<hr>

All applications described can also be found in the notes section.

### What we accomplished

This week we split into 2 groups. One group worked on building a Croquet application from the ground up with voice chat and physics, and the other group worked on writing a component that would allow players to pick up and throw balls in a more natural-feeling way.

#### Voice Chat and Physics With Croquet

A link to an app demonstrating this feature can be found [here](https://cate-edit.glitch.me/).

Below is what a room might look like when you enter ![](https://i.imgur.com/eEkOU8S.png)

The white balls represent users and when entering the same room, players are now able to hold conversations with each other. When you move to the other side of another player, you will also be able to hear the voice coming from that direction.

When another player runs into one of the objects on the left (like the left hand cylinder), all other users will be able to see the cylinder get hit in the opposite direction. One thing that we will still need to improve is that when you hit a cylinder with your avatar, although other users can see the collision and the result, the cylinder will not update on your screen and you will simply pass through it.

#### Throwing Balls

In our [rapid prototype app](https://aba1.glitch.me/), we had implemented throwing in a naive way. Previously, a user can pick up a ball and when releasing it, the velocity of the ball is set to the velocity of the controller and then multiplied by some scalar. This led to some unintended behavior where if you released the ball after picking it up, even with no throwing motion, the ball would move much more quickly than expected. Additionally, the "Superhands" module had a significant delay between when you move your hand and when the grabbed ball is moved. This led to issues where if you moved your hand too fast, the ball would end up being too far away from your hands, ending the grab. When combined with the above naive implementation of throwing, the ball would sometimes shoot off in an unknown direction.

This week, we implemented our own throwing and grabbing system that aimed to solve this issue. A link the the new demo can be found [here](https://aaqq.glitch.me/). Here, the ball tracks the motion of the controller with a nearly unnoticable delay so that it is impossible to lose your grip on the ball from jerky motions. Throwing has also been improved so that we now track the position of the ball from the last few frames before the ball is released to determine the throwing velocity. This led to a much more natural feeling throw and normal behavior when the you drop the ball.

The new demo still requires some tuning. Currently, we are determing the velocity of the ball based on the linear motion of your hands. However, in a real throw, the velocity of the ball is also impacted by angular forces (i.e. wrist motions). In a future update, we intend to add this.

<hr>

### Individual work log

- **Clarisa:** 

- **Akash:** 

- **Eddie:** 
I worked on the updated throwing app with Akash. We focused on making throwing feel more natural by tracking the throwing motion rather than the instant the ball is released and trying to get the ball to follow the motion of the controller more precisely.
- **Timothy:** 

<hr>

### Plans for next week

Next week, we plan on combining the parts we worked on this week to create a basic game where multiple players can speak and throw items at each other.

<hr>

### Blocking issues

None at the moment.

<hr>

### Notes

[Voice Chat and Physics Demo](https://cate-edit.glitch.me/)

[Old Rapid Development App](https://aba1.glitch.me/)

[Updated Throwing App](https://aaqq.glitch.me/)


### Delivarables

None this week.
