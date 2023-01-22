//const validTypes = [1, 2, 3, 4, 5]  //voir pour créer plutôt une autre base de donnée

module.exports = (sequelize, DataTypes) => {    //co to sequelize, types de données
    return sequelize.define('Citation', {       // 3 params: nom du modèle, description props, et options
      id: {
        type: DataTypes.INTEGER,        //nom type et paramètres
        primaryKey: true,
        autoIncrement: true
      },
      citation: {
        type: DataTypes.TEXT,
        allowNull: false,
        //unique: {msg: 'la citation est déjà connue de la base de donnée'},  
        validate: {
          notEmpty: {msg: "La citation ne peut pas être vide"},
          notNull: {msg: "La citation est un champ obligatoire"}
        }
      },
      auteur: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: "L'auteur doit être déclaré"},
        }
      },
      acteur: {
        type: DataTypes.STRING,
        allowNull: false
      },
      personnage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      saison: {
        type: DataTypes.STRING,
        allowNull: false
      },
      episode: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: true,         //souhaite modifier comportement par défault ?
      createdAt: 'created',     //date création
      updatedAt: 'updated',     //date modification     /*false si on veut pas save*/ 
    })
  }
 
//validateur s'activent lors de create et update, au même endroit que type, allowNull, etc...
//liste: isInt, isEmail, isURL, notNull, etc






/*
    picture: {
        type: DataTypes.STRING,
        allowNull: false
        validate: {
          isUrl: ...
        }
    },

    pour tableau, en dessous de allowNull,
    rajouter  get() { return this.getDataValue('types').split(',')},
              set(types) {this.setDataValue('types', types.join()}
              validate:{
                isTypesValid(value) {   //nom arbitraire
                  if(!value) {
                    throw new error ('1 type minimum requis')
                  };
                  if(value.split(',').length > 3) {
                    throw new error (' 3 types maximum')
                  };
                  value.split(',').foreach(type => {
                    if(!validTypes.include(type)) {
                      throw new error (`doit appartenir à la liste suivante: ${validTypes}` ) //déclaré ligne 1
                    }
                  });
                }
              }
*/

/* SEQUELIZE ASSOCIATION TYPES
    belongsTo, hasMany, belongsToMany

// add user id foreign key to all projects
Project.belongsTo(User, { foreignKey: 'id_manager' });
User.hasMany(Project, { foreignKey: 'id_manager' });

// makes a join table between the users and projects
// 'through' key sets the name of the table: user_projects
User.belongsToMany(Project, { through: UserProject, foreignKey: 'id_user' });
Project.belongsToMany(User, { through: UserProject, foreignKey: 'id_project' });
*/
