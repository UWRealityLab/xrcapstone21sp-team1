/* global AFRAME, NAF, Math
 * ball-killer adds an event listener on an entity and if a ball
 * collides with this entity it will set the balls color to white to
 * mark it as an inactive ball and set the balls thrower to null. */
AFRAME.registerComponent('ball-killer', {
  
  init: function() {
    let el = this.el
    
    this.onCollision = function(e) {
      let ball = e.detail.body.el
      if (ball.className == 'ball' && ball.getAttribute("color") != "white") {
        if (ball.getAttribute("color") == "#207567" && (Math.abs(ball.object3D.position.z) < 3.048))
          return
        ball.thrower = null
        ball.setAttribute("color", "white")
        
        let scene = document.querySelector('a-scene')
        if (scene.ballMasters[parseInt(ball.id.charAt(4))] == NAF.clientId) {
          NAF.connection.broadcastData("dead-ball", ball.id)
        }
      }
    }
    
    this.el.addEventListener('collide', this.onCollision);
    
  },
  
  remove: function() {
    this.el.removeEventListener('collide', this.onCollision)
  }
});