/* global AFRAME, NAF
 * master implements the logic for broadcasting the positions, velocities,
 * and angular velocities of all the balls in the scene to the other players
 * in order to synchronize these attributes between all players correctly. */
AFRAME.registerComponent('master', {

  init: function() {
    this.el.ballMasters = [5]
    this.el.counter = 0
  },
  
  tick: function() {
    this.el.counter++
    if (this.el.counter == 2) {
      this.el.counter = 0;
    }
    
    if (this.el.counter != 0) {
      return
    }
    
    let balls = document.getElementsByClassName('ball')
    let message = []
    let something = false
    
    for (let i = 0; i < balls.length; i++) {
      let ballnum = parseInt(balls[i].id.charAt(4))
      if (balls[i].hand != null || this.el.ballMasters[ballnum] != NAF.clientId) {
        continue
      }
      something = true
      message.push({
        id: balls[i].id,
        position: balls[i].body.position,
        velocity: balls[i].body.velocity,
        angularVelocity: balls[i].body.angularVelocity,
        // rotation: balls[i].rotation
      })
    }
    
    if (something)
      NAF.connection.broadcastData("set-balls", message)
    
  }
});

/* start-button adds an event listener to an entity where when selected it will spawn
 * dodge-balls and additionally change the master to the person who has selected the button
 * so that they will then broadcast the positions, velocities, and angular velocities of all the
 * balls in the scene. */
AFRAME.registerComponent('start-button', {
  
  init: function() {
    let el = this.el;
    this.broadcastNewMaster = function(e) {
      let scene = document.querySelector('a-scene') 
      console.log(e)
      setMetadata('gamemode', document.getElementById('mydropdown').getAttribute('value'))
      el.dispatchEvent(new CustomEvent('update-gui-master')); // Remove menu
      NAF.connection.broadcastData("new-master", {id: NAF.clientId, gamemode: getMetadata().gamemode});
      setMetadata('started', true)
      
      if (getMetadata().gamemode == 'Capture the flag') {
        console.log("Switching...")
        captureTheFlag()
        let blueFlag = document.createElement('a-entity')
        blueFlag.id = 'blueFlag'
        blueFlag.setAttribute('gltf-model', '#blueFlag-asset')
        blueFlag.setAttribute('position', '9.5 1.3 9.4')
        blueFlag.setAttribute('networked', 'template: #flag-template')
        blueFlag.setAttribute('flagColor', 'blueFlag')
        scene.appendChild(blueFlag)
        let redFlag = document.createElement('a-entity')
        redFlag.id = 'redFlag'
        redFlag.setAttribute('gltf-model', '#redFlag-asset')
        redFlag.setAttribute('position', '-8.8 1.3 9.4')
        redFlag.setAttribute('networked', 'template: #flag-template')
        redFlag.setAttribute('flagColor', 'redFlag')
        scene.appendChild(redFlag)
        console.log('I am master')
      } else {
        console.log("Classic")
        classic()
      }
      scene.ballMasters = [NAF.clientId, NAF.clientId, NAF.clientId, NAF.clientId, NAF.clientId]
    };
    
    // Called when the master has changed and we need to update the GUI
    this.updateGUIMaster = function() {
      // Hide the menu. Note that we use the toggle-visibility component
      // so we don't run into any conflicts.
      const menuEl = document.getElementsByClassName('menu')[0];
      if (menuEl.object3D.visible) {
        menuEl.components['toggle-visibility'].toggleVisibility()
      }
      
      // Remove the menu from the game
      if (menuEl.parentNode) {
        menuEl.parentNode.removeChild(menuEl);
      }
      
      // Remove the spawner component so we don't spawn new menus
      document.getElementById("player").removeAttribute('spawner');
      
      // Remove raycasting
      document.getElementById('leftHand').removeAttribute('laser-controls');
      document.getElementById('leftHand').removeAttribute('raycaster');
      document.getElementById('rightHand').removeAttribute('laser-controls');
      document.getElementById('rightHand').removeAttribute('raycaster');
      
    }
    
    this.el.addEventListener('master-change', this.broadcastNewMaster)
    this.el.addEventListener('click', this.broadcastNewMaster) // TODO change this?
    this.el.addEventListener('update-gui-master', this.updateGUIMaster)    
  },
  
  remove: function() {
    this.el.removeEventListener('master-change', this.broadcastNewMaster);
    this.el.removeEventListener('click', this.broadcastNewMaster);
    this.el.removeEventListener('update-gui-master', this.updateGUIMaster)    
  }
});

