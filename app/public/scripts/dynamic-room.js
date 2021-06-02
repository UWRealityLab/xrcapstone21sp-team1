/* global NAF, AFRAME, console
 * dynamic-room sets the networked-scene components in the a-scene based
 * on the parameters passed in by the user. The room, username, and team 
 * for the player is dynamically assigned here. */
AFRAME.registerComponent("dynamic-room", {
  init: function() {
    var el = this.el;
    var scene = document.querySelector('a-scene');
    var params = this.getUrlParams();
    
    if (!params.room) {
      window.alert("Please add a room name in the URL, eg. ?room=myroom");
    }

    /*
  // Setup networked-scene
    var networkedComp = {
      app: "vr-dodgeball",
      debug: true,
      room: params.room,
      adapter: "easyrtc",
      audio: true
    };
    
    console.info("Init networked-aframe with settings:", networkedComp);
    el.setAttribute("networked-scene", networkedComp);
    */
    document.getElementById("username").setAttribute("text", {value: params.username})
    let head = document.getElementById("head-hitbox")
    let player = document.getElementById("player")
    // TODO: replace with neutral player?
    //if (params.team == "1") {
      // document.getElementById("head-hitbox").setAttribute("color", "#5985ff")
    scene.setAttribute("metadata", {username: params.username, team: params.team, color: "#5985ff", started: false})
      
    // } else if (params.team == "2") {
    //   // document.getElementById("head-hitbox").setAttribute("color", "#ff5147")
    //   player.setAttribute("metadata", {team: params.team, color: "#ff5147", started: false})
    // }
  },

  // Helper function to get passed in parameters in URL.
  getUrlParams: function() {
    var match;
    var pl = /\+/g; // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function(s) {
      return decodeURIComponent(s.replace(pl, " "));
    };
    var query = window.location.search.substring(1);
    var urlParams = {};

    match = search.exec(query);
    while (match) {
      urlParams[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }
    return urlParams;
  }
});
