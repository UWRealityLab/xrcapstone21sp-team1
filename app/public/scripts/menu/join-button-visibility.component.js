/* global AFRAME, NAF */
/* This component reacts to join button presses on the menu
 * and selectively shows/hides other join buttons.
 *
 * When (this) join button is pressed, it will be hidden,
 * and all other join buttons will be revealed.
 */
AFRAME.registerComponent('join-button-visibility', {
  schema: {
    className: {default: 'join-btn'}
  },

  init: function() {
    this.updateVisibility = this.updateVisibility.bind(this);
    this.el.addEventListener('click', this.updateVisibility);
  },
  
  updateVisibility: function(e) {
    /*
    Join button -> update (local) visibility of other button
	    -> add this player to the corresponding teams list, and remove them from the other one(s) if applicable
	    -> update the teams list for all players
    */
    if (e.detail !== 481) {  // Don't respond to clicks that we generated
      this.el.setAttribute('visible', false);
      let joinButtons = document.getElementsByClassName(this.data.className);
      for (let joinButton of joinButtons) {
        if (joinButton.getAttribute('id') !== this.el.getAttribute('id')) {
          joinButton.setAttribute('visible', true);
        }
      }
    }
  },
  
  remove: function() {
    this.el.removeEventListener('click', this.updateVisibility);
  }
});