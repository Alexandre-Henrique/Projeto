const express = require('express');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config(); // Carregar variáveis do .env

const app = express();
const port = process.env.PORT || 3000; // Usar a porta do .env ou 3000 por padrão

// Configuração do banco de dados usando variáveis de ambiente
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_SENHA, // Corrigido para DB_SENHA
  database: process.env.DB_NOME // Corrigido para DB_NOME
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

// Configuração do middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../projetoTarefas/')));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../projetoTarefas/index.html'));
});

// Rota para a página de cursos
app.get('/cursos/:id', (req, res) => {
  const cursoId = req.params.id;

  // Consulta ao banco de dados
  connection.query('SELECT * FROM cursos WHERE id = ?', [cursoId], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err.stack);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    
    if (results.length > 0) {
      const curso = results[0];
      res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${curso.nome}</title>
            <link rel="stylesheet" href="/curso.css"> <!-- Link para o CSS específico da página de cursos -->
        </head>
        <body>
            <div class="curso-container">
                <h1 class="curso-titulo">${curso.nome}</h1>
                <img src="/img/${curso.imagem}" alt="${curso.nome}" class="curso-imagem">
                <p class="curso-descricao">${curso.descricao}</p>
                <a href="/">Voltar para a página inicial</a>
            </div>
        </body>
        </html>
      `);
    } else {
      res.status(404).send('Curso não encontrado');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
