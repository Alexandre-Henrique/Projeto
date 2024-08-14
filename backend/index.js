const express = requiere ('express'); // importa o framework express
const mongoose = require ('mongoose'); // importa mongoose para interagir com MongoDB
const cors = require ('cors');  // importa middleware cors
const taskRoutes = requiere ('./routes/taskRoutes'); //importa as rotas de taskRoutes
app.use('/api', taskRoutes); //configura servidor para usar as rotas a partir de 'api'

const app = express(); // criação da instância do Express
app.use(cors()); // Habilita o Cors para todas as rotas
app.use(express.json()); // Habilita parser para JSON, processamento no servidor com corpo JSON

mongoose.connect('mongodb://localhost:27017/projetoTarefas',{ //conecta o banco de dados MongoDB local na porta 27017 utilizando a base de dados 'projetoTarefas'
    useNewUrlParser: true, //metodos de conexão mais estavel
    useUnifiedTopology: true, 
})
.then (() => console.log('conectado ao DB'))
.catch(err => console.error('Erro ao conectar ao DB', err));

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000'); //inicia servidor na porta 5000
});

