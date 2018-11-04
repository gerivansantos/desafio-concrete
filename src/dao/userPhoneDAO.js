const path = require('path');
userPhoneModel = require(path.resolve('src/model/userPhoneModel'));

var userPhoneDAO = {

    create: function(phone){
        return userPhoneModel.create(phone);
    },

    findOne: function(query) {
        query = query || {};
    
        return userPhoneModel.findOne({
          where: query
        });
      },
    
    find: function(query) {
        query = query || {};
    
        return userPhoneModel.findAll({
          where: query
        });
      },

}

module.exports = userPhoneDAO;