const {Citation} = require('../db/sequelize');
const { Op } = require ('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {                     //prend en param app express entière
    app.get('/api/citations', auth, (req,res) => {
        if(req.query.auteur) {
            const name = req.query.auteur;
            const limit = parseInt(req.query.limit) || 5;       //marche aussi pour variables !!

            if(name.length < 2){
                const message = 'Le terme de votre recherche n\'est pas assez précis, il doit contenir au moins 2 caractères.';
                return res.status(404).json({message});     //pour éviter requête inutile à BDD, à faire au plus possible
            }

            /*return Citation.findAll({     //retourne tout les résultats
                where: {
                    auteur: {               //propriété du modèle citation
                        [Op.like]: `%${name}%`       //manière d'utiliser un opérateur, name est le critère de la recherche
                    }   // Op.eq = recherche stricte = , Op.like = recherche souple, donc utilise %
                }//,
                //limit: 5    //indique une limite max de résultats
            })
            .then(citations => {
                const message = `Il y a ${citations.length} citations qui correspondent au terme de recherche ${name}.`;
                res.json({message, data: citations });
            })*/

            return Citation.findAndCountAll({       //retourne tout les résultats mais affiche un compte, nb total résults et résults demandés
                where: {
                    auteur: {
                        [Op.like]: `%${name}%`
                    }
                },
                order: ['citation'/*, 'ACS'*/],      //ASC par défaut, sinon 2params pour définir quel ordre
               limit: limit
            })
            .then(({count, rows}) => {      //params de findAndCountAll, nom imposés
                const message = ` Il y a ${count} citations qui correspondent au terme de recherche ${name}.`;
                res.json({message, data: rows})
            })
        }
        else{
            Citation.findAll({order:['citation']})      //possible aucun param, ici pareil qu'au dessus: afficher par ordre citation
                .then(citations => {
                    const message = 'La liste des citations a bien été récupérée.';
                    res.json({message, data: citations})        // = res.status(200).json, c'est le comportement par défaut d'express
                })
                //.catch(error => console.log(error));
                .catch( error => {
                    const message = 'La liste des citations n\'a pas pu être récupérée. Veuillez réessayer dans quelques instants';
                    res.status(500).json({message, data: error});
                })
            }
    })
};


/*
pour tableau, convertit en string dans bdd
il faut transformer string en tb
*/