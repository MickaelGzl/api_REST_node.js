const { Sequelize, DataTypes } = require('sequelize');
const CitationModel = require('../models/citation');
const UserModel = require('../models/users')
const citations = require('./mock-citations');
const bcrypt = require('bcrypt');                   //hachage de password

let sequelize;


if(process.env.NODE_ENV === 'production'){                                  //identifiants lors de production
    sequelize = new Sequelize('Database', 'Username', 'Password', {            // info après click sur add-ons 
        host: 'Host',       //aussi contenu dans les infos                                            
        dialect: 'mysql',                                               
        //dialectOptions: {                                               
        //    timezone: 'Etc/GMT-2',
        //},
        logging: true
    })
}
else{
    sequelize = new Sequelize('citationkaamelott', 'root', '', {      //nom BDD, id, mdp, config
        host: 'localhost',                                              //chemin vers bdd
        dialect: 'mysql',                                               // nom driver
        //dialectOptions: {                                               //options supp non obligatoire
        //    timezone: 'Etc/GMT-2',
        //},
        logging: false
    })
}


const Citation = CitationModel(sequelize, DataTypes);           //instanciation classe
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true})                        //synchro avec model sequelize et bdd, force = suppr table associé à model avant sync
    .then(_ => {
        citations.map(citation => {
            Citation.create({
                citation: citation.citation,
                auteur: citation.auteur,
                acteur: citation.acteur,
                personnage: citation.personnage,
                saison: citation.saison,
                episode: citation.episode
            })
            .then(citation = console.log(citation));  //ne marche plus avec toJSON() pour moi, pourquoi ?
        })
        bcrypt.hash('Pignouf30', 10)        //idem qu'en php, mais param 2 = delai d'encryptage et non taille string 
        .then( hash => {
            User.create({
                username: 'MickaBoo',
                password: hash
            })
        })
        .then(user => console.log(user));
        console.log('La BDD à bien été initialisé');
    })
    .catch(error => console.error(`connexion impossible: ${error}`));
}

module.exports = {
    initDb, Citation, User
}




/*
sequelize.authenticate()        //test connexion
    .then(_ => console.log('connexion réussi'))
    .catch(error => console.error(`connexion impossible: ${error}`));
*/