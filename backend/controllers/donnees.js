const Donnees = require("../models/donnees");

exports.createDonnees = (req, res, next) => {
    const donnees = new Donnees({
        ...req.body
    })
    donnees.save()
        .then(() => res.status(201).json({ message: 'Données ajoutées' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getDonnees = (req, res, next) => {
    Donnees.findOne({
        _id: req.params.id
    }).then(res => {
        res.status(200)
    })
}


exports.getAllDonnees = (req, res, next) => {
    Donnees.find().then(
      (donnee) => {
        res.status(200).json(donnee);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };