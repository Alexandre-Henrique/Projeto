import { response } from 'express';
import React, {useState, useEffect} from 'react'; // hooks do React para gerenciar estado e efeito colateral, como chamadas de API.

function TaskList(){
    const [tasks, setTasks] = useState([]);

    useEffect(()    => {
        fetch ('http://localhost:5000/api/tasks') // faz uma requisição GET para API e obtém a lista de tarefas
            .then(response => response.json())
            .then(data => setTasks(data)); // atualiza o estado 'tasks' com dados recebidos da API

    },[]);

    return (
        <div>
            <h2>Lista de Tarefas</h2>
                <ul>
                    {tasks.map(task =>( // Renderiza cada tarefa como um item de lista
                        <li key={task._id}>{task.title}</li>
                    ))}
                </ul>
        </div>
    );
}

export default TaskList;