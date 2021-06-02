/* global AFRAME, NAF */
/* This component reacts to messages from other users
 * about the changing state of the menus.
 */
AFRAME.registerComponent('menu-receiver', {
  init: function() {
    this.updateMenu = this.updateMenu.bind(this);
    NAF.connection.subscribeToDataChannel('menu-updater', this.updateMenu);
    // console.log('subscribed to data channel');
  },
  
  updateMenu: function(sender, _, data) {
    if (this.el.getAttribute('gui-toggle').checked !== data.status) {
      const mouseEvent = new CustomEvent('click', { detail: 481 });
      this.el.dispatchEvent(mouseEvent);
    }
  }
});