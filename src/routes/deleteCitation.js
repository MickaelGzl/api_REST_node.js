const { Citation } = require('../db/sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.delete('/api/citations/:id', auth, (req, res) => {
    Citation.findByPk(req.params.id).then(citation => {
      if(citation === null){
        const message = 'La citation demandée n\'existe pas.';
        return res.statut(404).json({message});
      }

      const citationDeleted = citation;
      return Citation.destroy({
        where: { id: citation.id }
      })
      .then(_ => {
        const message = `La citation avec l'identifiant n°${citationDeleted.id} a bien été supprimé.`
        res.json({message, data: citationDeleted })
      })
    })
    .catch( error => {
      const message = 'La citation n\'a pas pu être supprimé. Veuillez réessayer dans quelques instants';
      res.status(500).json({message, data: error});
    })
  })
}