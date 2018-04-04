// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../../models");

// var petfinder = require('petfinder-promise')('f6480370e828119484f2e9fb63e62b27', '856eab142065e7802e97231a814a1492');
 
// // Get a list of cat breeds 
// petfinder.pet.find(location = "Washington,DC", animal="Washington,DC", output = "full").then(function (data) {
//     console.log(data);
// }).catch(function (err) {
//     console.log('Error: ' + err.message);
// });


// Routes
// =============================================================
module.exports = function(app) {

  app.post("/api/projects", function(req, res) {
    console.log(req.body);
    db.Project.create(req.body)
      .then(function(dbProject) {
        res.json(dbProject);
      });
  });

  app.get("/api/projects", function(req, res) {
    db.Project.findAll({
      order:[
        ["status", "DESC"]
      ]
    })
      .then(function(dbProject) {
        res.json(dbProject);
      });
  });

  app.get("/api/projects/:id", function(req, res) {
    db.Project.findOne({
      where: {
       id: req.params.id
        },
      })
      .then(function(dbProject) {
        res.json(dbProject);
      });
  });

  app.put("/api/projects/:id", function(req, res) {
    db.Project.update(req.body, 
      {
      where: {
       id: req.params.id
        },
      })
      .then(function(dbProject) {
        res.json(dbProject);
      });
  });

  app.delete("/api/projects/:id", function(req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProject) {
      res.json(dbProject);
    });
  });

};

