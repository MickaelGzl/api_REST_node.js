const { Citation } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.put('/api/citations/:id', auth, (req, res) => {
    const id = req.params.id;
    Citation.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Citation.findByPk(id).then(citation => {   //transmet le résultat, donc l'éventuelle erreur dans le bloc suivant
        if(citation === null){
          const message = 'La citation demandée n\'existe pas.';
          return res.statut(404).json({message});
        }

        const message = `La citation a bien été modifié.`
        res.json({message, data: citation });
      })
    })
    .catch( error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({message: error.message, data: error})
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({message: error.message, data: error})
      }
      const message = 'La citation n\'a pas pu être modifiée. Veuillez réessayer dans quelques instants';
      res.status(500).json({message, data: error});
    })
  })
}