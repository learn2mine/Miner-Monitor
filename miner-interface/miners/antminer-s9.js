/*
* Scrape for the antminer s9
*
*/

// Dependencies
var getValues = require('./get-antminer-values');
var helper = require('./../lib/helpers.js');

// container for all the functions
var antminerS9 = {};

// Get the values from the antminer
antminerS9.getValues = function(ip,callback){
  // Check if we got the values
//  console.log(ip);

  ip = typeof(ip) == 'string' && ip.trim().length > 13 && ip.trim().length < 60 ? ip.trim() : false;
  console.log(ip)
  if (ip){
    // Get the hardware stats from the machine
    getValues.apiTCP(4028,ip,'{"command":"stats","parameter":""}',function(error,hardwareData){
      if (!error && hardwareData){
        // Turn the Antminer S9 string into valid JSON and parse it
        hardwareData = helper.parseJsonToObject(hardwareData.slice(hardwareData.search(/{"STATS":/i),hardwareData.search(/],"id":/)));

        getValues.apiTCP(4028,ip,'{"command":"summary","parameter":""}',function(err,data){
          if (!err && data){
            // Turn the Antminer S9 string into valid JSON and parse it

            var softwareData = helper.parseJsonToObject(data.slice(data.search(/,"SUMMARY":/i)+12,data.search(/],"id":/i)));

            // Create the object with the useful information
            returnObject = {
              "hashrate5s" : softwareData['GHS 5s'],
              "hashrateAv" : softwareData['GHS av'],
              "acceptedShares" : softwareData.Accepted,
              "rejectedShares" : softwareData.Rejected,
              "hardwareErrors" : softwareData['Hardware Errors'],
              "fan3" : hardwareData.fan3,
              "fan6" : hardwareData.fan6,
              "temp6" : hardwareData.temp6,
              "temp7" : hardwareData.temp7,
              "temp8" : hardwareData.temp8,
              "temp2_6" : hardwareData.temp2_6,
              "temp2_7" : hardwareData.temp2_7,
              "temp2_8" : hardwareData.temp2_8,
              "asicsChain6" : hardwareData.chain_acs6,
              "asicsChain7" : hardwareData.chain_acs7,
              "asicsChain8" : hardwareData.chain_acs8
            };
            callback(false,returnObject);

          } else {
            callback('Could not get data from the machine, Is the IP right?');
          };
        });

      } else {
        callback('Could not get data from the machine, Is the IP right?');
      };
    });
  } else {
    callback('Missing required field');
  };
};



// Example request
antminerS9.getValues('localhost:1111',function(err){
  console.log(err);
});

// Change values on the antminer
antminerS9.changeSettings = function(username,password,ip,callback){
  // Check if we got the values
  ip = typeof(ip) == 'string' && ip.trim().length <= 13 && ip.trim().length >= 12 ? ip.trim() : false;
  username = typeof(username) == 'string' && username.trim().length > 0 ? username.trim() : false;
  password = typeof(password) == 'string' && password.trim().length > 0 ? password.trim() : false;
  if (username && password && ip){
    callback("This feature is not supported yet")
  } else {
    callback('Missing required fields');
  };
};

// Example request
//antminerS9.changeSettings('root','root','192.168.1.12',function(err){
//  console.log(err);
//});

module.exports = antminerS9;
