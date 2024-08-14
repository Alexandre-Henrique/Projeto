const mongoose = require ('mongoose'); //importa o mongoose para interagir com o MongoDB

const TaskSchema = new mongoose.Schema({ // define esquema para uma tarefa, especificação de campos e seus tipos
    titulo: {type: String, required: true},
    descricao: {type: String},
    status: {type: String, default: 'pendente'},
    data: {type: Date, default: Date.now},
});
module.exports	=  mongoose.model('task', TaskSchema); // exporta o modelo 'task' e permite interagir com a coleção 'tasks' no Mongo