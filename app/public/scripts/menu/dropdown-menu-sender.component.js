/* global AFRAME, NAF */
/* This component reacts to button presses on the dropdown menu
 * and notifies the other users of the change.
 */
AFRAME.registerComponent('dropdown-menu-sender', {
  init: function() {
    this.notifyClick = this.notifyClick.bind(this);
    this.notifyIfMaster = this.notifyIfMaster.bind(this);
    this.el.addEventListener('dropdown-selected', this.notifyClick);
    NAF.connection.subscribeToDataChannel('dropdown-menu-request-update', this.notifyIfMaster);
  },
  
  notifyClick: function(e) {
    if (e.detail !== 481) {
      NAF.connection.broadcastData('dropdown-menu-updater', {
        status: e.detail
      });
    }
  },
  
  notifyIfMaster: function() {
    if (NAF.utils.isMine(this.el)) {
      // We are master, notify the other clients
      this.notifyClick({ detail: this.el.getAttribute('value') });
    }
  },
  
  remove: function() {
    this.el.removeEventListener('dropdown-selected', this.notifyClick);
  }
});