/* global AFRAME
 * metadata adds additional information to each player - particularly their team number and color. */
AFRAME.registerComponent('metadata', {
  schema: {
    username: { type: "string" },
    team: { type: "int", default: 0 },
    gamemode: {type: 'string', default: 'Classic'},
    color: { type: "string" },
    started: { type: "boolean" }
  }
});