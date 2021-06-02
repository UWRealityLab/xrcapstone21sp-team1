/* global AFRAME, NAF */
/* This component reacts to join requests (clicks on a join button)
 * and notifies the other users of the change, as well
 * as the user's own list of players.
 */
AFRAME.registerComponent('player-list-sender', {
  init: function() {
    this.notifyJoin = this.notifyJoin.bind(this);
    this.handleNetworkedPlayerLists = this.handleNetworkedPlayerLists.bind(this);
    this.el.addEventListener('click', this.notifyJoin);
    NAF.connection.subscribeToDataChannel('joined-team', this.handleNetworkedPlayerLists);
    
    this.el.addEventListener('loaded', function() {
      if (this.parentNode.getAttribute('panel-color') === 'red') {  // Wait for the last panel to load
        let self = this;
        document.getElementsByClassName('playerlist')[1].addEventListener('loaded', function() {
          const customEvent = new CustomEvent('menu-loaded');
          document.dispatchEvent(customEvent);
        });
      }
    });
  },
  
  // A helper method that sends a custom event to our player lists
  notifyPlayerLists: function(dataObj) {
    const customEvent = new CustomEvent('joined-team', { detail: dataObj });
    for (let list of document.getElementsByClassName('playerlist')) {
      list.dispatchEvent(customEvent);
    }
  },
  
  // Called when the user clicks on this element; notifies the player name lists of the
  // change (both for this client and over the network).
  notifyJoin: function(e) {
    if (e.detail !== 481) {
      let nextSibling = this.el.nextElementSibling;
      while (!nextSibling.classList.contains('playerlist')) {
        nextSibling = nextSibling.nextElementSibling;
      }
      let player = document.getElementById("player")
      
      const dataObj = {
        playerName: getMetadata().username,
        teamName: nextSibling.getAttribute('player-list-receiver').teamName
      };

      // Notify the other users that we've joined a team
      NAF.connection.broadcastData('joined-team', dataObj);
      
      // Notify our own player lists that we've joined a team
      this.notifyPlayerLists(dataObj);
    }
  },
  
  // Called when we receive information from another user that a player has joined
  handleNetworkedPlayerLists: function(sender, _, data) {
    this.notifyPlayerLists(data);
  },
  
  remove: function() {
    this.el.removeEventListener('click', this.notifyJoin);
  }
});