const {Citation} = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/citations/:id', auth, (req,res) => {
        Citation.findByPk(req.params.id)        //find by primary key, et plus besoin de parseInt 
            .then(citation => {
                if(citation === null){
                    const message = 'La citation demandée n\'existe pas.';
                    return res.statut(404).json({message});
                }
                const message = 'Une citation à bien été trouvé.';
                res.json({message, data: citation})
            })
            .catch( error => {
                const message = 'La citation n\'a pas pu être récupérée. Veuillez réessayer dans quelques instants';
                res.status(500).json({message, data: error});
            })
    })
};