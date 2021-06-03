---
title: Blog Post 9
layout: template
filename: blog9
---

## Blog Post #9 - Finishing up capture the flag & end of the quarter! - June 3rd, 2021

<hr>

### What we accomplished
This week we finished up work on capture the flag mode and worked on our PR Video and final demonstration. We also spent this week polishing up our app and tying up last minute strings in order to wrap up our project.

#### Wrapping up Capture the Flag
In order to finish Capture the Flag mode - we spent time this week adding physics colliders throughout our map and adding the game logic. For the physics colliders - we went through and added physics bodies to all of the trees and objects on the map as well as adding walls to the back of the map so that players and dodgeballs aren't able to go through them.
For the game logic - we implemented the logic in the game lobby where upon start and if the capture the flag game mode is selected in the drop down menu that all players in the room will be teleported to the new map for capture the flag. Additionally - players will be appropriately spawned on their teams respective base. We added the logic for allowing players to pick up and move the flag and the winning condition for if a team brings the opposing teams flag back to their base. If a team has won - victory will be displayed on their headset and if a team has lost - defeat will be displayed on their headset. We also added the logic for respawning balls which fall off the map on the opposing teams side.

Below shows a video of a game play of our new capture the flag mode:
<iframe width="660" height="415" src="https://www.youtube.com/embed/zTA3DkfFoVM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Additional Improvements - Polishing App
As mentioned above - we spent some time polishing up our app and making various improvements. In previous versions - if microphone permission was not given the app would not start. We fixed it so that that the app will now start without microphone permissions. We also removed the laser/raycasters from the controllers which are used for menu selection once the game starts as when the game has begun - players are not able to open the menu anymore. Additionally - we went back and added a victory state to classic mode where if all of the members of the opposing team have been eliminated then a victory message will be displayed for the winning team (and a defeat message will be displayed for the losing team).

Below shows a video of a game play of classic mode with the new victory message being displayed:
<iframe width="660" height="415" src="https://www.youtube.com/embed/CyolL3wHTik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Individual work log

- **Clarisa:** This week I worked with the team to help finish adding physics colliders to the capture the flag map. I also worked on the final presentation script/slides & our final PR video - as well as various housekeeping items with the website. I also worked on this blog post.

- **Akash:**

- **Eddie:**

- **Timothy:** I worked on adding physics colliders for the trees in the capture the flag map and also worked on various quality-of-life improvements, including removing raycasters once the game starts and making sure the game still works without microphone permissions are denied. I also researched various hosting methods in case we want to preserve our project after the quarter ends.

<hr>

### Plans for next week
We plan on attending the final demo day to showcase our project on Monday and returning our headsets.

<hr>

### Blocking issues
- None

<hr>

### Deliverables
- [Link to final project (playable in headset)](https://vr-dodgeball.glitch.me/)
- [Link to our code on Github](https://github.com/UWRealityLab/xrcapstone21sp-team1/tree/master/app)
- [Link to PR video](https://youtu.be/HoFF9onY47g)
- [Link to final presentation slides](https://docs.google.com/presentation/d/1pil2DFRitnMjbN64GfEy9QfPWpq5ioBwMjpeYMQNrAA/edit#slide=id.gdd7299ac0b_0_690)
