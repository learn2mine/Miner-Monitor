/*
* Main file for interfacing with miners
*
*/

// Dependencies
var antminerS9 = require('./miners/antminer-s9');
var config = require('./lib/manage-config-file.js');
var mqtt = require('./../mqtt-lib/mqtt.js')
var helpers = require('./lib/helpers.js')
// Connect to the mqtt client
var client  = mqtt.connect('mqtt://test.mosquitto.org')

var clientConnected = false;

//client.on('connect', function () {
//  clientConntected = true;
//  client.subscribe('presence')
//  client.publish('presence', 'Hello mqtt')
//});


//client.on('message', function (topic, message) {
  // message is Buffer
//  console.log(message.toString())
//  client.end()
//})

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
      console.log('Reading configuration from config.json...');
      config.getConfig(function(err,data){
        if(!err && data){
          minersObject = Object.keys(data).length > 0 ? data : false;
          if (minersObject){
            console.log('Lauching Miner-Monitor 2.0.0');
              client.on('connect', function () {
                console.log('Connected to the mqtt client...');
                // loop throught the miners
            for(minerName in minersObject) {
              var minerName = typeof(minerName) == 'string' && minerName.trim().length < 100 ? minerName : false;
              var ipAddress = typeof(minersObject[minerName].ipAddress) == 'string' && minersObject[minerName].ipAddress.trim().length >= 12 && minersObject[minerName].ipAddress.trim().length <= 50 ? minersObject[minerName].ipAddress : false;
              var typeOfMiner = typeof(minersObject[minerName].typeOfMiner) == "string" ? minersObject[minerName].typeOfMiner : false;
                if(minerName && ipAddress && typeOfMiner){
                  if(typeOfMiner == "Antminer S9"){

                    antminerS9.getValues(ipAddress,function(err){
                      if(!err && data){
                        // Set timeout for mosquitto function
                           console.log('Initializing '+minerName+'...')
                            helpers.interval(minerName,ipAddress,typeOfMiner,function(err){
                              if(err){
                                console.log(err);
                              };
                            });
                      } else {
                        console.log(err);
                      };
                    })

                  } else {
                    console.log("That miner is not yet supported! Feel free to work on the github project!:)")
                  };
                } else {
                  console.log("Please make sure all your data is filled in correctly in the config.json file")
                };
            };
            });
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
