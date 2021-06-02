/* global AFRAME, NAF
 * collision-detector detects if there has been a collision between a ball and a player. */
AFRAME.registerComponent('collision-detector', {
  
  init: function() {
    let el = this.el
    
    this.onCollision = function(e) {
      // Thrower detects hits
      if (e.detail.body.el.className != 'ball' || NAF.clientId != document.querySelector('a-scene').ballMasters[parseInt(e.detail.body.el.id.charAt(4))])
        return
    
      if (el.className == "body-hitbox" || el.className == "head") {
        var creator = el.parentNode.getAttribute("networked").creator
      }
      if (creator != NAF.clientId) {
        NAF.connection.broadcastData("hit", {player: creator, ballId: e.detail.body.el.id})
      }
    }
    
    this.el.addEventListener('collide', this.onCollision);
    
  },
  
  remove: function() {
    this.el.removeEventListener('collide', this.onCollision)
  }
});