function captureTheFlag() {
  let scene = document.querySelector('a-scene') 
  let balls = document.getElementsByClassName("ball")
  let loadText = document.createElement("a-text")
  loadText.setAttribute('id', 'load-text1')
  loadText.setAttribute('position', {x: 0, y: 0.3, z: -1})
  loadText.setAttribute('scale', {x: 0.8, y: 0.8, z: 0.8})
  loadText.setAttribute('align', 'center')
  loadText.setAttribute('color', 'white')
  loadText.setAttribute('value', 'Loading')
  let loadText2 = document.createElement("a-text")
  loadText2.setAttribute('id', 'load-text2')
  loadText2.setAttribute('position', {x: 0, y: 0.1, z: -1})
  loadText2.setAttribute('scale', {x: 0.5, y: 0.5, z: 0.5})
  loadText2.setAttribute('align', 'center')
  loadText2.setAttribute('color', 'white')
  loadText2.setAttribute('value', 'Headset may appear to freeze')
  let avatar = document.getElementById('avatar')
  avatar.appendChild(loadText)
  avatar.appendChild(loadText2)
  
  let fun = function() {
    buildMap()
    while (balls.length != 0) {
      scene.removeChild(balls[0])
    }

    let ball_x = [-9, -7.5, 0, 8.5, 10]
    let ball_z = [6, 6, -4.5, 6, 6]
    for (let i = 0; i < 5; i++) {
      let newBall = document.createElement('a-sphere')
      newBall.setAttribute("id", "ball" + (i))
      newBall.classList.add("ball")
      newBall.setAttribute("color", "white")
      newBall.setAttribute("radius", "0.1")
      newBall.setAttribute("position", {x: ball_x[i], y: 2.5, z: ball_z[i]})
      newBall.setAttribute("body", {type: "dynamic"})

      scene.appendChild(newBall)
    }
    avatar.removeChild(loadText)
    avatar.removeChild(loadText2)
    
  }
  setTimeout(fun, 200)  
}

