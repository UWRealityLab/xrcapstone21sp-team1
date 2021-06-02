/* global AFRAME */
/* This component reacts to button presses on the controller 
 * and sends custom events to the scene. We do this so that
 * we can easily react to both button and key presses.
 *
 * Since this component reacts to controller button presses,
 * it's meant to be attached to an element with the
 * oculus-touch-controls (or equivalent) component or a parent
 * of such an element.
 */
AFRAME.registerComponent('button-presser', {
  schema: {
    buttonsToEvents: {
      default: "{\
        \"abuttondown\": \"onspawn\",\
        \"bbuttondown\": \"onownershipchange\",\
        \"xbuttondown\": \"onspawn\",\
        \"ybuttondown\": \"onownershipchange\"\
      }",
      
      parse: function(value) {
        return JSON.parse(value);
      },
      stringify: function(value) {
        return JSON.stringify(value);
      }
    }
  },

  init: function() {
    this.listeners = new Map();
    let el = this.el;
    let self = this;
    for(let prop in this.data.buttonsToEvents) {
      this.listeners.set(prop, e => {
        const customEvent = new CustomEvent(self.data.buttonsToEvents[prop]);
        this.el.sceneEl.dispatchEvent(customEvent);
      });
      el.addEventListener(prop, this.listeners.get(prop));
    }
  },
  
  remove: function() {
    for(let prop in this.data.buttonsToEvents) {
      this.el.removeEventListener(prop, this.listeners.get(prop));
    }
  }
});