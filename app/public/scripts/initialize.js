/* global NAF
 * onConnect() is called when the client has successfully connected to the server. 
 * Here, we subscribe to all custom events such as picking up and throwing dodgeballs, etc. */
function onConnect() {
  NAF.connection.subscribeToDataChannel("picked-up", function (senderId, dataType, ballId, targetId) {
    let ball = document.getElementById(ballId)
    ball.parentNode.removeChild(ball)
    document.querySelector("a-scene").ballMasters[parseInt(ballId.charAt(4))] = null
  });
  
  NAF.connection.subscribeToDataChannel('menu-updater', (e) => {
    console.log('received message: ', e);
  });
  console.log("onConnect", new Date());
  
  NAF.connection.subscribeToDataChannel("throw", function (senderId, dataType, ball, targetId) {
    let scene = document.querySelector('a-scene')
    let newBall = document.createElement('a-sphere')
    newBall.id = ball.id
    newBall.classList.add("ball")
    newBall.setAttribute("radius", "0.1")
    newBall.setAttribute("position", {x: ball.position.x, y: ball.position.y, z: ball.position.z})
    newBall.setAttribute("body", {type: "dynamic"})
    
    // If neutral ball was thrown
    if (ball.color == "#207567") {
      newBall.setAttribute("color", ball.color)
    } else {
      // Otherwise
      if (!ball.dead) {
        if (ball.metadata.team == "1" || ball.metadata.team == "2") {
          newBall.thrower = ball.metadata.team
        } else {
          newBall.thrower = senderId
        }
        newBall.setAttribute("color", ball.metadata.color)
      } else {
        newBall.thrower = null
        newBall.setAttribute("color", "white")
      }
    }
    
    scene.appendChild(newBall)
    scene.ballMasters[parseInt(ball.id.charAt(4))] = senderId
    var isNull = true
    let assignIfNotNull = function() {
      if (isNull) {
        isNull = newBall.body == null
        setTimeout(assignIfNotNull, 10)
      } else {
        newBall.body.position.set(ball.position.x, ball.position.y, ball.position.z)
        newBall.body.velocity.set(ball.velocity.x, ball.velocity.y, ball.velocity.z)
        newBall.body.angularVelocity.set(ball.angularVelocity.x, ball.angularVelocity.y, ball.angularVelocity.z)
        // newBall.setAttribute("rotation", {x: ball.rotation.x, y: ball.rotation.y, z: ball.rotation.z})
      }
    }
    setTimeout(assignIfNotNull, 10)
  });
  
  // Set positions & velocities of balls in room with corresponding ID given broadcasters view of balls in room.
  NAF.connection.subscribeToDataChannel("set-balls", function (senderId, dataType, balls, targetId) {
    let fun = () => {
      if (!getMetadata().started) {
        setMetadata('started', true)
        document.location.replace("/index.html?redirect")
      }
    }
    if (document.getElementById("player") !== null && !getMetadata().started)
      setTimeout(fun, 100)
    
    let scene = document.querySelector("a-scene")
    // if (scene.masterId == null) {
    //   masterChange(senderId)
    //   return
    // }
    // if (senderId != scene.masterId)
    //   return
  
    for (let i = 0; i < balls.length; i++) {
      // Get ball from broadcaster
      let curBall = balls[i]
      if (senderId != scene.ballMasters[parseInt(curBall.id.charAt(4))]) {
        continue;
      }
      
      // Get local ball in room for user and update position
      let localBall = document.getElementById(curBall.id)
      if (localBall == null || localBall.body == null) {
        return
      }
      localBall.body.position.set(curBall.position.x, curBall.position.y, curBall.position.z)
      localBall.body.velocity.set(curBall.velocity.x, curBall.velocity.y, curBall.velocity.z)
      localBall.body.angularVelocity.set(curBall.angularVelocity.x, curBall.angularVelocity.y, curBall.angularVelocity.z)
      // localBall.setAttribute("rotation", {x: curBall.rotation.x, y: curBall.rotation.y, z: curBall.rotation.z})
    }
  });
  
  // Update ownership whenever a new master takes control.
  NAF.connection.subscribeToDataChannel("new-master", function (senderId, dataType, data, targetId) {
    masterChange(data.senderId, data.gamemode)
  });
  
  NAF.connection.subscribeToDataChannel("hit", function (senderId, dataType, info, targetId) {      
    if (info.player != NAF.clientId)
      return
    
    let ball = document.getElementById(info.ballId)
    if (ball.thrower == getMetadata().team || ball.thrower == null)
      return
    // else 
    //   console.log(ball.thrower, document.getElementById("player").getAttribute("metadata").team)
    
    let leftGrabbed = document.getElementById("leftHand").grabbed
    let rightGrabbed = document.getElementById("rightHand").grabbed
    
    // Lagged catch
    if ((leftGrabbed != null && leftGrabbed.id == info.ballId) || (rightGrabbed != null && rightGrabbed.id == info.ballId)) {
      return
    }

    let scene = document.querySelector("a-scene")
    scene.emit("dead", {})
    NAF.connection.broadcastData("dead", {})
    
    let avatar = document.getElementById("avatar")
    // Create some text to let the user know that they've died
    let ghostText = document.createElement("a-text")
    ghostText.setAttribute('id', 'ghost-text')
    ghostText.setAttribute('position', {x: 0, y: 0.3, z: -1})
    ghostText.setAttribute('scale', {x: 0.8, y: 0.8, z: 0.8})
    ghostText.setAttribute('align', 'center')
    ghostText.setAttribute('color', 'white')
    ghostText.setAttribute('value', 'You died :(')
    avatar.appendChild(ghostText)

    let username = document.getElementById("username")
    username.getAttribute('text').color = 'red'
    setTimeout(die, 2000)
  })
  
  // NAF.connection.subscribeToDataChannel("dead", function (senderId, dataType, data, targetId) {
  //   let players = document.getElementsByClassName("player")
  //     for (let i = 0; i < players.length; i++) {
  //       if (players[i].getAttribute('networked').owner == senderId) {
  //         players[i].childNodes[0].setAttribute('color', 'red')
  //         players[i].childNodes[1].childNodes[1].setAttribute('color', 'red')
  //       }
  //     }
  // })
  
  NAF.connection.subscribeToDataChannel("dead-ball", function (senderId, dataType, data, targetId) {
    if (document.querySelector('a-scene').ballMasters[parseInt(data.charAt(4))] == senderId) {
      // console.log("received dead ball message")
      let ball = document.getElementById(data)
      ball.thrower = null
      ball.setAttribute("color", "white")
    }
  });
  
  // NAF.connection.subscribeToDataChannel("start-game", function(senderId, dataType, team, targetId) {
  //   document.querySelector('a-scene').emit("set-team", team)
  // })
  
  NAF.connection.subscribeToDataChannel("caught", function(senderId, dataType, id, targetId) {
    setTimeout()
  })
  
  NAF.connection.subscribeToDataChannel('flag-picked-up', function(senderId, dataType, flagId, targetId) {
    console.log(flagId)
    let flag = document.getElementById(flagId)
    console.log(flag)
    if (flag != null) {
      document.querySelector('a-scene').removeChild(flag)
    }
  })
  
  NAF.connection.subscribeToDataChannel('game-over', function(senderId, dataType, winner, targetId) {
    win(winner)
  })
  
  // Spawn the menu if it hasn't been spawned already
  function onCreate(evt) {
    let clients = NAF.connection.getConnectedClients();
    let otherClientsHaveConnected = false;
    let numConnectedClients = 0;  // Excludes this client
    for (const key in clients) {
      numConnectedClients++;
    }

    if (numConnectedClients) {
      // Other clients have already created menus, so remove ours
      const menus = document.getElementsByClassName('menu');
      for (const menu of menus) {
        if (NAF.utils.isMine(menu)) {
          if (menu.parentNode) {
            menu.parentNode.removeChild(menu);
          }
        }
      }
    }
    
    // Don't call this handler more than once because we'll be creating more
    // remove entities in the future.
    document.body.removeEventListener('entityCreated', onCreate);

    // Wait until the menu loads before we update it
    document.addEventListener('menu-loaded', () => {
      const btnId = (numConnectedClients % 2) ? 'join-btn1' : 'join-btn2';
      document.getElementById(btnId).click();
    });
  }
  
  // Add a new player to the list if they haven't been added already
  function onAvatarCreate(evt) {
    const el = evt.detail.el;
    if (el.classList.contains('avatar')) {
      const onLoaded = () => {
        // Called when the menu is loaded
        const onMenuLoaded = () => {
          // Prepare the data to send to the player lists
          let dataObj = {
            teamName: '1',
            playerName: el.querySelector('.nametag').getAttribute('text').value
          };
          
          if (el.querySelector('.head-mesh').getAttribute('gltf-model').indexOf('red') !== -1) {
            // Team two
            dataObj.teamName = '2';
          }
          
          // Notify all the local player lists that someone has joined
          const customEvent = new CustomEvent('joined-team', { detail: dataObj });
          for (let list of document.getElementsByClassName('playerlist')) {
            list.dispatchEvent(customEvent);
          }
          
          // Ask the master which game was selected
          if (!NAF.utils.isMine(document.getElementsByClassName('menu')[0])) {
            NAF.connection.broadcastData('dropdown-menu-request-update');
          }
        };

        // Make sure the player lists have loaded before we notify them
        if (document.getElementsByClassName('playerlist').length) {
          onMenuLoaded();
        } else {
          document.addEventListener('menu-loaded', onMenuLoaded);
        }
      };

      if (el.loaded) {
        onLoaded();
      } else {
        el.addEventListener('loaded', onLoaded);
      }
    }
  }
  
  document.body.addEventListener('entityCreated', onCreate);
  document.body.addEventListener('entityCreated', onAvatarCreate);

  setTimeout(() => {
    const customEvent = new CustomEvent('onspawn');
    document.querySelector('a-scene').dispatchEvent(customEvent);
  }, 500);
}

