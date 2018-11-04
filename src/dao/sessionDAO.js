const path = require('path');
sessionModel = require(path.resolve('src/model/sessionModel'));

var sessionDAO = {

    create: function(session){
        return sessionModel.create(session);
    },

    findOneLastAcess: function(query) {
        query = query || {};
    
        return sessionModel.findOne({
            order:[['data_gerado', 'DESC']],
            limit: 1,
            where: query
        });
    },


    findOne: function(query) {
        query = query || {};
    
        return userModel.findOne({
          where: query
        });
    },

};

module.exports = sessionDAO;