var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


client.create({
  index: 'todolist',
  type: 'task',
  id: '1',
  body:{
    title: 'Wake Up',
    description: 'This is an alarm to get up',
    datecreated: Date.now().toString(),
    datedue: Date.now().toString()
  }
},function(req,res){
  console.log(res);
});
