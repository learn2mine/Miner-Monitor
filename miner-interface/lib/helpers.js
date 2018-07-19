/*
* Library for all our little helper functions
*
*/

// Dependencies

// Container for our helpers
var helpers = {};

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
