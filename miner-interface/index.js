/*
* Main file for interfacing with miners
*
*/

// Dependencies
var antminerS9 = require('./miners/antminer-s9');
var config = require('./lib/manage-config-file.js');

// small function for setting intervals
var interval = function(minerName,ipAddress,typeOfMiner,callback){
  setInterval(function () {
  console.log(minerName);
//  console.log(ipAddress);
//  console.log(typeOfMiner);
}, 5000)}

// Run the checkConfig function
console.log("Checking for config file...");
config.checkConfig(function(err, newConfig){
  if(err){
    console.log(err);
  } else {
    if (newConfig == true) {
      console.log('Their was no config file found...');
      console.log('Creating config file...');
      console.log('Please go into the config.json file in this directory and put your settings in')
    } else {
      console.log('Config file found...')
      // Read the config.json file
      console.log('Reading configuration from config.json');
      config.getConfig(function(err,data){
        if(!err && data){
          minersObject = Object.keys(data).length > 0 ? data : false;
          if (minersObject){
            console.log('Lauching Miner-Monitor 2.0.0');
            // loop throught the miners
            for(minerName in minersObject) {
              var minerName = typeof(minerName) == 'string' && minerName.trim().length < 100 ? minerName : false;
              var ipAddress = typeof(minersObject[minerName].ipAddress) == 'string' && minersObject[minerName].ipAddress.trim().length >= 12 && minersObject[minerName].ipAddress.trim().length <= 13 ? minersObject[minerName].ipAddress : false;
              var typeOfMiner = typeof(minersObject[minerName].typeOfMiner) == "string" ? minersObject[minerName].typeOfMiner : false;

                if(minerName && ipAddress && typeOfMiner){
                  if(typeOfMiner == "Antminer S9"){
//                    antminerS9.getValues(ipAddress,function(err,data){
                      if(!err && data){
                        // Set timeout for mosquitto function
                           console.log('Initializing '+minerName+'...')
                            interval(minerName,ipAddress,typeOfMiner,function(err){
                              if(err){
                                console.log(err);
                              };
                            });
                      } else {
                        console.log(err);
                      };
//                    });
                  } else {
                    console.log("That miner is not yet supported! Feel free to work on the github project!:)")
                  };
                } else {
                  console.log("Please make sure all your data is filled in correctly in the config.json file")
                };
            };
          } else {
            console.log("Please put some settings in the config.json file")
          };
        } else {
          console.log(err);
        };
      });
    };
  };
});
