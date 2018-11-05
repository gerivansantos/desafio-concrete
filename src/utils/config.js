const config = {
    db: {
        host: 'ec2-184-73-169-151.compute-1.amazonaws.com', //'localhost',
        username: process.env.CS_DB_USER || 'lvmlzjewscwulv',
        password: process.env.CS_DB_PASSWORD || 'b5a13f1bd7f6f213812e30e8fe73d8392188ecb1688daa05c203b4db0c5bce5d',
        database: process.env.CS_DB || 'dd6qrf175nihue', //'desafioConcrete',
        port: 5432,    
        native: true,  
    },

    message: {

        DEFAULT_ERROR: { mensagem: 'Erro no processo da requisição' },
        ALREADY_MAIL: { mensagem: 'E-mail já existente' },
        INVALID_SIGNIN_DATA: { mensagem: 'Usuário e/ou senha inválidos' },
        NOT_AUTHORIZED: { mensagem: 'Não autorizado'},
        INVALID_SESSION: { mensagem: 'Sessão inválida'}

    },

    app: 
    {
        name: 'Desafio Concrete'
    },
    
    server: 
    {
        port: process.env.PORT || 5000
    }
};

module.exports = config;