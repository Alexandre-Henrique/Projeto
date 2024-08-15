const express = require('express');  // Importa o Express, para criar as rotas da API
const router = express.Router();  // Cria um roteador do Express para definir rotas
const Task = require('../models/Task');  // Importa o modelo Task

// Rota para criar uma nova tarefa
router.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);  // Cria uma nova tarefa no banco de dados com base nos dados enviados no corpo da requisição
        res.json(task);  // Retorna a tarefa criada como resposta
    } catch (err) {
        res.status(500).json({ error: err.message });  // Se ocorrer um erro, retorna uma mensagem de erro
    }
});

// Rota para obter todas as tarefas
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();  // Busca todas as tarefas no banco de dados
        res.json(tasks);  // Retorna a lista de tarefas como resposta
    } catch (err) {
        res.status(500).json({ error: err.message });  // Se ocorrer um erro, retorna uma mensagem de erro
    }
});

// Rota para atualizar uma tarefa existente
router.put('/tasks/:id', async (req, res) => {
    try {
        const [updated] = await Task.update(req.body, { where: { id: req.params.id } });  // Atualiza a tarefa com o ID especificado
        if (updated) {
            const updatedTask = await Task.findOne({ where: { id: req.params.id } });  // Se a tarefa foi atualizada, busca a tarefa atualizada
            res.json(updatedTask);  // Retorna a tarefa atualizada como resposta
        } else {
            res.sendStatus(404);  // Se a tarefa não foi encontrada, retorna um status 404 (não encontrado)
        }
    } catch (err) {
        res.status(500).json({ error: err.message });  // Se ocorrer um erro, retorna uma mensagem de erro
    }
});

// Rota para deletar uma tarefa
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id } });  // Deleta a tarefa com o ID especificado
        if (deleted) {
            res.json({ message: 'Tarefa deletada' });  // Se a tarefa foi deletada, retorna uma mensagem de sucesso
        } else {
            res.sendStatus(404);  // Se a tarefa não foi encontrada, retorna um status 404 (não encontrado)
        }
    } catch (err) {
        res.status(500).json({ error: err.message });  // Se ocorrer um erro, retorna uma mensagem de erro
    }
});

module.exports = router;  // Exporta o roteador para ser utilizado em outras partes do projeto
