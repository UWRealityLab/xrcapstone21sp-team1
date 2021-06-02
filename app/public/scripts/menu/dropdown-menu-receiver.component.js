/* global AFRAME, NAF */
/* This component reacts to messages from other users
 * about the changing state of the menus.
 */
AFRAME.registerComponent('dropdown-menu-receiver', {
  init: function() {
    this.updateDropdownMenu = this.updateDropdownMenu.bind(this);
    NAF.connection.subscribeToDataChannel('dropdown-menu-updater', this.updateDropdownMenu);
  },
  
  updateDropdownMenu: function(sender, _, data) {
    // console.log('Updating dropdown menu...');
    if (this.el.getAttribute('value') !== data.status) {
      this.el.setAttribute('value', data.status);
      window.closeDropdown();
      // const mouseEvent = new CustomEvent('click', { detail: 481 });
      // this.el.dispatchEvent(mouseEvent);
    }
  }
});