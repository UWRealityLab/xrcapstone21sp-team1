/* global AFRAME, THREE
 * spawn-in-circle will spawn new players to the scene randomly within a circle. */
AFRAME.registerComponent('spawn-in-circle', {
  schema: {
    radius: {type: 'number', default: 1}
  },

  init: function() {
    let el = this.el
    let setPosition = function () {
      var position = new THREE.Vector3()
      var rotation = new THREE.Vector3()
      
      // Set position based on team boundaries
      
      if (getMetadata().gamemode == "Classic") {
        if (getMetadata().team == 1) {
          // console.log("Blue team")
          position.z = 1
          rotation.y = 0
        } else {
          // console.log("Red team")
          position.z = -8.5
          rotation.y = 180
        }
        position.x = -3.5

        el.setAttribute('position', {x: position.x + Math.random() * 7.5, y: position.y, z: position.z + Math.random() * 7.5});
      } else {
        rotation.y = 0
        if (getMetadata().team == 1) {
          // console.log("Blue team")
          position.x = 7.6
          position.z = 8.2
        } else {
          // console.log("Red team")
          position.x = -10
          position.z = 8.2
        }
        
        el.setAttribute('position', {x: position.x + Math.random() * 3, y: position.y, z: position.z + Math.random() * 3});
      }   
      
      el.setAttribute('rotation', {x: rotation.x, y: rotation.y, z: rotation.z});
    }
    setTimeout(setPosition, 100)
  }
});
