var Sequelize = require('sequelize'),
    path = require('path'),
    config = require(path.resolve('src/utils/config'));

//const sequelize = new Sequelize('postgres://lvmlzjewscwulv:b5a13f1bd7f6f213812e30e8fe73d8392188ecb1688daa05c203b4db0c5bce5d@ec2-184-73-169-151.compute-1.amazonaws.com:5432/dd6qrf175nihue sslmode=require');

 var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
   host: config.db.host,
   dialect: 'postgres',
   ssl:true,
   dialectOptions:{
      ssl:{
         require:true
      }
   },
   logging: false, 
   pool: {
     max: 20,
     min: 5,
     idle: 10000,
   }
});

module.exports = sequelize;


// Or you can simply use a connection uri
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
//http://docs.sequelizejs.com/manual/installation/getting-started