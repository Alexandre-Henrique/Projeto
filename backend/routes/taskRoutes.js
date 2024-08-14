//rotas para o CRUD

const express = requiere('express');  
const router = express.Router(); //gerenciar rotas
const Task = require('../models/Task');


router.post('/tasks', async (req, res)  =>{ //rota post para nova tarefa
    const task  =  new Task(req.body);
    await task.save();
    res.send(task);
});

router.get('/tasks', async (req, res)   =>{ //rota get para listar tarefas
    const tasks = await Task.find();
    res.send(tasks);
});

router.put('/tasks/:id', async (req, res)   =>{ //rota put para atualizar tarefa
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(task);
});

router.delete('/tasks/:id', async (req, res)    => { //rota delete para excluir tarefa
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: 'Tarefa excluída'});
});

module.exports = router; 