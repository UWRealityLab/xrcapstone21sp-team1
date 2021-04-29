---
title: Blog Post 4
layout: template
filename: blog4
---

## Blog Post #4 - Continuing work on MVP - April 29th, 2021

<hr>

All applications described can also be found in the notes section.

### What we accomplished

This week we mostly focused on [our blocking issue from last week](/xrcapstone21sp-team1/blog3#blocking-issues), which was updating the positions of objects for all users, creating the illusion that all users are in the same room. We also worked on adding our own throwing and grabbing system to our demo from last week although more work is needed to debug the code.

#### Physics updates and collision detection

We modified our [old demo](https://cate-edit.glitch.me/) in-place, so the link is the same.

At the time of this writing, this demo is only configured to update the position of the yellow cylinder. This is for debugging purposes (it's much easier to read one object's logs than five of them!), although our program is set up to make updating additional objects easy.

#### Issue #1: Positions weren't updating at all

The first issue we encountered was that the positions of objects weren't being updated at all. This obviously wasn't a great sign.

Our program is set up to only update the positions of objects when they move, as this method is more efficient. We do this by comparing the matrices stored in the model and in the view. Unfortunately, this comparison was written incorrectly, causing no updates to ever be published:

![Console output showing two different matrices along with the text, "ObjectView with id obj moved? false"](./images/blog4-issue1.png)

Correcting the comparison resolved this issue.

#### Issue #2: The objects would move indefinitely

The next issue we found was that objects would keep moving after a collision, even long after they would've normally stopped:

![A blue ball collides with a cylinder. The cylinder keeps moving to the right for both views](./images/blog4-issue2.gif)

After some debugging, we found that this was because of a race condition where two views would try to update the position of the same object at once. To minimize the chances of this happening, we are working on a new system that only updates the position when there's a collision or a user picks up/catches a ball. The advantage of this system is that we can reduce the number of times when multiple views would try to update an object's position at once.

<hr>

### Individual work log

- **Clarisa:** I worked on modifying our Croquet + Physics + Voice demo from last week (the croquet's team main deliverable/demo but had a bug related not updating object positions globally) to integrate Eddie + Akash's code for throwing/grabbing balls and removing the superhands code we initially had. The demo can be found [here](https://cate-edit-2.glitch.me/) - although it is currently not working and we would need to debug it more thorougly. Based on what I see is that we correctly recieve the grab event when a user tries to grab a ball and the distance from the ball is within grab range - however for some reason the grab event doesn't occur. After meeting with Akash and Eddie - they were able to work on another version of our project without Croquet and using networked aframe. I then reviewed their code to understand it more thorougly and integrated voice into their code. The plan for the weekend is to work together and finish our MVP on this version as we don't feel confident using Croquet - which seems like it is more in grasp as Croquet has proved to be more difficult to use then initially thought (especiall with aframes physic system - which our method for throwing and grabbing is built on).

- **Akash:**

- **Eddie:**

- **Timothy:** I worked on updating last week's demo to publish the positions of each object, as [described above](#physics-updates-and-collision-detection). I also modified the demo to update the orientation of each user, so you can see when other users turn:

![A screenshot of two separate windows, with the red dots rotating as the camera view rotates](./images/rotating_users.gif)

Although the users are spheres, you can see them "rotate" when the red dots (representing their physics bodies) move.

<hr>

### Plans for next week

Next week, we plan on finishing the MVP by May 6th. We will be working over the weekend as well.

If we do decide on continuing to use Croquet for multiplayer - this will entail:
 - Updating the demo to publish each object's position, including dodgeballs
 - Finish integrating our throwing system with Croquet 
 - Notify users when they've been hit by a dodgeball 

If we do decide on making the switch from Croquet to networked aframe for multiplayer:
 - Handle collision of dodgeballs and users (elimination event - main concern)
 - Work on improvements for dodgeball generation / logic
 - Polish demo for MVP (includes work on map - maybe implementing basic screen names for users, etc.)

<hr>

### Blocking issues

Our biggest blocking issue is (still) publishing the positions of objects through Croquet in a manner that avoids race conditions. This is only an issue if we keep using Croquet, however. If we are not to use Croquet - more work is required to handle collisions between dodgeballs and users which is more complicated then if we decide to use Croquet - so there are pros and cons related to dropping Croquet.

<hr>

### Notes

- [Original Voice Chat and Physics Demo - added collision detection for individual entities](https://cate-edit.glitch.me/)
- [Voice Chat and Physics demo, but with our own throwing system added (Not Complete and contains object positions bug)](https://cate-edit-2.glitch.me/)
- [Networked Aframe, Networked Audio, Physics Throwing Demo](https://aba11-edit.glitch.me/)

### Deliverables

None this week.
