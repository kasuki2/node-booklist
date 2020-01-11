#! /usr/bin/env node

console.log('Try to write the db');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Countme = require('./models/Countme')

var mongoose = require('mongoose');

const mongoDB = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    mongoDB,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function writeinFirst(){

var counter = new Countme({count: 2})

counter.save(function (err) {
    if (err) {
      console.log("error")
      return
    }
    console.log('New Author: ' + counter);
   
  }  );
}

function getNextSequence(name) {
    //var ret = db.counters.findAndModify(
        var ret = Countme.findAndModify(
           {
             query: { _id: name },
             update: { $inc: { seq: 1 } },
             new: true
           }
    );
 
    return ret.seq;
 }

 function getNextCount() {
    
  //  var reti = Countme.find({_id: 'productid'})
   // var reti = db.counters.find({_id: 'productid'})
   // return reti
  //  var reti = Countme.find({}, 'sequence_value')
   // console.log(reti)
    
    var query = Countme.find({ 'sequence_value': 0 });



// execute the query at a later time
    query.exec(function (err, athletes) {
    if (err) return handleError(err);
    // athletes contains an ordered list of 5 athletes who play Tennis
    console.log("hey: " + athletes);
})
    
 }

 //writeinFirst();
 //var numi = getNextCount()
 //console.log(numi)

 getNextCount()
 //console.log("itt: " + vali)


