---
title: Blog Post 2
layout: template
filename: blog2
---

## Blog Post #2 -  Finalizing Project Specifics - April 13th, 2021

<hr>

### What we accomplished

This week we gave our project pitch in class where we talked about a variety of things as it relates to our project including: motivation behind our project, existing solutions, an MVP, secondary goals, plan for how to succeed this quarter, individual team mate responsibilities, the technology we plan on using for our project, and stretch goals. Some suggestions from the staff was too integrate voice chat as a required feature in our project, which was originally a stretch goal. The slides can be found [here](https://docs.google.com/presentation/d/1ooTNhn3zvYbwdJ0hO6mIZ8DKmbj0zTc9Z7tN6LT96zE/edit) - where we are Team 1.

We completed our [Project Requirements Document (PRD)](https://uwrealitylab.github.io/xrcapstone21sp-team1/project_requirements_doc) which details our project plan with deliverables for each week for the remainder of the quarter. We also discuss which features should be in the MVP and which features are secondary/stretch goals - as well as performance metrics, individual responsibilties, budget, and possible risks/how we will address these risks as they relate to our project.

#### Croquet + Physics + Super Hands demo
We also worked on a [demo](https://super-hands-croquet.glitch.me/) that integrated Croquet, aframe's physics system, and super hands. Like the [original Croquet demo](https://croquet-hello-webvr.glitch.me/), players can see each other move around in the virtual world.

![Screenshot of the demo with one player moving and the other watching a moving blue sphere](/images/croquet-player.gif)

In the above image, two players have joined the same session. The one on the left is moving around. The blue sphere on the right represents the left player. As the left player moves, the blue sphere moves with them. Using croquet, location updates are published to each player so they can see other players moving around.

The red spikes on the sphere represent the bounding sphere that the physics engine is using to compute collisions. While working on this demo, we discovered that the bounding sphere wasn't always in the same location as the blue sphere displayed on the screen. With some modifications (repeatedly setting the blue sphere's location to the bounding sphere's), we've fixed this issue on desktop computers.

While in VR, the user can grab the red cube and throw it. There's also a small sphere that is also grabbable, although it isn't pictured in this screenshot.

This demo is promising, but there are still some improvements we need to make. For some reason, the location of the blue sphere isn't updated inside of a WebXR session. So while in VR, a player can see another player, but they can't see them moving around, nor can they hit them (since the bounding sphere will sometimes be in a different place). We also haven't implemented collision detection for when one player hits another with a ball. Finally, the locations of the other objects aren't published (so if one player throws the red cube, the other players won't know).

### Rapid Prototype
We also worked on a rapid prototype to present to the staff which can be found [here](https://aba1.glitch.me/). The rapid prototype is a modifications of Akash's demo from last week to support faster throwing of spheres & allows users to throw them at moving targets. The next step is to integrate Croquet to support multiple users.


<hr>

### Individual work log

- **Clarisa:** I worked mostly on the PRD, this blog post, and the website. I also worked on the slide deck for our project pitch a bit to help polish up the details. This week I am also the team lead - so I also lead Thursday's meeting with the staff members to report our weekly progress. Collectively with the team - I also researched the Croquet SDK a bit more where I also joined their [developer slack](https://croquet-dev.slack.com/join/shared_invite/zt-ns5gscrp-6nfDQSzxvpgoJyRg9DNfsQ#/shared-invite/email).

- **Akash:** I worked on the [rapid prototype demo](https://aba1.glitch.me/) for this week. I helped Eddie modify our demo to make throwing feel a little nicer and added some moving targets to my demo from last week. We also played around with the environment component a little bit more to see what kind of maps we could implement. I also looked into alternatives for croquet by hosting our own server. I did some research on AWS services like Lambda that could help us keep track of the state of the game with variables for positions and velocities of each player and ball. I tried out some basic implementations of the service to see what it would be like working with it. We plan on using croquet still but this would server as a backup if that fails.

- **Eddie:** I wrote the slides for the project pitch last Tuesday. It turned out that we aren't the first team to have come up with VR dodgeball, but we're hoping to create a better version of the already-existing game. For the pitch, I also modified Akash's demo from last week to support better (faster) throwing so that we could include a short video of it. There are still some kinks that we need to iron out since you can't use the joystick while holding a ball or you move too quickly and lose contact with the ball (ending the grab). Akash and I later created the rapid prototype app based off this demo, where users can pick up balls and throw them at moving targets. We're still researching on how to get Croquet working with physics and hands but we will hopefully be able to integrate networking into the demo soon. The current demo can be found [here](https://aba1.glitch.me/)

- **Timothy:** I tried to update the [original Croquet demo](https://croquet-hello-webvr.glitch.me/) to support physics collisions between users using Cannon.js (my new version can be found [here](https://croquet-aframe-cannon.glitch.me/)). After a while, I decided it would be better to create a new [demo](https://super-hands-croquet.glitch.me/) from the ground up that used aframe's physics engine and Croquet instead of Cannon.js because it would work better with [super hands](https://github.com/wmurphyrd/aframe-super-hands-component), which we're (currently) using for throwing and catching the balls. (As it turns out, aframe's physics engine is based on Cannon.js, so this might have been a moot point). In this demo, players are represented by blue spheres, and each player can see other players move. Players can also throw balls at each other (see the ["Croquet + Physics + Super Hands demo"](#croquet--physics--super-hands-demo) section for more details about this demo).

<hr>

### Plans for next week

Our main goal for next week will be to integrate Croquet into a new application we build from scratch. We aim to have Croquet fully integrated into a new application with basic physics where voice chat is also implemented.

<hr>

### Blocking issues
- A blocking issue we discovered when having multiple users in a single session in VR modes is that positions of other users are not updated as they move around the room. That is - a player can see another player has entered but can't see how they move or that users interactions in the room (i.e. if a user moves an object etc.).
- As we have discovered while trying to integrate Croquet + Super Hands + Physics - Super Hands and Croquet do not work very well together. Particularly we found that if a user moves too quickly while holding a ball what happens is that the user will lose contact with the ball (ending the grab). This has shifted our implementation plans to instead create our own version of Super Hands with basic functionality of grabbing and throwing spheres.

<hr>

### Notes
- [Super Hands repo for reference](https://github.com/wmurphyrd/aframe-super-hands-component)


### Delivarables
- [Project Pitch Slide Deck - Team 1](https://docs.google.com/presentation/d/1ooTNhn3zvYbwdJ0hO6mIZ8DKmbj0zTc9Z7tN6LT96zE/edit) - Due Tuesday
- [Project Requirements Document (PRD)](https://uwrealitylab.github.io/xrcapstone21sp-team1/project_requirements_doc) - Due Thursday
- [Rapid Prototype](https://aba1.glitch.me/) - Due Thursday
