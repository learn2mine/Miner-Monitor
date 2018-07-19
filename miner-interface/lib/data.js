/*
* Library for working with the config file for the miners
*
*/

// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// Container for all the data functions
var lib = {};

// Write to file
lib.create = function(file,data,callback){
  // Open the file for writing
  fs.open(file, 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    };
  });

};

// Read data from a file
lib.read = function(file,callback){
  fs.readFile(file, 'utf8', function(err,data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};


// List all the items in a directory
lib.list = function(dir,callback){
  fs.readdir(dir, function(err,data){
    if(!err && data && data.length > 0){
      callback(false,data);
    } else {
      callback(err,data);
    };
  });
};

module.exports = lib;