// Helper function to update the master
function masterChange(senderId, gamemode) {
  document.getElementById('start-btn').dispatchEvent(new CustomEvent('update-gui-master'));
  
  if (document.getElementById('rightHand') != null) {
    document.getElementById('rightHand').grabbed = null
    document.getElementById('leftHand').grabbed = null
  }
  
  let scene = document.querySelector('a-scene') 
  setMetadata('gamemode', gamemode)
  setMetadata('started', true)
  if (gamemode == 'Classic') {
    console.log('Switching...')
    classic(senderId)
    scene.ballMasters = [senderId, senderId, senderId, senderId, senderId]
  } else {
    console.log('Switching...')
    captureTheFlag(senderId)
    scene.ballMasters = [senderId, senderId, senderId, senderId, senderId]
  }
  
}

// function captureTheFlag2(senderId) {
//   let scene = document.querySelector('a-scene') 
//   let balls = document.getElementsByClassName("ball")
//   buildMap2()
  
//   while (balls.length != 0) {
//     scene.removeChild(balls[0])
//   }
  
//   let ball_x = [-9, -7.5, 0, 8.5, 10]
//   let ball_z = [6, 6, -4.5, 6, 6]
//   for (let i = 0; i < 5; i++) {
//     let newBall = document.createElement('a-sphere')
//     newBall.setAttribute("id", "ball" + (i))
//     newBall.classList.add("ball")
//     newBall.setAttribute("color", "white")
//     newBall.setAttribute("radius", "0.1")
//     newBall.setAttribute("position", {x: ball_x[i], y: 2.5, z: ball_z[i]})
//     newBall.setAttribute("body", {type: "dynamic"})

