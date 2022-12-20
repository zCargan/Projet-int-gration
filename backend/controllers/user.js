const User = require("../models/user");
const fs = require("fs");
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Session = require("../models/session")
const argon2 = require('argon2');
const CryptoJS = require('crypto-js');


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);

const encryptWithAES = (text) => {
  const passphrase = 'projetdintegration';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const passphrase = 'projetdintegration';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}


exports.createUser = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  argon2.hash(req.body.password).then( passwordhashed => {
    let objectifs = req.body.objectifs
    let userfollows = req.body.userfollows
    let city = req.body.city
    const test = new User({
      "username" : username,
      "email" : encryptWithAES(email),
      "password":passwordhashed,
      "objectifs": objectifs,
      "userfollows":userfollows,
      "city" : city
    })
    test.save()
        .then(() => res.status(201).json({ message: 'utilisateur ajouté' }))
        .catch(error => res.status(400).json({ error }));
  })
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
            maxAge: 60 * 60 * 1000,
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
  let mailCrypt;
  User.find().then(
    (users) => {
      for (let i in users){
        if(req.body.email == decryptWithAES(users[i].email)){
          mailCrypt = users[i].email
        }
      }
      User.findOne({ email: mailCrypt})
    .then(response => {
      argon2.verify(response.password, req.body.password)
      .then(mdp =>{
        if(mdp) {
          const session = new Session({
            idUser : response._id.toString(),
            time: new Date()
          })
          session.save()
          res.cookie('Id', session._id.toString(), {
              maxAge: 500000,
              // expires works the same as the maxAge
              secure: true, // mettre l'attribut à true une fois que le site est en HTTPS
              httpOnly: true,
              sameSite: 'none',
              signed: true,
          });
          res.status(200).json(mdp);
        }
        else{
          res.status(401).json();
        }
      })
    })
    .catch((error) => {
      res.status(401).json({
        error: error
      });
    })
    }
  )
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