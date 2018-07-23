/*
* Scrape entire website specified
*
*/

// Dependencies
var net = require('net');
var StringDecoder = require('string_decoder').StringDecoder;

//Container for scrapers
var getValues = {};

// Helper for APIs that use tcp
getValues.apiTCP = function(port,ip,msg,callback){
  port = typeof(port) == 'number' && port.toString().trim().length == 4 ? port : false;
  ip = typeof(ip) == 'string' && ip.trim().length >= 12 && ip.trim().length <= 13 ? ip.trim() : false;
  msg = typeof(msg) == 'string' && msg.length > 0 ? msg : false;

  if (port && ip && msg){
    var client = new net.Socket();

    client.on('error',function(e){
      callback(e);
      client.destroy();
    });


    client.connect(port,ip,function(){
      console.log('connected');
      client.write(msg);
      client.end();
    });


    var decoder = new StringDecoder('utf-8');
    var returnData = "";
    client.on('data', function(data){
      returnData += decoder.write(data);
    });

    client.on('close', function(){
      client.destroy();
      console.log('closed');
      callback(false,returnData);
    });

  } else {
    callback('You did not send all the required values');
  };
};

// Example request
//var hello =helpers.apiTCP(4028,'192.168.34.12','{"command" : "summary","parameter":""}',function(err){
//  console.log(err);
//});

// Export the module
module.exports = getValues;
