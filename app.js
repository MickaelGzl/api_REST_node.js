console.log('Hello World!');

const express = require ('express');            // importe fichiers requis
const morgan = require('morgan');               // s'occupe de faire la même chose que les lignes 13-16, log toute requete entrante dans console
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize') // contient sequelize, DataTypes, mock-citations et CitationModel

const app = express();
const port = /*process.env.PORT ||*/ 3000;      //ère partie est à assigner pour récupérer le port lors de phase de déploiement


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json());

sequelize.initDb();


//point de terminaison      = const blabla = require('./src/routes/____');    blabla(app);
require('./src/routes/findAllCitations')(app);
require('./src/routes/findCitationByPk')(app);
require('./src/routes/createCitation')(app);
require('./src/routes/updateCitation')(app);
require('./src/routes/deleteCitation')(app);
require('./src/routes/logIn')(app);

//ajout gestion d'erreurs 404
app.use(({res}) =>{
    const message = 'URL invalide: impossible de trouver la ressource demandée.';
    res.status(404).json({message});                                                //methode status de Express
})


app.listen(port,()=> console.log(`démarrée sur http://localhost:${port}`));

/*sequelize validateur et contraintes

// effectue la validation des modèles au nv du js pur
    //aucun retour si erreur dans validation
    //validateur permet de ne pas interogger la bdd et gagner du temps

//règles définie au nv de la bdd*/

//paramètre d'URL: pour identifier ressource spécifique
// paramètre de requête: pour filtrer, trier des ressources
