/* global AFRAME, NAF
 * This component reacts to messages from other users about the changing state of the menus. */
AFRAME.registerComponent('player-list-receiver', {
  schema: {
    playersList: {
      default: '',
      parse: function(value) {
        const parsedSet = new Set();
        value.split(',').forEach(v => parsedSet.add(v));
        return parsedSet;
      },
      stringify: function(set) {
        let stringifiedSet = "";
        set.forEach(v => stringifiedSet += v);
        return stringifiedSet;
      }
    },
    teamName: {
      default: '0'
    }
  },
  
  init: function() {
    this.updatePlayerList = this.updatePlayerList.bind(this);
    this.updatePlayerListHelper = this.updatePlayerListHelper.bind(this);
    this.el.addEventListener('joined-team', this.updatePlayerList);
  },
  
  // Updates the displayed list of players.
  // The namesObj parameter is an object with two fields: playerName and teamName - where
  // the playerName is the clientID.
  updatePlayerListHelper: function(namesObj) {
    // console.log("player-list-receiver")
    const playerClassName = 'playername-display';
    let metadata = getMetadata()

    if (this.data.teamName === namesObj.teamName) {
      // The player with the name `playerName` has been added to this player list
      this.data.playersList.add(namesObj.playerName);
      
      // Check if the added player is the current user and update the view if they are
      if (namesObj.playerName === metadata.username) {
        // console.log(this.data.teamName)
        // console.log(namesObj.teamName)

        let playerEl = document.getElementById("player");

        // Remove the body-position component so we don't run into problems when teleporting.
        document.getElementById('head-hitbox').removeAttribute('body-position');
        document.getElementById('body').removeAttribute('body-position');

        const isTeamOne = namesObj.teamName === '1';

        // Update metadata: red team: #ff5147, blue team: #5985ff0
        document.querySelector('a-scene').setAttribute("metadata", {team: parseInt(namesObj.teamName), color: (isTeamOne ? "#5985ff" : "#ff5147"), started: false});

        // Move the player over to the other side of the field
        var position = new THREE.Vector3()
        position.z = isTeamOne ? 1 : -8.5
        position.x = -3.5
        playerEl.setAttribute('position', {x: position.x + Math.random() * 7.5, y: position.y, z: position.z + Math.random() * 7.5})
        // Rotate the player to face the menu
        let pRotation = playerEl.getAttribute('rotation');
        pRotation.y = isTeamOne ? 0 : 180;
        playerEl.setAttribute('rotation', pRotation);

        // Rotate the menu to face the user
        let menuEl = document.getElementsByClassName('menu')[0];
        let mRotation = menuEl.getAttribute('rotation');
        mRotation.y = isTeamOne ? 180 : 0;
        menuEl.setAttribute('rotation', mRotation);
        
        // A helper function that takes a model id (like 'head-blue') and returns a URL
        const idToURL = id => document.getElementById(id).getAttribute('src');

        // Swap out the different color models
        if (isTeamOne) {  // Blue team
          document.getElementById("avatar").childNodes[1].setAttribute("gltf-model", idToURL('head-blue'))
          document.getElementById("body").childNodes[1].setAttribute("gltf-model", idToURL('body-blue'))
          document.getElementById("rightHand").childNodes[1].setAttribute("gltf-model", idToURL('hand-blue'))
          document.getElementById("leftHand").childNodes[1].setAttribute("gltf-model", idToURL('hand-blue'))
        } else {
          document.getElementById("avatar").childNodes[1].setAttribute("gltf-model", idToURL('head-red'))
          document.getElementById("body").childNodes[1].setAttribute("gltf-model", idToURL('body-red'))
          document.getElementById("rightHand").childNodes[1].setAttribute("gltf-model", idToURL('hand-red'))
          document.getElementById("leftHand").childNodes[1].setAttribute("gltf-model", idToURL('hand-red'))
        }

        // Reset the movement-controls component
        playerEl.components['movement-controls'].init();
        playerEl.setAttribute('movement-controls', 'constrainToNavMesh', true);

        // Add the body-position component back
        // console.log("hi")
        document.getElementById('head-hitbox').setAttribute('body-position', '');
        document.getElementById('body').setAttribute('body-position', '');
      }
    } else {
      // The player with the name `playerName` has been removed from this player list (if they were previously on it).
      this.data.playersList.delete(namesObj.playerName);
    }
    
    // Update the DOM
    this.el.flushToDOM();
    
    // Remove all child elements first
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    
    // Add all names to the list of players
    let yCoord = 3;  // Starting height of the player name label

    if (!this.data.playersList.has(metadata.username)) {
      yCoord = 2;  // Lower the starting height to accomodate the join button
    }

    // Add each player's name back to the list.
    this.data.playersList.forEach(name => {
      if (name !== '') {
        // Add this name
        const nameDisplay = document.createElement('a-gui-label');
        nameDisplay.classList.add(playerClassName);
        nameDisplay.setAttribute('width', 2.5);
        nameDisplay.setAttribute('height', 0.5);
        nameDisplay.setAttribute('value', name);
        nameDisplay.setAttribute('opacity', 0);
        nameDisplay.setAttribute('background-color', '#000');
        nameDisplay.setAttribute('font-size', 0.23);
        nameDisplay.setAttribute('font-color', '#FFF');
        nameDisplay.setAttribute('line-height', 0.8);
        nameDisplay.setAttribute('letter-spacing', 0);
        nameDisplay.setAttribute('margin', '0 0 0.05 0');
        nameDisplay.setAttribute('position', {
          x: 0,
          y: yCoord,
          z: 0
        });
        nameDisplay.setAttribute('gui-item');
        
        yCoord -= 0.5;  // Add spacing between each text label
        
        this.el.appendChild(nameDisplay);
      }
    });
    
  },
  
  updatePlayerList: function(e) {
    this.updatePlayerListHelper(e.detail);
  },
  
  remove: function() {
    this.el.removeEventListener('joined-team', this.updatePlayerListSelf);
  }
});