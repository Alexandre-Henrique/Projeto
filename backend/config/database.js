const { Sequelize } = require('sequelize');  // Importa o Sequelize, um ORM que facilita a interação com o banco de dados

const sequelize = new Sequelize('projetotarefas', 'root', '', {
    host: 'localhost',  // Endereço onde o banco de dados está rodando (no caso, localmente)
    dialect: 'mysql'  // Indica que estamos usando MySQL como banco de dados
});

sequelize.authenticate()  // Tenta se conectar ao banco de dados
    .then(() => {
        console.log('Conectado ao MySQL com sucesso!');  // Se a conexão for bem-sucedida, exibe essa mensagem no console
    })
    .catch(err => {
        console.error('Erro ao conectar ao MySQL:', err);  // Se houver um erro na conexão, exibe a mensagem de erro no console
    });

module.exports = sequelize;  // Exporta o objeto sequelize para ser usado em outras partes do projeto
