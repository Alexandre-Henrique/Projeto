const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3001;

// Configurações básicas
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Adicione sua senha aqui se houver
    database: 'projetotarefas'
};

// Teste da conexão com o banco de dados
mysql.createConnection(dbConfig).then(connection => {
    console.log('Conectado ao MySQL com sucesso');
    connection.end();
}).catch(err => {
    console.error('Erro ao conectar ao MySQL:', err);
});

// Rota exemplo
app.get('/', (req, res) => {
    res.send('API rodando...');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