function buildMap() {
  let scene = document.querySelector('a-scene') 
  let player = document.getElementById('player')
  
  player.components['spawn-in-circle'].init()
  
  scene.removeChild(document.getElementById('map'))
  scene.removeChild(document.getElementById('navmesh-entity'))
  
  let walls = document.getElementsByClassName('wall')
  for (let i = walls.length-1; i >= 0; i--) {
    scene.removeChild(walls[i])
  }
      
  let map = document.createElement('a-entity')
  map.id = 'map'
  map.setAttribute('gltf-model', '#ctf-scene')
  
  
  
  let navmesh = document.createElement('a-entity')
  navmesh.id = 'navmesh-entity'
  navmesh.setAttribute('gltf-model', '#ctf-navmesh')
  navmesh.setAttribute('nav-mesh', {})
  navmesh.setAttribute('visible', 'false')
  
  scene.appendChild(map)
  scene.appendChild(navmesh)
  
  // Reset the movement-controls component
  player.components['movement-controls'].init();
  player.setAttribute('movement-controls', 'constrainToNavMesh', true);
  
  // Chasm
  let bottom = document.createElement('a-box')
  bottom.setAttribute('ball-respawner', '')
  bottom.setAttribute('position', {x: 0, y: -5, z: 0})
  bottom.setAttribute('rotation', '0 -90 0')
  bottom.setAttribute('scale', '100 1 100')
  bottom.setAttribute('static-body', '')
  bottom.setAttribute('color', 'green')
  bottom.setAttribute('visible', 'false')
  scene.appendChild(bottom)
  
  addPhysicsShape('a-box', '-8.1 -0.21 11.35', '0 32.79 0', '3.912 0.331 3.408')
  addPhysicsShape('a-box', '-7.4 -0.21 9.583', '0 -2.3 0', '3.912 0.331 4.251')
  addPhysicsShape('a-box', '-10.01 -0.21 12.132', '0 -40.2 0', '4.031 0.331 1')
  addPhysicsShape('a-box', '-8.69 -0.21 7.303', '0 -90.5 0', '7.866 0.331 6.486')
  addPhysicsShape('a-box', '-8.92 -0.13 4.797', '0 -151 0', '4.666 0.331 8.598')
  addPhysicsShape('a-box', '-7 -0.13 2.994', '0 178.4 0', '4.666 0.331 8.598')
  addPhysicsShape('a-box', '-8.55 -0.13 -1.187', '0 178.4 0', '8.113 0.331 7.553')
  addPhysicsShape('a-box', '-8.6 -0.94 -4.526', '0.098 -37.4 -0.851', '6.925 2 4.705')
  addPhysicsShape('a-box', '-8.91 -0.61 -4.231', '-5.37 -36.4 -10.47', '6.974 2.032 4.136')
  addPhysicsShape('a-box', '-6.43 -0.86 -4.839', '-0.29 -64.1 -0.804', '6.925 2 5.287')
  addPhysicsShape('a-box', '-3.32 -0.87 -7.821', '0.492 55.16 -0.701', '6.925 2 7.175')
  addPhysicsShape('a-box', '-0.37 -0.876 -7.744', '0 2.029 0', '12.45 2 10.731')
  addPhysicsShape('a-box', '5.367 -0.34 -6.106', '-1.71 106.2 179.41', '4.999 1 3.594')
  addPhysicsShape('a-box', '7.233 -0.24 -7.609', '-1.28 35 5.937', '4.144 1 3.594')
  addPhysicsShape('a-box', '8.372 -0.14 -6.943', '-2.47 34.88 7.05', '5.29 1 3.594')
  addPhysicsShape('a-box', '7.114 -0.39 -2.845', '0.005 65.64 2.237', '2.947 1 9.637')
  addPhysicsShape('a-box', '9.135 -0.5 -0.485', '0 -2.97 0', '7.534 1 6.159')
  addPhysicsShape('a-box', '9.135 -0.46 -0.485', '0.356 -1.15 0.029', '6.497 1 6.057')
  addPhysicsShape('a-box', '6.845 -0.57 4.03', '0.12 30.18 3.845', '1.279 1 4.565')
  addPhysicsShape('a-box', '9.242 -0.49 2.571', '0.815 12.04 0.014', '5.436 1 5.673')
  addPhysicsShape('a-box', '9.853 -0.53 8.431', '0 -1.59 0', '5.78 1 7.155')
  addPhysicsShape('a-box', '7.013 -0.53 6.786', '0 57.19 0', '1.945 1 1')
  addPhysicsShape('a-box', '6.631 -0.53 9.418', '0 91.76 0', '4.201 1 1')
  addPhysicsShape('a-box', '8.052 -0.53 12.516', '0 139.9 0', '4.051 1 1')
  addPhysicsShape('a-box', '10.25 -0.53 11.903', '0 32.5 0', '4.051 1 2.885')
  addPhysicsShape('a-box', '-0.15 0 -10.2', '9.637 0 0', '8.971 1.024 7.788')
  
  // Hills
  addPhysicsShape('a-box', '7.485 0.412 -2.739', '0.327 28.72 -167.3', '0.183 10.077 1.778')
  addPhysicsShape('a-box', '7.581 0.412 -3.897', '0.327 -28.8 -167.3', '0.183 10.077 1.778')
  addPhysicsShape('a-box', '6.425 3.979 -3.298', '1.806 -10.9 -167.2', '0.183 2.450 0.528')
  addPhysicsShape('a-box', '9.462 2.596 -1.819', '-13.6 91.25 -178.7', '0.183 10.077 4.269')
  addPhysicsShape('a-box', '9.537 2.552 -5.753', '5.826 -61.8 -171.8', '0.183 10.077 4.340')
  addPhysicsShape('a-box', '-8.77 0.370 -2.690', '-4.68 -24.0 164.4', '0.183 10.07 1.235')
  addPhysicsShape('a-box', '-10.6 0.478 -2.189', '-8.32 -87.0 179.05', '0.183 10.077 3.701')
  addPhysicsShape('a-box', '-8.67 0.358 -3.556', '-4.68 19.73 164.4', '0.183 10.077 1.464')
  addPhysicsShape('a-box', '-10.3 0.470 -4.433', '11.40 79.76 168.3', '0.183 10.077 3.037')
  addPhysicsShape('a-box', '-7.54 3.979 -3.360', '-3.44 -10.5 165.5', '0.183 2.450 0.528')
  
  // sword
  addPhysicsShape('a-box', '-0.002 -2.47 4.989', '0 0 0', '2.365 11.88 0.327')
  addPhysicsShape('a-box', '0 3.839 5.023', '0 0 0', '4.343 0.624 1.464')
  addPhysicsShape('a-box', '2.61 3.483 5.082', '0 0 -48.68', '1.719 0.26 0.606')
  addPhysicsShape('a-box', '-2.61 3.483 5.082', '0 0 52.245', '1.719 0.26 0.606')
  addPhysicsShape('a-box', '0 6.144 4.994', '0 0 0', '0.633 4.711 1')
  
  // islands
  addPhysicsShape('a-cone', '-12 8.564 7.264', '0 180 180', '2.281 3.7 2.485', true)
  
  // platforms
  addPhysicsShape('a-cylinder', '9.5 -0.04 9.4', '0 0 0', '1.572 0.5 1.563', true)
  addPhysicsShape('a-cylinder', '-8.8 -0.04 9.4', '0 0 0', '1.572 0.5 1.563', true)
  
  // castle
  addPhysicsShape('a-box', '-0.07 4.67 -11.18', '0 0 0', '3.958 12.94 1.707')
  addPhysicsShape('a-box', '-2.5 3.279 -9.801', '0 0 0', '0.274 7.673 0.274')
  addPhysicsShape('a-box', '2.5 3.279 -9.801', '0 0 0', '0.274 7.673 0.274')
  addPhysicsShape('a-box', '4.2 4.3 -11.7', '0 0 0', '0.274 7.673 0.274')
  addPhysicsShape('a-box', '-4.31 4.3 -11.7', '0 0 0', '0.274 7.673 0.274')
  addPhysicsShape('a-box', '5.188 6.55 -14.3', '0 0 0', '0.274 7.673 0.274')
  addPhysicsShape('a-box', '-5.16 6.55 -14.3', '0 0 0', '0.274 7.673 0.274')
  
  // rocks
  addPhysicsShape('a-box', '-5.01 0 -1.281', '0 -10.7 0', '0.676 1.015 1.752')
  addPhysicsShape('a-box', '6.909 -0.22 4.541', '0 18.38 0', '0.571 1 0.872')
  addPhysicsShape('a-box', '-10.3 -0.04 4.15', '0 -22.6 0', '0.776 1.015 1.752')
  addPhysicsShape('a-box', '6.990 -0.35 7.038', '0 -31.3 0', '0.268 1 0.356')
  addPhysicsShape('a-box', '-7.56 -0.09 11.699', '0 -62.7 0', '0.598 1.244 1.154')
  addPhysicsShape('a-box', '11.3 -0.46 1.511', '0 -31.3 0', '0.898 1.466 1.242')
  
  // walls
  addPhysicsShape('a-box', '12.56 2.552 1.356', '0 0 0', '0.183 10.07 21.725')
  addPhysicsShape('a-box', '-12.1 2.552 0.211', '0 0 0', '0.183 10.07 21.725')
  addPhysicsShape('a-box', '-5.36 2.552 -9.214', '0 -52.7 0', '0.183 10.07 21.725')
  addPhysicsShape('a-box', '5.36 2.552 -9.214', '0 -127.3 0', '0.183 10.07 21.725')

  // trees
  addPhysicsShape('a-cone', '-11 1.04163 -0.01879', '0 0 0', '0.4 1.6 0.4', true)
  addPhysicsShape('a-cone', '-10.43598 0.8825 -0.83974', '15 0 0', '0.7 3 0.7', true)
  addPhysicsShape('a-cone', '-11.2 0.8825 0.68293', '-15 0 0', '0.4 1.9 0.4', true)
  addPhysicsShape('a-cone', '-11.07661 1.67355 2.24251', '0 0 0', '0.5 3.3 0.5', true)
  addPhysicsShape('a-cone', '-11.29911 2.09422 -2.44092', '0 0 0', '0.4 1.8 0.4', true)
  addPhysicsShape('a-cone', '-11.49472 2.27643 -3.6373', '0 0 0', '0.4 2.7 0.4', true)
  addPhysicsShape('a-cone', '-11.92905 1.6962 -3.96828', '0 0 0', '0.4 1.5 0.4', true)
  addPhysicsShape('a-cone', '-8.28268 1.20636 -2.77411', '-5 0 -6.0', '0.4 1.6 0.4', true)
  addPhysicsShape('a-cone', '-7.86429 1.2736 -3.39871', '7 0 -6.0', '0.4 1.8 0.4', true)
  addPhysicsShape('a-cone', '-7.7326 1.0266 -3.96938', '-7 0 -6.0', '0.4 1.5 0.4', true)
  addPhysicsShape('a-cone', '-11.29385 1.04163 2.97006', '0 0 0', '0.4 1.6 0.4', true)
  addPhysicsShape('a-cone', '-11.075 0.96477 5.56415', '0 0 0', '0.4 1.8 0.4', true)
  addPhysicsShape('a-cone', '-10.87 0.965 6.2868', '0 0 0', '0.4 1.8 0.4', true)
  addPhysicsShape('a-cone', '-10.95216 1.28028 6.70276', '0 0 0', '0.4 2.7 0.4', true)
  addPhysicsShape('a-cone', '-10.95216 0.61415 7.32609', '0 0 0', '0.4 1.4 0.4', true)
  addPhysicsShape('a-cone', '-10.43826 1.04163 11.36433', '0 0 0', '0.4 1.6 0.4', true)
  addPhysicsShape('a-cone', '-10.31879 1.2172 11.70164', '12.365002176718296 1.1201324894807594 -2.051761864363478', '0.4 2.4 0.4', true)
  addPhysicsShape('a-cone', '-9.86039 0.60653 12.1624', '16.375133784838926 0.2681442481212253 2.231097654239426', '0.4 1.3537 0.4', true)
  addPhysicsShape('a-cone', '-6.25612 1.04329 -6.94571', '-3.7906887725855265 -23.30849606371702 -3.672086508993446', '0.4 1.76192 0.4', true)
  addPhysicsShape('a-cone', '-7.00251 1.22353 -6.87161', '4.483967704693822 -23.054102802678933 1.8323190288283728', '0.5 2.27132 0.5', true)
  addPhysicsShape('a-cone', '-4.84289 1.81638 -8.83837', '-3.9133017407435227 0.17417916971977027 -2.558256555259126', '0.4 3.47144 0.4', true)
  addPhysicsShape('a-cone', '4.80314 1.81746 -8.86783', '-1.9274300228200896 0.3689848200642502 -5.902611205437741', '0.4 3.47144 0.4', true)
  addPhysicsShape('a-cone', '6.95938 0.9238 -3.97052', '-8.137719564243081 0.8399561276617868 -4.198061764923542', '0.4 1.58151 0.4', true)
  addPhysicsShape('a-cone', '6.7842 1.09666 -3.44099', '10.360795809350677 -1.3533263120990044 9.677830117554736', '0.5 1.806 0.5', true)
  addPhysicsShape('a-cone', "11.842 1.073 7.379", "-5.896 0.398 -3.831", "0.4 1.948 0.4", true)
  addPhysicsShape('a-cone',"12.00277 0.89066 6.73917", "8.369194513475936 -12.288798789965897 0.27043607930174857", "0.4 2.142 0.4", true)
  addPhysicsShape('a-cone', "11.939 1.349 6.299", "0 0 0", "0.4 2.142 0.4", true)
  addPhysicsShape('a-cone', "11.971 0.881 5.498", "-12.15 1.271 0.182", "0.983 6.549 0.87", true)
  addPhysicsShape('a-cone',"11.79511 1.00856 3.30331", "-5.754788094293988 1.0622637521725464 2.872237426990817", "0.52321 2.142 0.43603" , true)
  addPhysicsShape('a-cone',"10.94219 1.50505 0.87256", "14.071270490617888 -35.7754847279686 -7.160253565749898", "0.56683 5.35609 0.58658" , true)
  addPhysicsShape('a-cone',"11.96643 2.31135 0.20582", "-0.3930490474597447 -9.019501610949419 -2.249432303683612", "0.74446 5.0307 0.74379", true)
  addPhysicsShape('a-cone',"12.019 1.86552 -1.50037", "-4.756122657380963 -5.0511959218733375 -2.7433219230863815", "1.00717 3.94319 1.07312", true)
  addPhysicsShape('a-cone',"10.41036 1.98474 -0.70203", "-0.49159778822224637 -2.4992419023606507 3.043551807734933", "0.42301 3.39568 0.43612", true)
  addPhysicsShape('a-cone',"8.5 1.15293 -0.83218", "-5.5193024404952205 1.860966918584914 -2.8023365759848566", "0.4 2.14186 0.4", true)
  addPhysicsShape('a-cone', "10.81609 1.13602 11.24929", "3.8949670912993364 1.386557864216592 -3.0189146225443078", "0.4 2.14186 0.4", true)
  addPhysicsShape('a-cone', "11.70278 2.3544 10.87099", "-2.0133736920897127 -1.0416372715478368 5.1182319839036445", "0.87006 4.81361 0.83917", true)
  addPhysicsShape('a-cone', "12.03399 1.13602 11.92639", "4.090345699438947 0.6021786426824952 -14.252325153879228", "0.4 2.14186 0.4", true)
  addPhysicsShape('a-cone', "-6.95383 1.76673 -7.94318", "4.769300686668973 7.74008685442229 8.487796777068015", "0.92275 3.69299 0.91044", true)
  addPhysicsShape('a-cone', "-7.918 1.08921 -7.06337", "-2.3823585121539628 -5.421899615322981 -7.632370788937696", "0.53947 1.85839 0.65325", true)
  scene.removeChild(document.getElementById('floor'))
}

