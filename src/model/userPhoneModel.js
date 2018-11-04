//http://www.macoratti.net/17/01/node_sequelize1.html
//http://docs.sequelizejs.com/manual/tutorial/models-definition.html

const path = require('path');
const sequelize_config = require(path.resolve('src/utils/sequelize_config'));
const Sequelize = require('sequelize');

var usersPhones = sequelize_config.define('usersPhones', {

    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1},
    usuario_id: { type: Sequelize.UUID, allowNull: false },
    telefone: { type: Sequelize.STRING(9), allowNull: false },
    ddd: { type: Sequelize.STRING(3), allowNull: false},    
},
{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    tableName: 'users_phone'
});


module.exports = usersPhones;