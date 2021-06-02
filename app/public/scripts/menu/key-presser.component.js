/* global AFRAME */
AFRAME.registerComponent('key-presser', {
  schema: {
    keysToEvents: {
      default: "{\
        \"32\": \"onspawn\",\
        \"13\": \"onownershipchange\"\
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
    this.keyHandler = this.keyHandler.bind(this);
    document.addEventListener('keyup', this.keyHandler);
  },

  keyHandler: function(e) {
    if (this.data.keysToEvents[e.keyCode + ""] !== undefined) {
      const keyEvent = new CustomEvent(this.data.keysToEvents[e.keyCode + ""]);
      this.el.sceneEl.dispatchEvent(keyEvent);
    }
  },
  
  remove: function() {
    document.removeEventListener(this.keyHandler);
  }
});