function addPhysicsShape(shape, position, rotation, scale, isHull) {
  if (shape == 'a-cone') {
    let box1 = document.createElement('a-box')
    let box2 = document.createElement('a-box')
    
    let entity = document.createElement('a-entity')
    entity.setAttribute('position', position)
    entity.setAttribute('rotation', rotation)
    
    entity.appendChild(box1)
    entity.appendChild(box2)
    
    let scaling = scale.split(' ')
    box1.setAttribute('position', '0 ' + scaling[1] / 4 + ' 0')
    box2.setAttribute('position', '0 -' + scaling[1] / 4 + ' 0')
    
    box1.setAttribute('scale', {x: scaling[0], y: scaling[1] / 2, z: scaling[2]})
    box2.setAttribute('scale', {x: scaling[0] * 1.8, y: scaling[1] / 2, z: scaling[2] * 1.8})
    
    box1.setAttribute('ball-killer', '')
    box1.setAttribute('visible', 'false')
    box1.setAttribute('static-body', '')
    
    box2.setAttribute('static-body', '')
    box2.setAttribute('ball-killer', '')
    box2.setAttribute('visible', 'false')
    
    document.querySelector('a-scene').appendChild(entity)
    return
  }
  let entity = document.createElement(shape)
  entity.setAttribute('position', position)
  entity.setAttribute('rotation', rotation)
  entity.setAttribute('scale', scale)
  if (isHull)
    entity.setAttribute('static-body', 'shape: hull')
  else 
    entity.setAttribute('static-body', '')
  entity.setAttribute('ball-killer', '')
  entity.setAttribute('visible', 'false')
  document.querySelector('a-scene').appendChild(entity)
}

function classic() {
  let scene = document.querySelector("a-scene")
  let balls = document.getElementsByClassName("ball")
  let player = document.getElementById('player')
  
  player.components['spawn-in-circle'].init()
  
  while (balls.length != 0) {
    scene.removeChild(balls[0])
  }

  for (let i = 0; i < 5; i++) {
    let newBall = document.createElement('a-sphere')
    newBall.setAttribute("id", "ball" + (i))
    newBall.classList.add("ball")
    newBall.setAttribute("color", "#207567")
    newBall.setAttribute("radius", "0.1")
    newBall.setAttribute("position", {x: -2.4 + 1.2 * i, y: 2.5, z: 0})
    newBall.setAttribute("body", {type: "dynamic"})

    scene.appendChild(newBall)
  }
}
