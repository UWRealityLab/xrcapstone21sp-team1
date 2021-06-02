/* global AFRAME, NAF, Math
 * ball-respawner adds an event listener on an entity and if a ball
 * collides with this entity it will respawn the ball on the 
 * opposite of the master's team's side. */
AFRAME.registerComponent('ball-respawner', {
  
  init: function() {
    let el = this.el
    
    this.onCollision = function(e) {
      let ball = e.detail.body.el
      let scene = document.querySelector('a-scene')
      if (ball.className == 'ball' && scene.ballMasters[parseInt(ball.id.charAt(4))] == NAF.clientId) {
        console.log('out')
        ball.thrower = null
        ball.setAttribute("color", "white")
        
        NAF.connection.broadcastData("dead-ball", ball.id)
        
        ball.body.velocity.set(0, 0, 0)
        ball.body.angularVelocity.set(0, 0, 0)
        if (getMetadata().team == 1) {
          ball.setAttribute('position', '-8.25 2.5 6')
          ball.body.position.set(-8.25, 2.5, 6)
        } else if (getMetadata().team == 2) {
          ball.setAttribute('position', '9.25 2.5 6')
          ball.body.position.set(9.25, 2.5, 6)
        }
      }
    }
    
    this.el.addEventListener('collide', this.onCollision);
    
  },
  
  remove: function() {
    this.el.removeEventListener('collide', this.onCollision)
  }
});