//     scene.appendChild(newBall)
//   }

  

//   console.log('client, not master');
// }

// function buildMap2() {
//   let scene = document.querySelector('a-scene') 
//   let player = document.getElementById('player')
  
//   player.components['spawn-in-circle'].init()
  
//   scene.removeChild(document.getElementById('map'))
//   scene.removeChild(document.getElementById('navmesh-entity'))
  
//   let walls = document.getElementsByClassName('wall')
//   for (let i = walls.length-1; i >= 0; i--) {
//     scene.removeChild(walls[i])
//   }
      
//   let map = document.createElement('a-entity')
//   map.id = 'map'
//   map.setAttribute('gltf-model', '#ctf-scene')
  
  
  
//   let navmesh = document.createElement('a-entity')
//   navmesh.id = 'navmesh-entity'
//   navmesh.setAttribute('gltf-model', '#ctf-navmesh')
//   navmesh.setAttribute('nav-mesh', {})
//   navmesh.setAttribute('visible', 'false')
  
//   scene.appendChild(map)
//   scene.appendChild(navmesh)
  
//   // Reset the movement-controls component
//   player.components['movement-controls'].init();
//   player.setAttribute('movement-controls', 'constrainToNavMesh', true);
  
//   // // Chasm
//   // let bottom = document.createElement('a-box')
//   // bottom.setAttribute('ball-respawner', '')
//   // bottom.setAttribute('position', {x: 0, y: 0.5, z: 5})
//   // bottom.setAttribute('rotation', '-90 0 0')
//   // bottom.setAttribute('scale', '100 1 100')
//   // bottom.setAttribute('static-body', '')
//   // bottom.setAttribute('color', 'green')
//   // scene.appendChild(bottom)
// }

