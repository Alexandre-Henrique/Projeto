import React, { useState } from 'react';  // Importa o React e o hook useState para gerenciar o estado do formulário

const TaskForm = ({ onTaskAdded }) => {  // Componente TaskForm recebe uma função 'onTaskAdded' como prop
    const [title, setTitle] = useState('');  // Define o estado inicial para o título da tarefa
    const [description, setDescription] = useState('');  // Define o estado inicial para a descrição da tarefa

    const handleSubmit = async (e) => {
        e.preventDefault();  // Previne o comportamento padrão do formulário de recarregar a página

        try {
            const response = await fetch('http://localhost:3001/api/tasks', {
                method: 'POST',  // Faz uma requisição POST para criar uma nova tarefa
                headers: {
                    'Content-Type': 'application/json'  // Define que os dados estão sendo enviados em formato JSON
                },
                body: JSON.stringify({ title, description })  // Envia o título e a descrição como corpo da requisição
            });

            const newTask = await response.json();  // Converte a resposta da API em JSON
            onTaskAdded(newTask);  // Chama a função onTaskAdded passando a nova tarefa, para atualizar a lista de tarefas
            setTitle('');  // Limpa o campo de título do formulário
            setDescription('');  // Limpa o campo de descrição do formulário
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);  // Se houver um erro, exibe-o no console
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título</label>  
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}  // Atualiza o estado 'title' quando o usuário digita no campo
                    required
                />
            </div>
            <div>
                <label>Descrição</label>  
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}  // Atualiza o estado 'description' quando o usuário digita no campo
                />
            </div>
            <button type="submit">Adicionar Tarefa</button>  
        </form>
    );
};

export default TaskForm;  // Exporta o componente TaskForm para ser utilizado em outras partes do projeto
