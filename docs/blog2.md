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

This demo is promising, but there are still some improvements we need to make. For some reason, the location of the blue sphere isn't updated inside of a WebXR session. So while in VR, a player can see another player, but they can't see them moving around, nor can they hit them (since the bounding sphere will sometimes be in a different place).

<hr>

### Individual work log

- **Clarisa:**

- **Akash:**

- **Eddie:**

- **Timothy:** I tried to update the [original Croquet demo](https://croquet-hello-webvr.glitch.me/) to support physics collisions between users using Cannon.js (my new version can be found [here](https://croquet-aframe-cannon.glitch.me/)). After a while, I decided it would be better to create a new [demo](https://super-hands-croquet.glitch.me/) from the ground up that used aframe's physics engine and Croquet instead of Cannon.js because it would work better with [super hands](https://github.com/wmurphyrd/aframe-super-hands-component), which we're (currently) using for throwing and catching the balls. (As it turns out, aframe's physics engine is based on Cannon.js, so this might have been a moot point). In this demo, players are represented by blue spheres, and each player can see other players move. Players can also throw balls at each other (see the ["What we accomplished"](#what-we-accomplished) section for more details about this demo).

<hr>

### Plans for next week


<hr>

### Blocking issues



<hr>

### Questions:


### Notes
