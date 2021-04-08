---
title: Blog
layout: template
filename: blog
---

# Blog

<hr>

## Blog Post #1 - Idea Formulation - April 6th, 2021

<hr>

### What we accomplished

This week we spent a lot of time thinking about and iterating on our capstone project design. We all met together and iterated through a few different possible ideas ranging from a VR farming game very similar to Stardew Valley, mini-games which a user could play while working out, a VR application which simulates being at the school/office, an educational app which would educate people on the effects of overfishing, etc. Initially, we all decided on pursuing the [earth creating game](https://dan-ball.jp/en/javagame/ee/). The earth creating game is a simulation game that creates the Earth using various dots on the field of gravity. We thought this would be interesting to recreate in VR. We spent a pretty significant amount of time thinking about how to implement this in VR using WebXR. We researched how to recreate the game - particularly trying to see how we could make it using AFRAME. We created [a small application with 20,000 spheres](https://daffy-sun-traffic.glitch.me/) using glitch and this was too computationally intensive. After determining this wouldn't be too feasible to recreate and also discussing our idea with the course staff, we decided to switch our project idea to VR Dodgeball.

#### Project Idea: Dodgeball
The project we are now pursuing is VR Dodgeball - based on the classic game dodgeball but instead in VR. We decided to settle on recreating dodgeball as we felt the idea was simple enough to expand upon and also allowed people to connect with their friends or family over a light-hearted game. We aim to implement a few core features such as multiplayer mode using the croquet API, different maps, character customization as well as voice chat between teammates.

But this is only where the fun starts. Once we implement the base games, we plan on adding features and add-ons to add a twist to the game that is only possible in VR. Some features we are considering are as follows:
- Different maps with structures to hide behind and take cover.
- Power Ups such as anti-gravity, large ball, and passing through obstacles.
- Respawning players with game modes such as protect the point or capture the flag.

#### Implementation Plans
We spent the rest of the week discussing how we would implement this using the technologies we've learned thus far in class. We researched different physics engines to use with our app for collision detection and came across a few viable options - particularly AFRAME's physic option seemed the most user friendly. We also spent a good amount of time on creating our website, fleshing out the main ideas on our project requirements doc, and working on this blog post! We still need to work out a few aspects of our design, but we feel fairly confident in where we are right now, especially as we were able to complete a small proof of concept for throwing a sphere and having it interact with a solid body.

Throwing objects seems to be pretty well supported. In the demo app shown in class you can throw paper airplanes, as well as a ping pong ball. Catching also seems feasible (although that requires some practice). There also seems to be collision detection for only the hands and not the rest of the user’s body.

We will need to figure out how to implement a body for each player. Right now we are considering the avatar to be a sphere around the user’s head (VR headset). This makes it easier to do with a rig entity and a camera entity. This is important since implementing maps would mean that users will have 2 ways of moving around (moving their head and moving positions using controls). If we made a full body avatar, we would have no way to track if, for example, the user were to dodge a ball coming at their legs by lifting their legs.

We plan on using Croquet to create the multiplayer environment but we still need to do more research on the api for that.

<hr>

### Inidividual work log

- **Clarisa:** I worked on the website using GitHub pages and modified it to support multiple pages and helped write this blog post. I also talked with the course staff while we were iterating through different possible ideas in order to pick our final project idea. Additionally - I spent some time working on my demo tutorial (homework). My demo tutorial consists of a few spheres, a rotating cube, and two cylinders. The user is able to interact with the spheres by picking them up, stretching them (with two hands to change the size), bouncing them, and throwing them. The cylinders change their color to blue when they detect a collision with a sphere. The rotating cube is a solid body so the sphere do not go through them. Instead of walking around - the user can also use the joystick to control their movement as well. The live demo I made can be found [here](https://general-enchanting-cheque.glitch.me/).

- **Akash:** I worked on the blog post as well as my demo where I tested our movement and throwing physics in VR. I also played around with collision events that will help us detect when a player loses and gets eliminated. My demo application shows a forest scene where the user can use the right thumbstick to explore or the left trigger to teleport to any part of the map. They can pick up the ball in the middle and throw it at the walls in front. Clicking on the walls alternates between a darker and light color while hitting the ball on the wall turns it red for a while before it transitions back to its original color. My live demo can be found [here](https://full-merciful-fukuiraptor.glitch.me/).

- **Eddie:** For my demo, I played around with interacting with a-frame objects and adding/removing components programatically. In my demo, a user initially starts with a sphere, which they can select with their mouse. Upon selecting the sphere, it becomes invisible and a new sphere gets attached to the camera in the bottom right corner. When the user clicks again, the new sphere will be deleted and the old sphere will be cast off into the distance in the direction that the camera is currently facing. My live demo can be found [here](https://throw-ball.glitch.me/).

- **Timothy:** I also worked on the website. I first created an HTML + CSS site, then ported the existing content over to Github pages. I also ~~played~~ experimented with the Oculus Quest's demos to gauge the feasibility of a dodgeball application. After throwing lots of paper airplanes and tennis balls, I determined that throwing dodgeballs would be feasible and maybe even natively supported. Catching is harder, although I was able to find a [demo](https://wmurphyrd.github.io/aframe-super-hands-component/examples/physics/) of throwable and catchable cubes
that used aframe. I also created the [application with 20,000 spheres](https://daffy-sun-traffic.glitch.me/), which showed that our original idea would be too computationally expensive. Unfortunately, my demo tutorial for homework doesn't relate to dodgeball very much (I made it before we came up with the dodgeball idea), so I created the aforementioned demos to compensate. In my tutorial, the user can move a sphere using buttons as well as change its color. My live demo can be found [here](https://melodious-gem-sail.glitch.me/).

<hr>

### Plans for next week

Our main goal for next week is to complete our project requirements doc which will give us a good plan moving forward in where we should be throughout the rest of the course - to ensure we finish our project on time. As a group, we will also start coding for our project. Additionally, we will spend a fair amount of time on our project pitch since this is due as well - in conjunction with the project requirements document. We mostly plan to work together for this, and figure out a design for our final project that will allow us to split up our work better starting next week.

<hr>

### Blocking issues

One concern is the integration of Croquet with a physics engine, as it seems that aframe’s default physics engine does not work with Croquet (although we haven’t tested this). While there may be [other physics engines](https://github.com/croquet/Oimo.js) that work with Croquet, we’re not sure if they’ll be compatible with aframe and object interactions (e.g., can we pick up and throw objects?). We’re probably not the only group facing this issue, though, and the people at Croquet are scheduled to give another demonstration soon, so we can ask them then.

<hr>

### Questions:
We were wondering if we could buy this [Udemy a-frame course](https://www.udemy.com/course/learn-a-frame-and-get-ready-for-webvr/) as a group so we can get more comfortable with a-frame. Although the tutorial is no longer under discount, Udemy has pretty frequent discounts so we were wondering if we can get this with our group budget.

### Notes
- [Udemy AFRAME tutorial we want to buy with our budget](https://www.udemy.com/course/learn-a-frame-and-get-ready-for-webvr/)
- [Croquet.io SDK we'll be using](https://croquet.io/sdk/docs/)
- [Mozilla Demo for building game using AFRAME and low-poly models](https://hacks.mozilla.org/2018/03/immersive-aframe-low-poly/)
- [Cannon.js physics engine we researched but might not use](https://schteppe.github.io/cannon.js/)
