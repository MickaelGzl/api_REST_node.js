const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');        //module de génération clef JWT
const privateKey = require('../auth/private_key');
  
module.exports = (app) => {
    app.post('/api/login', (req, res) => {                                      //pareil qu'en php
        User.findOne({ where: { username: req.body.username } })                //trouve le compte associé à l'username
        .then(user => {

            if(!user){
                const message = `L'utilisateur demandé n'existe pas.`;
                return res.status(404).json({message});
            }

            bcrypt.compare(req.body.password, user.password)                    //compare mdp entré et mdp stocké crypté
            .then(isPasswordValid => {
                if(!isPasswordValid) {
                    const message = `Le mot de passe est incorrect.`;
                    return res.status(401).json({message});
                }
                //else{   //else{} non obligatoire car return au dessus stope la suite du processus
                    //JWT
                    const token = jwt.sign(     //génère clef avec méthode sign, 3params
                        {userId: user.id},
                        privateKey,
                        {expiresIn: '24h'}
                    )
                    const message = `L'utilisateur a été connecté avec succès.`;
                    return res.json({ message, data: user, token })
                //}
                
            })
        })
        .catch(error => {
            const message = `L'utilisateur n'a pas pu être connecté avec succès. Réessayer dans quelques instants.`;
            return res.status(500).json({message, data:error});
        })
    })
}