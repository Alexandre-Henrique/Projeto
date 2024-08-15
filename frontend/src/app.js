import React, { useState } from 'react';  // Importa o React e o hook useState para gerenciar estado
import TaskList from './components/TaskList';  // Importa o componente TaskList que exibe a lista de tarefas
import TaskForm from './components/TaskForm';  // Importa o componente TaskForm que permite adicionar novas tarefas

const App = () => {
    const [tasks, setTasks] = useState([]);  // Define um estado para armazenar a lista de tarefas

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);  // Atualiza o estado 'tasks' adicionando a nova tarefa à lista existente
    };

    return (
        <div>
            <h1>Gerenciador de Tarefas</h1> 
            <TaskForm onTaskAdded={handleTaskAdded} /> 
            <TaskList tasks={tasks} />
        </div>
    );
};

export default App;  // Exporta o componente App como padrão
