/* global NAF
 * This file handles cleanup when the user leaves the page.
*/

// Called when the user is leaving the page.
window.onbeforeunload = function(e) {
  // Notify the other users that we've left. We do this
  // instead of responding to when an entity is removed
  // because once an entity is removed, we can't actually
  // query information about the player that left. It's too
  // late.
  NAF.connection.broadcastData('joined-team', {
    teamName: undefined,
    playerName: getMetadata().username,
  });
};