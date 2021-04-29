---
title: Blog Post 4
layout: template
filename: blog4
---

## Blog Post #4 - Continuing work on MVP - April 29th, 2021

<hr>

All applications described can also be found in the notes section.

### What we accomplished

This week we mostly focused on [our blocking issue from last week](/xrcapstone21sp-team1/blog3#blocking-issues), which was updating the positions of objects for all users, creating the illusion that all users are in the same room. We also worked on adding our own throwing and grabbing system to our demo from last week.

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

- **Clarisa:**

- **Akash:**

- **Eddie:**

- **Timothy:** I worked on updating last week's demo to publish the positions of each object, as [described above](#physics-updates-and-collision-detection). I also modified the demo to update the orientation of each user, so you can see when other users turn:

![A screenshot of two separate windows, with the red dots rotating as the camera view rotates](./images/rotating_users.gif)

Although the users are spheres, you can see them "rotate" when the red dots (representing their physics bodies) move.

<hr>

### Plans for next week

Next week, we plan on making everything magically work.

<hr>

### Blocking issues


<hr>

### Notes

- [Original Voice Chat and Physics Demo - added collision detection for individual entities](https://cate-edit.glitch.me/)
- [Voice Chat and Physics demo, but with our own throwing system added](https://cate-edit-2.glitch.me/)

### Deliverables

None this week.
