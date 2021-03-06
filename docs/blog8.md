---
title: Blog Post 8
layout: template
filename: blog8
---

## Blog Post #8 - Starting Capture the Flag Mode - May 26th, 2021

<hr>

### What we accomplished
This week, we began work on the capture the flag mode. Specifically, we finished work on a new map and NavMeshes, as the capture the flag mode needs a more open field than classic mode. We also finished integrating the networked menus from last week with the classic mode demo. Next week, we plan to finish up classic mode and begin working on another game mode.

#### The capture the flag map
We found another 3D model online that we plan on using as the map for the capture the flag mode. Here is a screenshot of what the map looks like inside the game:

![In-game screenshot of the capture the flag map](./images/blog8-capture-the-flag-in-game.png)

Like the classic map, we also added a NavMesh to keep players from walking too far (in this case, walking off of a cliff). This was implemented in a similar manner to the classic map, where neither the joystick nor physical movement can cause the player to exit the boundaries of the NavMesh.

#### Menu integration
Last week, we had two separate demos - one for classic mode, and another for a menu that players could use to choose teams. This week, we successfully combined the two demos into [a single application](https://aba44.glitch.me/):

![In-game screenshot of the menu inside classic mode](./images/blog8-menu.png)

When the page loads, the menu opens automatically and the user is assigned to a team (team assignment alternates between the two teams). After joining a team, the avatar teleports to the appropriate side and changes color (we do this by switching out the models). Everything is networked, so when one player joins a team, all the other players in the same room see the change.

Additionally, we replaced the green start button with the start button in the menu as shown above. When the user clicks on it, the menu is hidden and the balls are spawned.

### Form updates

Because we moved the team choosing functionality from the form (which is not shown in VR) to the networked menu (which is shown in VR), we had to update the form. For ease of use, we also added buttons that let the user randomize the room and user name:

![A screenshot of the form with the two randomize buttons](./images/blog8-form.png)

Above is a screenshot of the form showing what the randomized room and user names could look like.

#### Additional improvements
As mentioned last week, changing the avatar makes indicating when a player has died much more difficult. In the end, we decided to briefly change the nametag color to red before the player disappears entirely.

### Individual work log

- **Clarisa:** This week I worked with Timothy on integrating in-game menus with classic mode - ensuring that users are able to join different teams and start the game from the menu. I also worked on the form for randomizing the room names/usernames.

- **Akash:** I worked with Eddie on implementing Capture the flag. After acquiring the map model we built a navmesh model on blender that we used to restrict movement. Then we worked on the code that switches to the correct map and started working on the functionality for capture the flag.

- **Eddie:** I worked on implementing the rules for capture the flag with Akash, and made it so that players can switch between game modes easily.

- **Timothy:** I worked on integrating the menus with classic mode, including handling teleportation, making the menu display on startup, and making players join automatically. I also added a drop down menu for selecting the game mode to use (although I did not add the functionality to change the map, just the GUI element).

<hr>

### Plans for next week
We initially planned to start working on power ups this week, so we are still behind our PRD. Our plan for next week is to finish up capture the flag and begin working on a third game mode (probably protect the point) if there is time. Because we no longer have menus to integrate, we hope that this process will go by faster than in previous weeks, because there won't be as many action items dividing our attention. Also, one of our team members should have much more free time after the 31st (the final project for another class is due then), which should hopefully increase our productivity. Additionally - we want to polish our app as much as possible and will most likely spend a fair amount of time making our final video/preparing for our final presentation.

<hr>

### Blocking issues
- None

<hr>

### Notes
- None

### Deliverables
- [Classic mode integrated with networked menus](https://aba44.glitch.me/)
- [Capture the flag mode](https://aba47.glitch.me/)
