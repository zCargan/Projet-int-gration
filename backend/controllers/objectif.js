const Objectif = require('../models/objectif')
const ObjectId = require('mongodb').ObjectID;


exports.createObjectif = (req, res, next) => {
<<<<<<< HEAD
    console.log(req.body);
=======
  console.log(req.body)
>>>>>>> 7dae96a (Modification ajout objectifs)
    const obj = new Objectif({
      ...req.body
    });
    console.log(obj);
    obj.save().then(
      () => {
        res.status(201).json({
          message: 'Objectif saved successfully!'
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

exports.getOneObjectif = (req, res, next) => {
    Objectif.findOne({
      objectif: req.params.name
    }).then(
      (obj) => {
        res.status(200).json(obj);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
exports.modifyObjectif = (req, res, next) => {
    const obj = new Objectif({
      _id: ObjectId(req.body._id),
      type: req.body.type,
      objectif: req.body.objectif,
      description: req.body.description,
    });
    let id_json = {_id: ObjectId(req.body._id)}
    Objectif.updateOne(id_json, {$set:obj}).then(
      () => {
        res.status(201).json({
          message: 'Objectif updated successfully!'
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
  
exports.deleteObjectif = (req, res, next) => {
    Objectif.deleteOne({_id: req.params.id}).then(
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
  
exports.getAllObjectif = (req, res, next) => {
    Objectif.find().then(
      (objs) => {
        res.status(200).json(objs);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };