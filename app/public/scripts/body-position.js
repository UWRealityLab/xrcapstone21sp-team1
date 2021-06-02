/* global AFRAME, THREE
 * body-position sets the position of a players camera, head, and body on a tick
 * function as to allow players to rotate their head without rotating their whole body. */
AFRAME.registerComponent('body-position', {
  init: function() {
    this.counter = 0
  },
  
  tick: function() {
    this.counter++
    let el = this.el
    let camera = document.querySelector('a-scene').camera.el
    let position = camera.object3D.position
    let player = document.getElementById("player")
    if (!player)
      return
    let playerPosition = new THREE.Vector3();
    player.object3D.getWorldPosition(playerPosition)
    let global = new THREE.Vector3();
    let playerData = getMetadata()
    
    global.y = position.y + playerPosition.y
    
    if (playerData.team == 2) {
      global.x = - position.x + playerPosition.x
      global.z = - position.z + playerPosition.z
    } else {
      global.x = position.x + playerPosition.x
      global.z = position.z + playerPosition.z
    }
    
    // if (this.counter % 20 == 0) {
    //   console.log(position)
    //   console.log(playerPosition)
    //   console.log(global)
    // }

    let rotation = camera.object3D.rotation
    if (el.className == "nametag") {
      
      el.object3D.lookAt(global)
      
      let vec2 = new THREE.Vector3()
      el.parentNode.object3D.getWorldPosition(vec2)
      vec2.y += 0.4

      el.setAttribute("position", el.parentNode.object3D.worldToLocal(vec2))
      
    } else {
      // Set position of head static body
      this.el.setAttribute('position', {x: position.x, y: position.y, z: position.z})

      // Ensure player cannot stick their head out of the map
      if (getMetadata().gamemode == 'Classic') {
        // Ensure player cannot stick their head out of the map
        if (playerData.team == 1 && global.z < 0) {
          player.object3D.position.set(playerPosition.x, playerPosition.y, playerPosition.z + Math.abs(global.z))
        }
        if (playerData.team == 2 && global.z > 0) {
          player.object3D.position.set(playerPosition.x, playerPosition.y, playerPosition.z - Math.abs(global.z))
        }
        if (global.z > 9.7) {
          player.object3D.position.set(playerPosition.x, playerPosition.y, playerPosition.z + 9.7 - Math.abs(global.z))
        }
        if (global.z < -9.7) {
          player.object3D.position.set(playerPosition.x, playerPosition.y, playerPosition.z - 9.7 + Math.abs(global.z))
        }
        if (global.x > 4.55) {
          player.object3D.position.set(playerPosition.x + 4.55 - Math.abs(global.x), playerPosition.y, playerPosition.z)
        }
        if (global.x < -4.55) {
          player.object3D.position.set(playerPosition.x - 4.55 + Math.abs(global.x), playerPosition.y, playerPosition.z)
        }
      }
    }
    
    if (el.id == "body") {
      let direction = new THREE.Vector3()

      el.setAttribute("position", {x: position.x + Math.sin(rotation.y) * 0.15, y: position.y - 0.75, z: position.z + Math.cos(rotation.y) * 0.15})
      el.object3D.rotation.y = rotation.y
    }
  }
});
