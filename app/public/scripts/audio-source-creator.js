/* global AFRAME
 * Sets up voice chat if microphone permissions are granted.
 */
const componentName = 'audio-source-creator';
AFRAME.registerComponent(componentName, {
  init: function() {
    if (!window.hasMicrophone) {
      // We don't need to create an audio source, so just remove this component
      this.el.removeComponent(componentName);
    } else {
      const audioComponent = 'networked-audio-source';
      console.log('sdfsdfsdf', self.el);
      // Set up the audio source component if it hasn't been set up already
      if (!this.el.hasAttribute(audioComponent)) {
        console.log('networked audio source component not added yet');
        this.el.setAttribute(audioComponent, '');
      } else {
        console.log('networked audio source already added');
      }
    }
  }
});