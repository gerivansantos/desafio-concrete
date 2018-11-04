const path = require('path');
const userDAO = require(path.resolve('src/dao/userDAO'));
const userPhoneDAO = require(path.resolve('src/dao/userPhoneDAO'));
const sessionDAO = require(path.resolve('src/dao/sessionDAO'));
var crypto = require('crypto');
const UUID = require('node-uuid');
const moment = require('moment');
const config = require(path.resolve('src/utils/config'));
const userController = {

     create: function(req, res){         
         const user = req.body;
         user.senha = crypto.createHash('md5').update(user.senha).digest("hex");
                 
         userDAO.create(user).then(function(userCreated) {

            var userReturn = userCreated.toJSON();

            if(typeof user.telefones === 'undefined' || user.telefones == null)
            {  
                sessionDAO.create({usuario_id: userCreated.id, token: UUID.v1()}).then(function(sessionCreated){
                    userReturn.token = sessionCreated.token;
                    userReturn.data_gerado = sessionCreated.data_gerado;

                    res.status(200).json(userReturn);      

                });
                
            }
            else
            {
                for(let i = 0; i < user.telefones.length; i++)
                {
                    var telefone = user.telefones[i];

                    userPhoneDAO.create({telefone: telefone.numero, ddd: telefone.ddd, usuario_id: userCreated.id}).then(function(phoneCreated){
                      
                     });                    
                }   

                sessionDAO.create({usuario_id: userCreated.id, token: UUID.v1()}).then(function(sessionCreated){
                    userReturn.token = sessionCreated.token;
                    userReturn.data_gerado = sessionCreated.data_gerado;

                    userPhoneDAO.find({usuario_id: userCreated.id}).then(function(telefones){
                        userReturn.telefones = telefones;
                        res.status(200).json(userReturn);
                    });

                });
            } 
          }).catch(function(error){

               var message = error.message; //config.message.DEFAULT_ERROR;              
            //    console.log(error.message)
            //    if (error.errors[0].path == "email") {
            //     message = config.message.ALREADY_MAIL;
            //    }

               res.status(500).json(message);
          });


     },

     signIn: function(req, res) {
         const signin = req.body;

         userDAO.findOne({email: signin.email}).then(function(usuarioByEmail){

            if(usuarioByEmail)
            {
                userDAO.findOne({email: signin.email, senha: crypto.createHash('md5').update(signin.senha).digest("hex")}).then(function(usuarioSearch){ 
                    if(usuarioSearch)
                    {
                       var usuarioLogado = usuarioSearch.toJSON();
                       sessionDAO.create({usuario_id: usuarioSearch.id, token: UUID.v1()}).then(function(sessionCreated){
                           usuarioLogado.token = sessionCreated.token;
                           usuarioLogado.data_gerado = sessionCreated.data_gerado;

                           userPhoneDAO.find({usuario_id: usuarioSearch.id}).then(function(telefones){
                                usuarioLogado.telefones = telefones;
                                res.status(200).json(usuarioLogado);
                           });

                       });
                    }
                    else
                    {
                        res.status(401).json(config.message.INVALID_SIGNIN_DATA);
                    }
               });
            }
            else
            {
                res.status(400).json(config.message.INVALID_SIGNIN_DATA);
            }

         });
       
         
     },

     getUser: function(req,res){
        const filter = {
            id: req.params.id || 0
          };        
          
        const usuario_id = req.params.id || filter.id;
        const token = req.headers.authorization.replace("Bearer ", "");
        

        sessionDAO.findOneLastAcess({token: token}).then(function(lastSession){

            if(lastSession)
            {
                sessionDAO.findOneLastAcess({token: token, usuario_id: usuario_id}).then(function(session){

                  if(session)
                  {
                    var now = moment();
                    //now = now.getTime();
                    var tokenHour = moment(session.data_gerado);
                    var diff = now.diff(tokenHour, 'minutes');

                    if(diff > 30)
                    {
                        res.status(401).json(config.message.INVALID_SESSION);
                    }
                    else
                    {
                        userDAO.findOne({id: usuario_id}).then(function(usuarioSearch){
                            res.status(200).json(usuarioSearch);
                        });
                    }

                  }
                  else
                  {
                    res.status(401).json(config.message.NOT_AUTHORIZED); 
                  }  

                });

                
            }
            else
            {
                res.status(400).json(config.message.NOT_AUTHORIZED); 
            }

        });        
       
     }
    
};

module.exports = userController;