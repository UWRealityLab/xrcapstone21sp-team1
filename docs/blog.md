---
title: Blog
layout: template
filename: blog
---

# Blog

<hr>

## Blog Post #1 - Idea Formulation - April 6th, 2021

### What we accomplished

This week we spent a lot of time thinking about and iterating on our capstone project design. We all met together and iterated through a few different possible ideas ranging from a VR farming game very similar to Stardew Valley, mini-games which a user could play while working out, a VR application which simulates being at the school/office, an educational app which would educate people on the effects of overfishing, etc. Initially, we all decided on pursuing the [earth creating game](https://dan-ball.jp/en/javagame/ee/). The earth creating game is a simulation game that creates the Earth using various dots on the field of gravity. We thought this would be interesting to recreate in VR. We spent a pretty significant amount of time thinking about how to implement this in VR using WebXR. We researched how to recreate the game - particularly trying to see how we could make it using AFRAME. We created a small application with 20,000 spheres using glitch and this was too computationally intensive. After determining this wouldn't be too feasible to recreate and also discussing our idea with the course staff, we decided to switch our project idea to VR Dodgeball.

The project we are now pursuing is VR Dodgeball - based on the classic game dodgeball but instead in VR. We decided to settle on recreating dodgeball as we felt the idea was simple enough to expand upon and also allowed people to connect with their friends or family over a light-hearted game. We aim to implement a few core features such as multiplayer mode using the croquet API, different maps, and character customization. We spent the rest of the week discussing how we would implement this using the technologies we've learned thus far in class. We researched different physics engines to use with our app for collision detection and came across a few viable options - particularly AFRAME's physic option seemed the most user friendly. We also spent a good amount of time on creating our website, fleshing out the main ideas on our project requirements doc, and working on this blog post! We still need to work out a few aspects of our design, but we feel fairly confident in where we are right now, especially as we were able to complete a small proof of concept for throwing a sphere and having it interact with a solid body.

#### Inidividual work log

**Clarisa:** I worked on the website using GitHub pages and modified it to support multiple pages and helped write this blog post. I also talked with the course staff while we were iterating through different possible ideas in order to pick our final project idea. Additionally - I spent some time working on my demo tutorial (homework). My demo tutorial consists of a few spheres, a rotating cube, and two cylinders. The user is able to interact with the spheres by picking them up, stretching them (with two hands to change the size), bouncing them, and throwing them. The cylinders change their color to blue when they detect a collision with a sphere. The rotating cube is a solid body so the sphere do not go through them. Instead of walking around - the user can also use the joystick to control their movement as well. The live demo I made can be found [here](https://general-enchanting-cheque.glitch.me/). 

### Plans for next week

Our main goal for next week is to complete our project requirements doc which will give us a good plan moving forward in where we should be throughout the rest of the course - to ensure we finish our project on time. As a group, we will also start coding for our project. Additionally, we will spend a fair amount of time on our project pitch since this is due as well - in conjunction with the project requirements document.

#### Individual work goals

**Clarisa**: As the project requirements doc is due - my main goal will be to finish that. I also want to help to start coding for our project - by creating a basic map where the user is able to grab dodge-balls from a bin and throw them at targets. I can do this by remixing the demo project I worked on this week for my tutorial.


### Blocking issues

One concern is the integration of Croquet with a physics engine, as it seems that aframe’s default physics engine does not work with Croquet (although we haven’t tested this). While there may be [other physics engines](https://github.com/croquet/Oimo.js) that work with Croquet, we’re not sure if they’ll be compatible with aframe and object interactions (e.g., can we pick up and throw objects?). We’re probably not the only group facing this issue, though, and the people at Croquet are scheduled to give another demonstration soon, so we can ask them then.

### Notes
- [Udemy AFRAME tutorial we want to buy with our budget](https://www.udemy.com/course/learn-a-frame-and-get-ready-for-webvr/)
- [Croquet.io SDK we'll be using](https://croquet.io/sdk/docs/)
- [Mozilla Demo for building game using AFRAME and low-poly models](https://hacks.mozilla.org/2018/03/immersive-aframe-low-poly/)
- [Cannon.js physics engine we researched but might not use](https://schteppe.github.io/cannon.js/)

