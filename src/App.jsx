// importa o use state gerenciar o estado (state) de componentes funcionais.
import { useEffect, useState } from "react";
// importa o componente que adiciona as tarefas
import AddTask from "./components/AddTasks";
// importa o componente de lista de tarefas
import Tasks from "./components/Tasks";
// serve para criação de id dinamicos
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     // chama a API
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );
      
  //     // pega os dados que ela retorna
  //     const data = await response.json();

  //     // armazenar ou persistir esses dados no states
  //     setTasks(data)
  //   };
  //   // sequiser chamar a api para pegar as tarefas so descomentar a linha de baixo
  //   // fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // Preciso atulizaressa tarefa
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // Não preciso atualizar essa tarefa
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTasks = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTasks]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>
          Gerenciador de Tarefas
        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
