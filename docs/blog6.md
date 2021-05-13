---
title: Blog Post 6
layout: template
filename: blog6
---

## Blog Post #6- Working on our target product - May 13th, 2021

<hr>

### What we accomplished
After finishing up our MVP last week - this week we started work on our target product. We continued work on avatar customization, menus, maps, and started work on implementing another game mode (classic dodgeball). In addition - our PRD has been modified slightly to 

#### Avatar Customization, Rooms, Teams, and Classic Dodgeball Game Mode
We finished work on rooms so that users are able to specify which room they want to join, the team they want to play on (i.e. - picking 1 of 2 available teams), and their username. Their username and avatar color (which is specific to which team they have selected) will be synced for all users in the room. Multiple matches of dodgeball are able to be played as there are multiple rooms as well. We initially struggled and spent quite a bit of time getting avatar colors and usernames to correctly sync for all player views. This was due to a race condition but we were able to figure it out.

![A screenshot of the form to join a room.](./images/form1.png)

Above shows the form where users are able to specify which room they want to join, their username, and which team they'd like to play on.

With the addition of teams - we also started work on implementing teamed dodgeball (i.e. - classic mode). This mode allows users to play the classic game of dodgeball we are all familiar with - where users are placed on teams and the goal is to eliminate all of the other players on the other team. We also purchased a dodgeball court model.

![A screenshot of what it looks like when you join a room.](./images/demo1.png)

Above shows what it looks what when a player would join a room. The orange users are on team 1 while the blue users are on team 2. In addition - we added the game logic where users are not able to eliminate their own team members and instead are only able to eliminate players from the opposing team.


#### In-Game Menus
We also continued work on in-game menus.

TODO: insert picture and Timothy fill out small description.

### Individual work log

- **Clarisa:** I spent some time working on redoing our video for our MVP as requested by the staff. I also worked on looking for dodgeball court models to use for classic mode. Additionally - I worked on avatar customization and this blog post as well/was team lead.

- **Akash:** 

- **Eddie:** 

- **Timothy:** 

<hr>

### Plans for next week
We are a bit behind on our initial plans from our PRD. However - we think that the work we have done this week has been helpful in laying the foundation for a smooth and friendly user experience which is what we aiming for in our target product. Additionally - there have been some unforseen setbacks in avatar synchronization. The plan this weekend is to finish up classic mode including the map so that it looks more polished and fancy. Next week we aim to start work on capture the flag and finish in-game menus - where we have slightly modified our PRD to have implementing power-ups moved to week 9.

<hr>

### Blocking issues
- None

<hr>

### Notes
- None

### Deliverables
- [Demo for this week](https://aba34.glitch.me/)