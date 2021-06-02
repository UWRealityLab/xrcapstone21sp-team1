/* global AFRAME, NAF */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('intersect-color-change', {
  schema: {
    isSelected: { default: false }
  },
  init: function () {
    let el = this.el;
    let material = el.getAttribute('material');
    let initialColor = material.color;
    this.isSelected = this.data.isSelected;
    
    // Callback for when the user presses the controller button or the mouse is clicked
    this.onClick = event => {
      /* Request ownership of the menu if we don't have it already */
      // console.log('Click event: ', event, event.detail !== 481);
      if (event.detail !== 481 && !NAF.utils.isMine(this.el)) {
        const customEvent = new CustomEvent('onownershipchange');
        this.el.sceneEl.dispatchEvent(customEvent);
      }

      /* We have ownership now, update the color */
      // el.setAttribute('material', 'color', this.isSelected ? '#24CAFF' : initialColor);
      this.isSelected = !this.isSelected;
      this.el.setAttribute('intersect-color-change', { isSelected: this.isSelected });
    };
    
    // Callback for when the user releases the controller button or the mouse click is released
    this.onClickUp = event => {
      // el.setAttribute('material', 'color', this.isMouseEnter ? '#24CAFF' : initialColor);
    };
    
    // Callback for when the laser controls enter this entity
    this.onMouseEnter = () => {
      // el.setAttribute('material', 'color', '#24CAFF');
    };
    
    this.onMouseLeave = () => {
      // el.setAttribute('material', 'color', initialColor);
    };
    
    // Laser controls events
    el.addEventListener('mousedown', this.onClick);
    el.addEventListener('mouseup', this.onClickUp);
    el.addEventListener('mouseenter', this.onMouseEnter);
    el.addEventListener('mouseleave', this.onMouseLeave);
    
    // Mouse click events
    el.addEventListener('click', this.onClick);
    // el.addEventListener('click', this.onClick);
    
    // el.addEventListener('xbuttondown', this.onClick);
  },
  remove: function() {
    this.el.removeEventListener('mousedown', this.onClick);
    this.el.removeEventListener('mouseup', this.onClickUp);
    this.el.removeEventListener('mouseenter', this.onMouseEnter);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);
  }
});