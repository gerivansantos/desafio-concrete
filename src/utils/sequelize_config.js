var Sequelize = require('sequelize'),
    path = require('path'),
    config = require(path.resolve('src/utils/config'));

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 20,
    min: 5,
    idle: 10000
  }
});

module.exports = sequelize;


// Or you can simply use a connection uri
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
//http://docs.sequelizejs.com/manual/installation/getting-started