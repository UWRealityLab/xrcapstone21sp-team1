/* global AFRAME, NAF, THREE */
AFRAME.registerComponent('toggle-ownership', {
  init() {
    var that = this;
    this.takeOwnership = this.takeOwnership.bind(this);
    this.el.sceneEl.addEventListener('onownershipchange', this.takeOwnership);
    let el = this.el;

    NAF.utils.getNetworkedEntity(this.el).then((el) => {
      if (NAF.utils.isMine(el)) {
        // that.updateColor();
      } else {
        that.updateOpacity(0.5);
      }

      // Opacity is not a networked attribute, but change it based on ownership events
      let timeout;

      el.addEventListener('ownership-gained', e => {
        that.updateOpacity(1);
      });

      el.addEventListener('ownership-lost', e => {
        that.updateOpacity(0.5);
      });

      el.addEventListener('ownership-changed', e => {
        clearTimeout(timeout);
        // console.log(e.detail)
        if (e.detail.newOwner == NAF.clientId) {
          //same as listening to 'ownership-gained'
        } else if (e.detail.oldOwner == NAF.clientId) {
          //same as listening to 'ownership-lost'
        } else {
          that.updateOpacity(0.8);
          timeout = setTimeout(() => {
            that.updateOpacity(0.5);
          }, 200)
        }
      });
    });
  },

  takeOwnership(e) {
    // if(this.el && NAF.utils.takeOwnership(this.el)) {
    //   console.log('took ownership');
    //   // this.updateColor();
    //   // this.el.parentNode.removeChild(this.el);
    //   // document.querySelector('a-scene').appendChild(this.el);
    // }
  },

  updateOpacity(opacity) {
    this.el.setAttribute('material', 'opacity', opacity);
  }
});