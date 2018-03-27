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

  // GET route for getting all of the users
  app.get("/api/users/", function(req, res) {
    db.User.findAll({})
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });
  
  app.post("/api/users/login", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      },
      include: [db.Pet]
    })
      .then(function(dbUser) {
        console.log(dbUser);
        if (req.query.password == dbUser.password){
        res.json(dbUser);
        console.log(dbUser);
      } else {
        res.json(dbUser);
      }
      })
      .catch(function(err){
        console.log('Error: ' + err.message);
      });
  });

  // Get rotue for retrieving a single post
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
       id: req.params.id
      },
      include: [db.Pet]
    })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  // POST route for saving a new post
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  // DELETE route for deleting users
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  // PUT route for updating users
  app.put("/api/users/:id", function(req, res) {
    db.User.update(req.body,
      {
        where: {

          id: req.params.id

        }
      })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });
//PETS API

// GET route for getting all of the users
app.get("/api/pets", function(req, res) {
  
  db.Pet.findAll({
    where: { 
      petType: req.body.petType,
      petLocation: req.body.petLocation
    },
    
  }).then(function(dbPet) {
    res.json(dbPet);
  });
});

app.get("/api/pets/:id", function(req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  db.Pet.findOne({
    where: {
      id: req.body.id
    },
    include: [db.User]
  }).then(function(dbPet) {
    res.json(dbPet);
  });
});

app.post("/api/pets", function(req, res) {
   db.Pet.create(req.body)
    .then(function(dbPet) {
      res.json(dbPet);
    });
});

app.post("/api/pets/:animal", function(req, res) {
 var attributes = ['phone', 'location', 'addressLine', 'email'];
  db.Pet.findAll({
      where: {
      petType: req.params.animal,
      petLocation: req.body.petLocation
    },
    include: [{model: db.User, attributes: attributes}]
  })
    .then(function(dbPet) {
      res.json(dbPet);
    })
    .catch(function(err){
      console.log('Error: ' + err.message);
    });  
});



};

