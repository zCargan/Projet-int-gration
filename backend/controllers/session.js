const Objectif = require('../models/session')
const ObjectId = require('mongodb').ObjectID;
const app = require("../app");
const Session = require("../models/session")


exports.deleteSession = (req, res) => {

};

exports.getOneSession = (req, res) => {
    Session.findOne({
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