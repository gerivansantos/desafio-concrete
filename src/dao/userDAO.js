const path = require('path');
userModel = require(path.resolve('src/model/userModel'));

var userDAO = {

    create: function(user){
        return userModel.create(user);
    },

    findOne: function(query) {
        query = query || {};
    
        return userModel.findOne({
          where: query
        });
      },

};

module.exports = userDAO;