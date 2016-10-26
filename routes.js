const express = require('express');
const path = require('path')
const router = express.Router();
const database = require('./database');
const shortid = require('shortid');


router
  //details page
  .get('/', (req, res) => {
    console.log(req);
    res.sendfile(path.join(__dirname + '/index.html'))
  })
  //retrieve requested url
  .get('/:id', (req, res) => {
    //get db object
    let db = database.get();
    console.log(req.params)
    //get db entry for id
    db.collection('urls').findOne({ _id: req.params.id }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to find url");
      } else {
        //redirect browser to new url
        res.redirect(doc.url)
      }
    });
  })

  //Add new url
  .get('/add/:newURL(*)', (req, res) => {
    //get db object
    let db = database.get();

    //build new entry
    newUrl = {
      _id: shortid.generate(),
      url: req.params.newURL,
      dateAdded: new Date()
    }

    //insert url to db
    db.collection('urls').insertOne(newUrl, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new url.");
      } else {
        requestType = req.secure ? 'https://' : 'http://';
        res.json({url: requestType + req.headers.host + "/" + doc.insertedId});
      }
    });
  });

//hangle errors
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}




module.exports = router;