// function classic(senderId) {
//   let scene = document.querySelector("a-scene")
//   let balls = document.getElementsByClassName("ball")
//   let player = document.getElementById('player')
  
//   player.components['spawn-in-circle'].init()
  
//   while (balls.length != 0) {
//     scene.removeChild(balls[0])
//   }

//   for (let i = 0; i < 5; i++) {
//     let newBall = document.createElement('a-sphere')
//     newBall.setAttribute("id", "ball" + (i))
//     newBall.classList.add("ball")
//     newBall.setAttribute("color", "#207567")
//     newBall.setAttribute("radius", "0.1")
//     newBall.setAttribute("position", {x: -2.4 + 1.2 * i, y: 2.5, z: 0})
//     newBall.setAttribute("body", {type: "dynamic"})

//     scene.appendChild(newBall)
//   }

//   scene.ballMasters = [senderId, senderId, senderId, senderId, senderId]
// }

// Helper function to create ghost player after they have died.
function die(e) {
  // Remove the original player
  let player = document.getElementById("player")
  let metadata = getMetadata()

  // Create a ghost camera so the dead player can still walk around
  let ghostCam = document.createElement("a-entity")
  ghostCam.id = 'ghostCam'
  ghostCam.setAttribute('position', '0 1.3 0')
  ghostCam.setAttribute('camera', 'active: true')
  ghostCam.setAttribute('look-controls', '')
  ghostCam.setAttribute('rotation', document.getElementById('avatar').getAttribute('rotation'))
  // Create a new entity for movement and add the ghost camera to it
  let ghost = document.createElement("a-entity")
  ghost.id = 'ghost'
  ghost.setAttribute('position', player.getAttribute('position'))
  ghost.setAttribute('movement-controls', 'speed: 0.1; constrainToNavMesh: true; controls: checkpoint, gamepad, trackpad, touch, keyboard;')
  ghost.setAttribute('rotation', player.getAttribute('rotation'))
  ghost.appendChild(ghostCam)
  
  let gamemode = metadata.gamemode

  // Add the ghost to the scene
  document.querySelector('a-scene').appendChild(ghost)
  player.parentNode.removeChild(player)
  
  if (gamemode == 'Capture the flag') {
    setTimeout(respawn.bind(), 10000)
  } else {
    let players = document.getElementsByClassName('head-mesh')
    let red = false
    let blue = false
    for (let i = 0; i < players.length; i++) {
      if (players[i].getAttribute('gltf-model') == 'https://cdn.glitch.com/56047aa3-9a3d-44b6-9929-a7c8fe28ba1c%2FRobot%20head%20blue.gltf?v=1621438086393') {
        // console.log(players[i].getAttribute('gltf-model'))
        blue = true
      } else {
        // console.log(players[i].getAttribute('gltf-model'))
        red = true
      }
    }
    
    if (blue && red) {
      return
    } else if (blue && !red) {
      NAF.connection.broadcastData('game-over', 1)
      setTimeout(win, 100, 1)
    } else {
      NAF.connection.broadcastData('game-over', 2)
      setTimeout(win, 100, 2)
    }
    
  }
}

