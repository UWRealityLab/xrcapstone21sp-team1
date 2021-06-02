/* global AFRAME, THREE, NAF
 * grab-ball handles all the logic for grabbing and throwing dodgeballs. */
AFRAME.registerComponent('grab-ball', {
  schema: {hand: {type: 'string', default: 'right'}},
  init: function() {
    let el = this.el;
    el.velocities = [5]
    el.angularV = [5]
    el.previousPosition = undefined
    el.previousRotation = undefined
    el.next = 0
    el.grabbed = null
    this.counter = 0
    
    let balls = document.getElementsByClassName('ball')
    
    this.gripDown = function(e) {
      if (el.grabbed != null)
        return
      
      let metadata = getMetadata()
      let hand = document.getElementById(el.id).childNodes[1] // Fingers
      var handPos = new THREE.Vector3();
      hand.object3D.getWorldPosition(handPos)
      let balls = document.getElementsByClassName('ball')
      let flags = document.getElementsByClassName('flag')
      
      for (let i = 0; i < flags.length; i++) {
        let handPosNoY = new THREE.Vector3();
        let flagPos = new THREE.Vector3();
        hand.object3D.getWorldPosition(handPosNoY)
        flags[i].object3D.getWorldPosition(flagPos)
        handPosNoY.y = flags[i].getAttribute('position').y
        if (handPosNoY.distanceTo(flagPos) < 0.2) {
          let flag = flags[i]
          if (!NAF.utils.isMine(flags[i])) {
            flag = document.createElement('a-entity')
            flag.id = flags[i].getAttribute('flagColor')
            flag.setAttribute('flagColor', flag.id)
            flag.setAttribute('gltf-model', '#' + flag.id + '-asset')
            flag.setAttribute('networked', 'template: #flag-template')
            flag.setAttribute('position', flags[i].getAttribute('position'))
            document.querySelector('a-scene').appendChild(flag)
            NAF.connection.broadcastDataGuaranteed('flag-picked-up', flags[i].getAttribute('flagColor'))
          }
          el.grabbed = flag
          if (flag.hand != null && flag.hand != undefined) {
            flag.hand.grabbed = null
          }
          el.grabbed.hand = el
          return
        }
        
      }
      
      for (let i = 0; i < balls.length; i++) {
        let oldBall = balls[i]
        let oldId = oldBall.id
        var ballPos = new THREE.Vector3();
        oldBall.object3D.getWorldPosition(ballPos)
        
        if (handPos.distanceTo(ballPos) < 2 && oldBall.networked == null) {
          let scene = document.querySelector("a-scene")
          
          if (oldBall.hand != null && oldBall.hand != undefined) {
            oldBall.hand.grabbed = null
          }
          
          if (oldBall.thrower != null && oldBall.thrower != NAF.clientId && oldBall.thrower != metadata.team) {
            let owner = oldBall.getAttribute("networked").creator
            NAF.connection.sendDataGuaranteed(owner, "caught", oldBall.id)
          }
          
          let newBall = document.createElement('a-sphere');
          newBall.setAttribute("networked", {
            template:"#ball-template",
            attachTemplateToLocal:false})
          newBall.classList.add("ball")
          if (oldBall.getAttribute("color") != "#207567" || (Math.abs(oldBall.object3D.position.z) >= 3.048))
            newBall.setAttribute("color", metadata.color)
          else
          newBall.setAttribute("color", "#207567")
          newBall.setAttribute("radius", "0.1")
          newBall.setAttribute("position", {x: handPos.x, y: handPos.y, z: handPos.z})
          newBall.setAttribute("body", {type: "static"})
          if (oldBall.getAttribute("color") != "#207567" && (Math.abs(oldBall.object3D.position.z) >= 3.048)) {
            if (metadata.team == "1" || metadata.team == 2)
              newBall.thrower = metadata.team
            else
              newBall.thrower = NAF.clientId
          }
          
          scene.appendChild(newBall)
          scene.ballMasters[parseInt(oldId.charAt(4))] = null
          
          newBall.hand = el
          el.grabbed = newBall
          el.visible = false
          NAF.connection.broadcastData("picked-up", oldId)
          scene.removeChild(oldBall)
          el.grabbed.setAttribute("id", oldId)
          break;
        }
      }
    }
    
    this.gripUp = function(e) {
      if (el.grabbed != undefined && el.grabbed != null) {
        if (el.grabbed.className == 'flag') {
          el.grabbed.object3D.position.y = 1.3
          el.grabbed.hand = null
          
          let flagPos = new THREE.Vector3()
          el.grabbed.object3D.getWorldPosition(flagPos)
          flagPos.y = 0

          if (el.grabbed.getAttribute('flagColor') == 'redFlag') {
            let center = new THREE.Vector3(9.5, 0, 9.4)
            if (flagPos.distanceTo(center) < 1.7) {
              NAF.connection.broadcastData("game-over", 1)
              win(1)
            }
          } else {
            let center = new THREE.Vector3(-8.8, 0, 9.4)
            if (flagPos.distanceTo(center) < 1.7) {
              NAF.connection.broadcastData("game-over", 2)
              win(2)
            }
          }
          el.grabbed = null
          return
        }
        if (!NAF.utils.isMine(el.grabbed)) {
          return
        }
        el.grabbed.setAttribute('body', {type: "dynamic"})
        
        let hand = document.getElementById(el.id).childNodes[1] // Fingers
        var handPos = new THREE.Vector3();
        hand.object3D.getWorldPosition(handPos)
        
        let averageV = new THREE.Vector3();
        let averageW = new THREE.Vector3();
        let weights = [2.0, 2.0, 1.0, 0.5, 0.5]
        let totalV = 0
        let totalW = 0
        let current = el.next - 1;
        for (let i = 0; i < 5; i++) {
          if (current == -1) {
            current = 4;
          }
          if (el.velocities[current] != undefined && el.angularV[current] != undefined) {
            let temp1 = new THREE.Vector3()
            temp1 = el.velocities[current].clone()
            if(temp1.length() > 0.1) {
              temp1.multiplyScalar(weights[i])
              averageV.add(temp1)
              totalV += weights[i]
            }
            
            let temp2 = new THREE.Vector3()
            temp2 = el.angularV[current].clone()
            if(temp2.length() > 0.1) {
              temp2.multiplyScalar(weights[i])
              averageW.add(temp2)
              totalW += weights[i]
            }
          }
          current = current - 1;
        }
        
        if (totalV == 0) {
          totalV = 1;
        }
        
        if (totalW == 0) {
          totalW = 1;
        }
        
        averageV.divideScalar(totalV)
        averageW.divideScalar(totalW)
        
        averageV.multiplyScalar(1 + 0.2 * averageV.length())
        
        el.grabbed.body.angularVelocity.set(averageW.x, averageW.y, averageW.z)
        el.grabbed.body.velocity.set(averageV.x, averageV.y, averageV.z)
        el.grabbed.body.vlambda.set(0,0,0)
        el.grabbed.body.wlambda.set(0,0,0)
        el.grabbed.removeAttribute("networked")
        document.querySelector("a-scene").ballMasters[parseInt(el.grabbed.id.charAt(4))] = NAF.clientId

        NAF.connection.broadcastData("throw", {
          velocity: el.grabbed.body.velocity,
          angularVelocity: el.grabbed.body.angularVelocity,
          position: el.grabbed.body.position,
          id: el.grabbed.id,
          dead: false,
          metadata: getMetadata(),
          color: el.grabbed.getAttribute("color")
        })
        
        el.grabbed.hand = null
        el.grabbed = null        
        el.visible = true
        
      }
    }
    
//     this.triggerDown = function(e) {
//       let hand = document.getElementById(el.id).childNodes[1] // Fingers
//       var handPos = new THREE.Vector3();
//       hand.object3D.getWorldPosition(handPos)
      
//       let masterButtonPos = new THREE.Vector3();
//       document.getElementById('master-button').object3D.getWorldPosition(masterButtonPos)
//       if (handPos.distanceTo(masterButtonPos) < 0.2)
//         el.emit('master-change', {})
//     }
    
    this.die = function() {
      if (el.grabbed != undefined && el.grabbed != null && NAF.utils.isMine(el.grabbed)) {
        if (el.grabbed.className == 'flag') {
          el.grabbed.object3D.position.y = 1.3
          el.grabbed.hand = null
          
          let flagPos = new THREE.Vector3()
          el.grabbed.object3D.getWorldPosition(flagPos)
          flagPos.y = 0

          if (el.grabbed.getAttribute('flagColor') == 'redFlag') {
            let center = new THREE.Vector3(9.5, 0, 9.4)
            if (flagPos.distanceTo(center) < 1.7) {
              NAF.connection.broadcastData("game-over", 1)
              win(1)
            }
          } else {
            let center = new THREE.Vector3(-8.8, 0, 9.4)
            if (flagPos.distanceTo(center) < 1.7) {
              NAF.connection.broadcastData("game-over", 2)
              win(2)
            }
          }
          
          el.grabbed = null
          el.removeAttribute('grab-ball')
          return
        }
        el.grabbed.setAttribute('body', {type: "dynamic"})
        el.grabbed.body.angularVelocity.set(0, 0, 0)
        el.grabbed.body.velocity.set(0, 0, 0)
        el.grabbed.body.vlambda.set(0, 0, 0)
        el.grabbed.body.wlambda.set(0, 0, 0)
        el.grabbed.removeAttribute("networked")
        el.grabbed.setAttribute("color", "white")

        NAF.connection.broadcastData("throw", {
          velocity: el.grabbed.body.velocity,
          angularVelocity: el.grabbed.body.angularVelocity,
          position: el.grabbed.body.position,
          id: el.grabbed.id,
          dead: true
        })
        
        el.grabbed.hand = null
        el.grabbed = null        
        el.visible = true
      }
      el.removeAttribute('grab-ball')
    }
    
    this.el.addEventListener('gripdown', this.gripDown)
    this.el.addEventListener('triggerdown', this.triggerDown)
    this.el.addEventListener('gripup', this.gripUp)
    this.el.sceneEl.addEventListener('dead', this.die)
  },
  
  tick: function(time, timeDelta) {
    let el = this.el;
    
    let hand = el.childNodes[3] // Center of mass
    // if (this.counter++ % 100 == 0)
    //   console.log(el.childNodes)
    
    if (hand == null || hand == undefined)
      return
    
    var handPos = new THREE.Vector3();
    
    hand.object3D.getWorldPosition(handPos)
    if (el.previousPosition == undefined) {
      el.previousPosition = handPos.clone()
    }
    handPos.sub(el.previousPosition).divideScalar(timeDelta / 1000.0)
    el.velocities[el.next] = handPos.clone()
    
    var handRot = new THREE.Vector3();
    hand.object3D.getWorldDirection(handRot)
    if (el.previousRotation == undefined) {
      el.previousRotation = handRot.clone()
    }
    handRot.sub(el.previousRotation).divideScalar(timeDelta / 1000.0)
    el.angularV[el.next] = handRot.clone()
    
    if (++el.next > 5)
      el.next = 0
    
    hand.object3D.getWorldPosition(handPos)
    hand.object3D.getWorldDirection(handRot)
    el.previousPosition = handPos.clone()
    el.previousRotation = handRot.clone()
    if (el.grabbed != undefined && el.grabbed != null && el.grabbed.className == 'ball' && NAF.utils.isMine(el.grabbed) ) {
      el.grabbed.body.position.set(handPos.x, handPos.y, handPos.z)
    
      if (el.grabbed.getAttribute("color") == "#207567" && (Math.abs(el.grabbed.object3D.position.z) >= 3.048)) {
        let metadata = getMetadata()
        el.grabbed.setAttribute("color", metadata.color)
        if (metadata.team != 1 && metadata.team != 2)
          el.grabbed.thrower = NAF.clientId
        else
          el.grabbed.thrower = metadata.team
      }
    }
    
    if (el.grabbed != undefined && el.grabbed != null && el.grabbed.className == 'flag') {
      el.grabbed.setAttribute('position', {x: handPos.x, y: handPos.y, z: handPos.z})
    }
  },
  
  remove: function() {
    this.el.removeEventListener('triggerdown', this.triggerDown)
    this.el.removeEventListener('gripdown', this.gripDown)
    this.el.removeEventListener('gripup', this.gripUp)
    this.el.removeEventListener('dead', this.die)
  }
})