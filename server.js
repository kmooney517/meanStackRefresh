var express = require('express');
var app = express();

var mongojs = require('mongojs');

var db = mongojs('mongodb://kmooney517:Allymooney2!@ds051625.mongolab.com:51625/refresh', ['contactList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {

  db.contactList.find(function(err, docs) {
    res.json(docs);
  });

});

app.post('https://boiling-wildwood-85823.herokuapp.com/contactList', function(req, res) {
  db.contactList.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('https://boiling-wildwood-85823.herokuapp.com/contactList/:id', function(req, res) {
  var id = req.params.id;

  db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('https://boiling-wildwood-85823.herokuapp.com/contactList/:id', function(req, res) {
  var id = req.params.id;

  db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.put('https://boiling-wildwood-85823.herokuapp.com/contactList/:id', function(req, res) {
  var id = req.params.id;

  db.contactList.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update: {
      $set: {
        Name: req.body.Name,
        Email: req.body.Email,
        Number: req.body.Number  
      }
    },
    new: true
  }, function(err, doc) {
      res.json(doc);
    
  });
});




app.listen(8000);
console.log('server running on port: 8000');
