/* global AFRAME, NAF, THREE */
AFRAME.registerComponent('toggle-visibility', {
  init() {
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.el.sceneEl.addEventListener('onspawn', this.toggleVisibility);
  },

  toggleVisibility() {
    this.el.object3D.visible = !this.el.object3D.visible;
  },

  remove() {
    this.el.sceneEl.removeEventListener('onspawn', this.toggleVisiblity);
  }
});