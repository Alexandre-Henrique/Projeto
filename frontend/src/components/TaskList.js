import React, { useState, useEffect } from 'react';  // Importa o React e os hooks useState e useEffect

const TaskList = () => {
    const [tasks, setTasks] = useState([]);  // Define o estado para armazenar a lista de tarefas

    useEffect(() => {
        fetchTasks();  // Chama a função fetchTasks para buscar as tarefas assim que o componente é montado
    }, []);  // O array vazio indica que o useEffect será executado apenas uma vez, quando o componente for montado

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/tasks');  // Faz uma requisição GET para a API para buscar as tarefas
            const data = await response.json();  // Converte a resposta da API em JSON
            setTasks(data);  // Atualiza o estado 'tasks' com a lista de tarefas recebida
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);  // exibe a mensagem de erro no console
        }
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>  
            <ul>
                {tasks.length > 0 ? (  // Verifica se há tarefas na lista; se sim, renderiza as tarefas
                    tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.status}  
                            <p>{task.description}</p> 
                            <p><em>{new Date(task.date).toLocaleString()}</em></p>  
                        </li>
                    ))
                ) : (
                    <p>Nenhuma tarefa encontrada.</p>  // Se não houver tarefas, exibe esta mensagem
                )}
            </ul>
        </div>
    );
};

export default TaskList;  // Exporta o componente TaskList para ser utilizado em outras partes do projeto
