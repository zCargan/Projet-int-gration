const mongoose = require('mongoose');


const donneesSchema = mongoose.Schema({
    Battements: { type: Number, require: true },
    Date: { type: String, require: true },
    Duree: { type: String, require: true },
    Pas: { type: Number, require: true },
    Vitesse: { type: Number, require: true },
    VitesseMax: { type: Number, require: true },
    VitesseMin: { type: Number, require: true },
    id:  { type: String, require: true }
})

module.exports = mongoose.model('Donnee', donneesSchema);