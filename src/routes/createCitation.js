const {Citation} = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/api/citations', auth, (req,res) => {        
        Citation.create(req.body)
            .then(citation => {
                const message = `Votre citation a bien été enregistré avec les informations suivantes.`
                res.json({message, data: citation})
            })
            .catch( error => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'La citations n\'a pas pu être crée. Veuillez réessayer dans quelques instants';
                res.status(500).json({message, data: error});
            })
    })
};