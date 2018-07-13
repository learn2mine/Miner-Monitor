/*
* Scrape for the antminer s9
*
*/

// Dependencies
var helper = require('./helper.js');

// container for all the functions
var antminerS9 = {};

// Get the values from the antminer
antminerS9.getValues = function(ip,callback){
  // Check if we got the values
  ip = typeof(ip) == 'string' && ip.trim().length <= 13 && ip.trim().length >= 12 ? ip.trim() : false;
  if (ip){
    // Get the hardware stats from the machine
    helper.apiTCP(4028,ip,'{"command":"stats","parameter":""}',function(error,hardwareData){
      if (!error && hardwareData){
        // Turn the S9 string into valid JSON and parse it
        hardwareData = JSON.parse(hardwareData.slice(hardwareData.search(/{"STATS":/i),hardwareData.search(/],"id":/)));

        //Get values from the hardwareData JSON object
        

        helper.apiTCP(4028,ip,'{"command":"summary","parameter":""}',function(err,data){
          if (!err && data){
            console.log("nothing here")
          } else {
            callback('Could not get data from the machine, Is the IP right?');
          };
        });

      } else {
        callback('Could not get data from the machine, Is the IP right?');
      }
    });
  } else {
    callback('Missing required field');
  };
};



// Example request
antminerS9.getValues('192.168.34.12',function(err){
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
