import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container">
      <h3>📝 ToDo App Cande Ferrari</h3>
      <div className="input-field">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button className="btn" onClick={addTask}>Agregar</button>
      </div>
      <ul className="collection">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`collection-item ${task.done ? 'green lighten-4' : ''}`}
          >
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(index)}
              />
              <span className={task.done ? 'grey-text text-darken-2' : ''}>
                {task.text}
              </span>
            </label>
            <button className="btn-flat right red-text" onClick={() => deleteTask(index)}>
              <i className="material-icons">delete</i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
