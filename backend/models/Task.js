const { DataTypes } = require('sequelize');  // Importa DataTypes, que define os tipos de dados das colunas no banco de dados
const sequelize = require('../config/database');  // Importa a configuração do banco de dados que criado

const Task = sequelize.define('Task', {  // Define um modelo chamado 'Task' que representa a tabela 'tasks' no banco de dados
    title: {
        type: DataTypes.STRING,  // A coluna 'title' será uma string
        allowNull: false  // Esta coluna é obrigatória, não pode ser nula
    },
    description: {
        type: DataTypes.TEXT,  // A coluna 'description' será um texto mais longo
    },
    status: {
        type: DataTypes.STRING,  // A coluna 'status' será uma string
        defaultValue: 'pendente'  // Se não for informado, o status padrão será 'pendente'
    },
    date: {
        type: DataTypes.DATE,  // A coluna 'date' será uma data
        defaultValue: DataTypes.NOW  // Se não for informada, a data padrão será a data e hora atuais
    }
}, {
    tableName: 'tasks'  // Especifica que o nome da tabela no banco de dados será 'tasks'
});

module.exports = Task;  // Exporta o modelo Task para ser utilizado em outras partes do projeto
