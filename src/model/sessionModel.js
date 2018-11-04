const path = require('path');
const sequelize_config = require(path.resolve('src/utils/sequelize_config'));
const Sequelize = require('sequelize');

var session = sequelize_config.define('session', {

        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1},
        usuario_id: { type: Sequelize.UUID, allowNull: false },
        token: { type: Sequelize.UUID, allowNull: false },
        data_gerado: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},       
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'session'
    }
);

module.exports = session;