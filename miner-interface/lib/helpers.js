/*
* Library for all our little helper functions
*
*/

// Dependencies

// Container for our helpers
var helpers = {};

// small function for setting intervals
var interval = function(minerName,ipAddress,typeOfMiner,callback){
  setInterval(function () {
  console.log(minerName);
}, 5000)}

// Parse json without throwing
helpers.parseJsonToObject = function(str){
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch(e) {
    return {};
  };
}

module.exports = helpers;
