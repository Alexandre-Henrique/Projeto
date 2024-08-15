const express = require('express');  // Importa o Express para criar o servidor
const sequelize = require('./config/database');  // Importa a configuração do banco de dados para conectar ao MySQL
const taskRoutes = require('./routes/taskRoutes');  // Importa as rotas para manipular as tarefas

const app = express();  // Cria uma instância do Express
const PORT = process.env.PORT || 3001;  // Define a porta em que o servidor vai rodar, 3001 por padrão

app.use(express.json());  // Configura o servidor para entender requisições com JSON no corpo

app.use('/api', taskRoutes);  // Diz ao servidor para usar as rotas que definimos, prefixadas com "/api"

// Sincroniza os modelos com o banco de dados e inicia o servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);  // exibe uma mensagem indicando que o servidor está rodando
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar com o banco de dados:', err);  // exibe a mensagem de erro
    });
