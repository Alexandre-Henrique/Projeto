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


// Rota para a página da instituição
app.get('/instituicao', (req, res) => {
    // Consulta ao banco de dados
    connection.query('SELECT * FROM instituicao LIMIT 1', (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados: ' + err.stack);
        res.status(500).send('Erro interno do servidor');
        return;
      }
      
      if (results.length > 0) {
        const instituicao = results[0];
        res.send(`
          <html lang="pt-BR">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>A Instituição - FATECE</title>
              <link rel="stylesheet" href="/instituicao.css">
          </head>
          <body>
              <div class="instituicao-container">
                  <h1>Sobre a FATECE</h1>
                  <h2>História</h2>
                  <p>${instituicao.historia}</p>
                  <h2>Missão</h2>
                  <p>${instituicao.missao}</p>
                  <a href="/">Voltar para a página inicial</a>
              </div>
          </body>
          </html>
        `);
      } else {
        res.status(404).send('Informações sobre a instituição não encontradas');
      }
    });
  });

// Rota para a página de infraestrutura
app.get('/infraestrutura', (req, res) => {
  connection.query('SELECT * FROM infraestrutura', (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados: ' + err.stack);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Infraestrutura</title>
          <link rel="stylesheet" href="/infraestrutura.css">
      </head>
      <body>

          <main>
              <h1>Infraestrutura da FATECE</h1>
              <div class="infraestrutura-container">
                  ${results.map(imagem => `
                    <div class="imagem-item" onclick="openModal('/img/${imagem.imagem}')">
                        <img src="/img/${imagem.imagem}" alt="Infraestrutura">
                    </div>
                  `).join('')}
              </div>
          </main>
          
          <footer>
              <a href="/">Voltar para a página inicial</a>
          </footer>

          <!-- Modal -->
          <div id="modal" class="modal">
              <span class="close" onclick="closeModal()">&times;</span>
              <div class="modal-content">
                  <img id="modal-image" src="" alt="Imagem do Modal">
                  <span class="prev" onclick="prevImage()">&lt;</span>
                  <span class="next" onclick="nextImage()">&gt;</span>
  

          <script>
            let currentImageIndex = 0;
            const images = [];

            function openModal(src) {
                document.getElementById('modal').classList.add('show');
                document.getElementById('modal-image').src = src;
                currentImageIndex = images.indexOf(src);
                updateNavigation();
            }

            function closeModal() {
                document.getElementById('modal').classList.remove('show');
            }

            function prevImage() {
                if (images.length > 0) {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    document.getElementById('modal-image').src = images[currentImageIndex];
                }
            }

            function nextImage() {
                if (images.length > 0) {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    document.getElementById('modal-image').src = images[currentImageIndex];
                }
            }

            function updateNavigation() {
                images.length = 0;
                document.querySelectorAll('.imagem-item img').forEach(img => {
                    images.push(img.src);
                });
            }
          </script>
      </body>
      </html>
    `);
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


  