function respawn() {
  let metadata = getMetadata()
  let player = document.createElement('a-entity')
  player.setAttribute('movement-controls', 'speed: 0.1; constrainToNavMesh: true; controls: checkpoint, gamepad, trackpad, touch, keyboard;')
  player.setAttribute('spawner', 'template: #menu-template')
  player.id = 'player'
  if (metadata.team == 1) {
    player.setAttribute('position', '9.5 0 9.4')
  } else {
    player.setAttribute('position', '-8.8 0 9.4')
  }
  
  let body = document.createElement('a-entity')
  body.setAttribute('body-position', '')
  body.setAttribute('width', '0.5')
  body.setAttribute('depth', '0.2')
  body.id = 'body'
  
  let rightHand = document.createElement('a-entity')
  rightHand.setAttribute('grab-ball', '')
  rightHand.setAttribute('laser-controls', 'hand: right')
  rightHand.setAttribute('oculus-touch-controls', 'hand: right')
  rightHand.setAttribute('visible', 'true')
  rightHand.setAttribute('button-presser', '')
  rightHand.setAttribute('raycaster', 'objects: [gui-interactable]')
  rightHand.id = 'rightHand'
  
  let fingersR = document.createElement('a-entity')
  fingersR.classList.add('fingers')
  fingersR.setAttribute('visible', 'false')
  
  let centerOfMassR = document.createElement('a-entity')
  centerOfMassR.classList.add('centerOfMass')
  centerOfMassR.setAttribute('position', '0 -0.01 0.045')
  
  let leftHand = document.createElement('a-entity')
  leftHand.setAttribute('grab-ball', '')
  leftHand.setAttribute('laser-controls', 'hand: left')
  leftHand.setAttribute('oculus-touch-controls', 'hand: left')
  leftHand.setAttribute('visible', 'true')
  leftHand.setAttribute('button-presser', '')
  leftHand.setAttribute('raycaster', 'objects: [gui-interactable]')
  leftHand.id = 'leftHand'
  
  let fingersL = document.createElement('a-entity')
  fingersL.classList.add('fingers')
  fingersL.setAttribute('visible', 'false')
  
  let centerOfMassL = document.createElement('a-entity')
  centerOfMassL.classList.add('centerOfMass')
  centerOfMassL.setAttribute('position', '0 -0.01 0.045')
  
  
  let avatar = document.createElement('a-entity')
  avatar.id = 'avatar'
  avatar.setAttribute('camera', 'active: true')
  avatar.setAttribute('position', '1 1.3 0')
  avatar.setAttribute('look-controls', '')
  
  let headHitbox = document.createElement('a-sphere')
  headHitbox.classList.add('head-mesh')
  headHitbox.id = 'head-hitbox'
  headHitbox.setAttribute('body-position', '')
  headHitbox.setAttribute('scale', '0.15 0.17 0.13')
  headHitbox.setAttribute('static-body', 'shape: sphere; sphereRadius: 0.16')
  headHitbox.setAttribute('visible', 'false')
  
  let username = document.createElement('a-entity')
  username.classList.add('nametag')
  username.id = 'username'
  username.setAttribute('text', 'value: ' + metadata.username)
  
  player.setAttribute("networked", "template:#player-template;attachTemplateToLocal:false;")
  avatar.setAttribute("networked", "template:#avatar-template;attachTemplateToLocal:false;")
  body.setAttribute("networked", "template:#body-template")
  rightHand.setAttribute("networked", "template:#hand-template; attachTemplateToLocal:false;")
  leftHand.setAttribute("networked", "template:#hand-template; attachTemplateToLocal:false;")
  
  rightHand.appendChild(document.createElement('text'))
  rightHand.appendChild(fingersR)
  rightHand.appendChild(document.createElement('text'))
  rightHand.appendChild(centerOfMassR)
  
  leftHand.appendChild(document.createElement('text'))
  leftHand.appendChild(fingersL)
  leftHand.appendChild(document.createElement('text'))
  leftHand.appendChild(centerOfMassL)
  
  avatar.appendChild(headHitbox)
  avatar.appendChild(username)
  
  player.appendChild(avatar)
  player.appendChild(body)
  player.appendChild(rightHand)  
  player.appendChild(leftHand)
  
  let scene = document.querySelector('a-scene')
  scene.removeChild(document.getElementById('ghost'))
  scene.appendChild(player)
  
  let thing = function() {
    if (metadata.team == 1) {
      headHitbox.setAttribute('gltf-model', '#head-blue')
      body.childNodes[1].setAttribute('gltf-model', '#body-blue')
      fingersL.setAttribute('gltf-model', '#hand-blue')
      fingersR.setAttribute('gltf-model', '#hand-blue')
    } else {
      headHitbox.setAttribute('gltf-model', '#head-red')
      body.childNodes[1].setAttribute('gltf-model', '#body-red')
      fingersL.setAttribute('gltf-model', '#hand-red')
      fingersR.setAttribute('gltf-model', '#hand-red')
    }
  }
  
  setTimeout(thing.bind(), 0)
}

