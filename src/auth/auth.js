// a chaque requête d'un utilisateur il faut extraire le jeton de l'entête de cette requête, et vérifier sa validité
// en fonction de celle-ci, on ajuste la réponse
// traitement à effectuer sur chaque points de terminaison, excepté ceux du signIn, logIn (logique)
//jeton échangé comme ceci dans entête: authorization: Bearer <JWT> (Bearer espace chaine aléatoire)

const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization     //récupère entête dans laquelle transite jeton JWT
  
  if(!authorizationHeader) {        //vérifie si jeton fournis
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1] //voir ligne 4, ici on retire Bearer pour récupérer uniquement le jeton
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {       //vérifie validité, de manière asynchrone car 3params
    if(error) {
      const message = `Vous n'êtes pas autorisé à accéder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next() // on laisse l'accès libre au point de terminaison demandé
    }
  })
}