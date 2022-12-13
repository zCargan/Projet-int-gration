const User = require("../models/user");
const Papa = require("papaparse");
const fs = require("fs");

const app = require("../app");
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const cookieParser = require('cookie-parser')


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);

exports.createUser = (req, res) => {
  const test = new User({
      ...req.body
  })
  test.save()
      .then(() => res.status(201).json({ message: 'utilisateur ajouté' }))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.updateUserObjectif = (req, res, next) => {
  let keys = Object.keys(req.body)
  let values = Object.values(req.body)
  let id_value = values[0];
  let id_json = {"_id":ObjectId(id_value)}
  let objectifs_key = keys[1];
  let objectifs_value = values[1];
  let objectifs_json = {[objectifs_key]:objectifs_value};
  if (id_value === "" || id_value === undefined){
      res.status(400).send("Vous n'êtes pas connecté")
  } else if (objectifs_value === "" || objectifs_value === undefined) {
      res.status(400).send("Veuillez entrer un objectif")
  } else {
      User.updateOne(id_json, {$set:objectifs_json})
      .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
      .catch(error => res.status(400).json({ error }));
  }
}

exports.updateUserFollowers = (req, res, next) => {
  let newfollowers = {$set: {userfollows : req.body.userfollows}};

  User.updateOne({_id: req.params.id}, newfollowers)
    .then(() => res.status(201).json({ message: 'Utilisateur suivi.' }))
    .catch(error => res.status(400).json({ error }));
  
}
  
exports.modifyUser = (req, res, next) => {
    const user = new User({
      _id: req.params.id,
      username : req.body.pseudonyme,
      email : req.body.email,
      password : req.body.password,
      objectifs : req.body.objectifs,
      userfollows : req.body.userfollows,
      city : req.body.city,
    });
    User.updateOne({_id: req.params.id}, {$set:user}).then(
      () => {
        res.status(201).json({
          message: 'User updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


exports.getCookie = (req, res) => {
  User.findOne({ email: req.body.email })
  .then(response =>  {
    if (!response) {
    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    if (req.body.mdp == response.password){
        res.cookie('Id', response._id.toString() ,{
            maxAge: 5000000,
            // expires works the same as the maxAge
            secure: false, // mettre l'attribut à true une fois que le site est en HTTPS
            // httpOnly: true,
            sameSite: 'lax'
        });
        return res.status(200).json(response);
    }
    else{
      return res.status(401).json({ error: 'Mot de passe incorrecte !' });
    }
  })
};

exports.getAllUser = (req, res, next) => {
    User.find().then(
      (users) => {
        res.status(200).json(users);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getWithMail = (req, res) => {
    User.findOne({ email: req.params.email })
        .then(response => {
              return res.send(response.password)

        })
}
exports.getOneMail = (req, res) => {
  User.findOne({ email: req.body.email })
      .then(response => {
          if (!response) {
              return res.send(true)
          }
          else {
              return res.send(false)
          }
      })
}
  exports.getOneUsername = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(response => {
            if (!response) {
                return res.send(true)
            }
            else {
                return res.send(false)
            }
        })
}

exports.login = (req, res ,next) => {
    User.findOne({ email: req.body.email})
    .then(response => {
          res.cookie('Id', response._id.toString(), {
              maxAge: 500000,
              // expires works the same as the maxAge
              secure: true, // mettre l'attribut à true une fois que le site est en HTTPS
              // httpOnly: true,
              sameSite: 'lax',
              // signed: true,
          });
          return res.status(200).json(response);
    })
  }

exports.getUserCity = (req, res) => {
  let ville = req.body.city;
  User.find({ "city": ville }).then(response => {
      res.status(200).json(response)
  })
}

exports.getManyUsers =(req, res)=>{
  id=req.params.id
  User.find({ quantity: { $in: id } }).then(response => {
    res.status(200).json(response)
})

}