document.addEventListener('DOMContentLoaded', () => {              
  const params = getUrlParams();
  const scene = document.querySelector('a-scene');
  const sceneLoaded = () => {
    document.getElementById("player").setAttribute("networked", "template:#player-template;attachTemplateToLocal:false;")
    document.getElementById("avatar").setAttribute("networked", "template:#avatar-template;attachTemplateToLocal:false;")
    document.getElementById("body").setAttribute("networked", "template:#body-template")
    document.getElementById("rightHand").setAttribute("networked", "template:#hand-template; attachTemplateToLocal:false;")
    document.getElementById("leftHand").setAttribute("networked", "template:#hand-template; attachTemplateToLocal:false;")
    
    let metadata = getMetadata()
    if (metadata.team == 1) {
      document.getElementById("avatar").childNodes[1].setAttribute("gltf-model", "#head-blue")
      document.getElementById("body").childNodes[1].setAttribute("gltf-model", "#body-blue")  
      document.getElementById("rightHand").childNodes[1].setAttribute("gltf-model", "#hand-blue")  
      document.getElementById("leftHand").childNodes[1].setAttribute("gltf-model", "#hand-blue")
    } else {
      document.getElementById("avatar").childNodes[1].setAttribute("gltf-model", "#head-red")
      document.getElementById("body").childNodes[1].setAttribute("gltf-model", "#body-red")
      document.getElementById("rightHand").childNodes[1].setAttribute("gltf-model", "#hand-red")  
      document.getElementById("leftHand").childNodes[1].setAttribute("gltf-model", "#hand-red")
    }
    
    document.getElementById("body").removeAttribute("collision-detector")
   
    // Ask the user to use their microphone.
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      // The user gave us microphone access
      function(stream) {
        window.hasMicrophone = true;
        console.log('have microphone access now', window.hasMicrophone);
      }
    ).catch(
      function(err) {
        window.hasMicrophone = false;
      }
    ).then(
      function() {
        console.log('after microphone request');
        // document.querySelector('a-scene').setAttribute('dynamic-room', '');
        // Setup networked-scene
        var networkedComp = {
          app: "vr-dodgeball",
          debug: true,
          room: params.room,
          adapter: "easyrtc",
          audio: window.hasMicrophone
        };

        console.info("Init networked-aframe with settings:", networkedComp);
        scene.setAttribute("networked-scene", networkedComp);
      }
    );
  }
  
  if (scene.hasLoaded) {                                                         
    sceneLoaded();
  } else {
    scene.addEventListener('loaded', sceneLoaded);
  }
});

// Helper function to get passed in parameters in URL.
let getUrlParams = function() {
  var match;
  var pl = /\+/g; // Regex for replacing addition symbol with a space
  var search = /([^&=]+)=?([^&]*)/g;
  var decode = function(s) {
    return decodeURIComponent(s.replace(pl, " "));
  };
  var query = window.location.search.substring(1);
  var urlParams = {};

  match = search.exec(query);
  while (match) {
    urlParams[decode(match[1])] = decode(match[2]);
    match = search.exec(query);
  }
  return urlParams;
}

function getMetadata() {
  return document.querySelector('a-scene').getAttribute('metadata')
}

function setMetadata(property, value) {
  document.querySelector('a-scene').setAttribute('metadata', property + ': ' + value)
}

function win(team) {
  console.log("Team " + team + " won!")
  let metadata = getMetadata()
  let scene = document.querySelector('a-scene')
  console.log(metadata)
  
  if (metadata.team == team) {
    let text = document.createElement("a-text")
    text.setAttribute('id', 'game-over-text')
    text.setAttribute('position', {x: 0, y: 0.3, z: -1})
    text.setAttribute('scale', {x: 0.8, y: 0.8, z: 0.8})
    text.setAttribute('align', 'center')
    text.setAttribute('color', '#5985ff')
    text.setAttribute('value', 'Victory')
    
    let camera = scene.camera.el.appendChild(text)
  } else {
    let text = document.createElement("a-text")
    text.setAttribute('id', 'game-over-text')
    text.setAttribute('position', {x: 0, y: 0.3, z: -1})
    text.setAttribute('scale', {x: 0.8, y: 0.8, z: 0.8})
    text.setAttribute('align', 'center')
    text.setAttribute('color', '#ff5147')
    text.setAttribute('value', 'Defeat')
    
    let camera = scene.camera.el.appendChild(text)

  }
  
  let balls = document.getElementsByClassName('ball')
  let flags = document.getElementsByClassName('flag')

  for (let i = balls.length-1; i >= 0; i--) {
    scene.removeChild(balls[i])
  }

  for (let i = flags.length-1; i >= 0; i--) {
    if (NAF.utils.isMine(flags[i]))
      scene.removeChild(flags[i])
  }
}