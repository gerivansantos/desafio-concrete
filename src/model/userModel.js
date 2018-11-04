//http://www.macoratti.net/17/01/node_sequelize1.html
//http://docs.sequelizejs.com/manual/tutorial/models-definition.html

const path = require('path');
const sequelize_config = require(path.resolve('src/utils/sequelize_config'));
const Sequelize = require('sequelize');
const userPhoneModel = require(path.resolve('src/model/userPhoneModel'));

var users = sequelize_config.define('user', {

        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1},
        nome: { type: Sequelize.STRING(100), allowNull: false },
        email: { type: Sequelize.STRING(100), allowNull: false },
        senha: { type: Sequelize.STRING(50), allowNull: false},
        data_criacao: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false,},
        data_atualizacao: { type: Sequelize.DATE },
        ultimo_login: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, },
        // token: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1 }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'users'
    }
);

users.hasMany(userPhoneModel, {foreignKey: 'usuario_id' });

module.exports = users;