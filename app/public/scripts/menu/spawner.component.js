/* global AFRAME */
AFRAME.registerComponent('spawner', {
  schema: {
    template: { default: '' },
    keyCode: { default: 32 },
    startPosition: {
      default: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  },

  init: function() {
    this.onSpawn = this.onSpawn.bind(this);
    this.el.sceneEl.addEventListener("onspawn", this.onSpawn);
  },

  onSpawn: function() {
    let gameStarted = getMetadata().started

    // Only let the users create one menu.
    if (document.getElementsByClassName('menu').length === 0) {
      var el = document.createElement('a-entity');
      el.setAttribute('networked', 'template:' + this.data.template);
      el.setAttribute('position', this.data.startPosition);
      el.setAttribute('intersect-color-change');
      el.setAttribute('class', 'spawned');
      // let player = document.getElementById('player');
      // player.appendChild(el);
      var scene = this.el.sceneEl;
      scene.appendChild(el);
    }
  },
  
  remove: function() {
    this.el.sceneEl.removeEventListener("onspawn", this.onSpawn);
  }
});