---
title: Blog Post 2
layout: template
filename: blog2
---

## Blog Post #2 -  Finalizing Project Specifics - April 13th, 2021

<hr>

### What we accomplished

#### Croquet + Physics + Super Hands demo
We also worked on a [demo](https://super-hands-croquet.glitch.me/) that integrated Croquet, aframe's physics system, and super hands. Like the [original Croquet demo](https://croquet-hello-webvr.glitch.me/), players can see each other move around in the virtual world.

![Screenshot of the demo with one player moving and the other watching a moving blue sphere](/images/croquet-player.gif)

In the above image, two players have joined the same session. The one on the left is moving around. The blue sphere on the right represents the left player. As the left player moves, the blue sphere moves with them. Using croquet, location updates are published to each player so they can see other players moving around.

The red spikes on the sphere represent the bounding sphere that the physics engine is using to compute collisions. While working on this demo, we discovered that the bounding sphere wasn't always in the same location as the blue sphere displayed on the screen. With some modifications (repeatedly setting the blue sphere's location to the bounding sphere's), we've fixed this issue on desktop computers.

While in VR, the user can grab the red cube and throw it. There's also a small sphere that is also grabbable, although it isn't pictured in this screenshot.

This demo is promising, but there are still some improvements we need to make. For some reason, the location of the blue sphere isn't updated inside of a WebXR session. So while in VR, a player can see another player, but they can't see them moving around, nor can they hit them (since the bounding sphere will sometimes be in a different place). We also haven't implemented collision detection for when one player hits another with a ball. Finally, the locations of the other objects aren't published (so if one player throws the red cube, the other players won't know).

<hr>

### Individual work log

- **Clarisa:**

- **Akash:**

- **Eddie:** I wrote the slides for the project pitch last Tuesday. It turned out that we aren't the first team to have come up with VR dodgeball, but we're hoping to create a better version of the already-existing game. For the pitch, I also modified Akash's demo from last week to support better (faster) throwing so that we could include a short video of it. There are still some kinks that we need to iron out since you can't use the joystick while holding a ball or you move too quickly and lose contact with the ball (ending the grab). Akash and I later created the rapid prototype app based off this demo, where users can pick up balls and throw them at moving targets. We're still researching on how to get Croquet working with physics and hands but we will hopefully be able to integrate networking into the demo soon. The current demo can be found [here](https://aba1.glitch.me/)

- **Timothy:** I tried to update the [original Croquet demo](https://croquet-hello-webvr.glitch.me/) to support physics collisions between users using Cannon.js (my new version can be found [here](https://croquet-aframe-cannon.glitch.me/)). After a while, I decided it would be better to create a new [demo](https://super-hands-croquet.glitch.me/) from the ground up that used aframe's physics engine and Croquet instead of Cannon.js because it would work better with [super hands](https://github.com/wmurphyrd/aframe-super-hands-component), which we're (currently) using for throwing and catching the balls. (As it turns out, aframe's physics engine is based on Cannon.js, so this might have been a moot point). In this demo, players are represented by blue spheres, and each player can see other players move. Players can also throw balls at each other (see the ["Croquet + Physics + Super Hands demo"](#croquet--physics--super-hands-demo) section for more details about this demo).

<hr>

### Plans for next week


<hr>

### Blocking issues



<hr>

### Questions:


### Notes
