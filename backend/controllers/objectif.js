const Objectif = require('../models/objectif')


exports.createObjectif = (req, res, next) => {
    console.log(req.body);
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
      _id: req.params.id
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
      _id: req.params.id,
      type: req.body.type,
      objectif: req.body.objectif,
      description: req.body.description,
    });
    Objectif.updateOne({_id: req.params.id}, obj).then(
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