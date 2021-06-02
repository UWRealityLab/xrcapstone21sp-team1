/* global AFRAME, NAF */
/* This component reacts to button presses on the menu
 * and notifies the other users of the change.
 */
AFRAME.registerComponent('menu-sender', {
  init: function() {
    this.notifyClick = this.notifyClick.bind(this);
    this.el.addEventListener('click', this.notifyClick);
  },
  
  notifyClick: function(e) {
    if (e.detail !== 481) {
      NAF.connection.broadcastData('menu-updater', {
        status: this.el.getAttribute('gui-toggle').checked
      });
    }
  },
  
  remove: function() {
    this.el.removeEventListener('click', this.notifyClick);
  }
});