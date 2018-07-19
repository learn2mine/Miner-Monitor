/*
* Program to manage config file
*
*/

// Dependencies
var data = require('./data');

// Container for config functions
var config = {};

// If their is no config file make one if their isnt just leave it
config.checkConfig = function(callback){
  data.list('../miner-interface',function(err,files){
    if (!err && files){

      // Check if config.txt is in the directory
      var newConfig = true;
      for (var i = 0; i < files.length; i++) {
        if(files[i] == 'config.json'){
          newConfig = false;
        };
      };

      // See if we have to create the config file
      if(newConfig == true){
        callback(false,true);
        // Data to put in the new file
        var configText = {
            "nameOfMiner" : {
                "typeOfMiner" : "Antminer S9",
                "ipOfTheMiner" : "xxx.xxx.x.xxx"
              }
        };
        // Create the new file
        data.create('./config.json',configText,function(err){
          if(err){
            callback('Could not create the config.txt file is this program in a readonly file system?');
          };
        });
      } else {
        callback(false,false);
      }
    } else {
      callback('Could not find the directory!');
    };
  });
};

config.getConfig = function(callback){
  data.read('config.json',function(err,data){
    if(!err && data && typeof(data) == 'object'){
      callback(false,data);
    } else {
      callback('Could not read the config file or else it was in the wrong format');
    }
  });
};

module.exports = config
