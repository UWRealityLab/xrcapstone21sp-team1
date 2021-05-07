---
title: Blog Post 5
layout: template
filename: blog5
---

## Blog Post #5- Finishing up MVP - May 6th, 2021

<hr>

All applications described can also be found in the notes section.

### What we accomplished
This week we moved over completely to using the Networked A-Frame module and worked on finalizing our MVP and smoothening out a lot of bugs we found over testing.

#### Collision Between Balls
Previously, we synchronized all the balls such that the balls were dynamic bodies in the owner's view and static bodies in everyone else's view. This would allow the owner to simulate the physics and everyone else to synchronize with that. But, since one can only affect the objects they own, their physics system can only update those balls. This means that the physics sytem can only accurately model the interactions between balls that share the same owner. 
To rememdy this, we decided to move to a system where everyone has local dynamic copies of the balls with which they simulate physics independanly. The ball is only networked upon pick up (or other user interactions). This is fine since the balls do not simulate physics while in a user's hand. To account for any deviations between users, we select a master user that broadcasts the positions and velocities of all balls in a heartbeat.

#### Collision Detection
If a ball hits another person, they detect the collision, turn red for 2 seconds (to indicate the successful hit) and die. Upon dying, their avatar dissapears from everyone's views, they drop any balls they had, and they re-spawn in the center of the room as a ghost so that they can spectate the rest of the match. To make it obvious, we add a text indicator that the user died upon getting hit. We also made sure that balls can only kill players when directly thrown by another player and lose the ability to kill upon hitting the ground.

#### Other Quality of Life Changes
Firstly, we did not like how our bodies were right underneath the camera, as this did not accurately reflect how our bodies are slightly behind us when we look down. Further, this blocked our view of the ground in front of us, making it harder to pick up balls. To fix this, we decided to offset our avatar heads and bodies backwards a little bit so that when we look down, we can see the ground in front of us (as well as our own bodies right behind).

We also worked on fixing bugs with users not spawning balls on joining lobby or crashing upon resetting ball positions.

#### Rooms
We got started with adding different rooms for the game, so multiple matches can be played simultaneously.


### Individual work log

- **Clarisa:** 

- **Akash:** I worked with Eddie on synchronizing the physics system to add the master user, detect collisions with other players, player death, and the other quality of life changes to offset the body backwards and fix the bugs introduced with adding a master user.

- **Eddie:** I worked with Akash in implementing a mostly working networked physics system. We implemented a system of physics where each user maintains a local copy of the physics world and a master sends periodic updates of the true state of the world to synchronize all users' views. At this point, the physics seemed mostly accurate between views so we implemented collision detection to finalize the MVP.

- **Timothy:** 

<hr>

### Plans for next week
We are now behind our initial plans from our PRD. Once we finish up adding rooms, we plan on working on in-game menus that will allow players to specify a game mode and room so that we can work on the classic mode that we were supposed to work on this week.
While we are behind, we think that the work we did this week was very important in laying the foundation for smooth and responsive gameplay.

<hr>

### Blocking issues
Our current implementation of the physics system relies on the master sending updated positions which sets everyone else slightly behind in time from the master. This lag is especially noticable in some cases right after throwing a ball, or if the master hits another player. We plan on discussing this with our mentor soon to help us come up with a strategy to solve it.

<hr>

### Notes
- None

### Deliverables
- [MVP Project](https://cate-mvp.glitch.me/)
