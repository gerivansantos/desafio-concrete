const config = {
    db: {
        host: 'localhost',
        username: process.env.CS_DB_USER || 'postgres',
        password: process.env.CS_DB_PASSWORD || 'avantia123',
        database: process.env.CS_DB || 'desafioConcrete',
        port: 5432
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
        port: 5000
    }
};

module.exports = config;