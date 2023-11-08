import { useState } from "react";
import { useTodos } from "../store/todos";
import { useSearchParams } from "react-router-dom";
import "./Todos.css";

const Todos = () => {
  const {
    todos,
    toggleTodoAsCompleted,
    handleDeleteTodo,
    stopTask,
    startTask,
  } = useTodos();
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todos");

  const [taskStatus, setTaskStatus] = useState({});

  const handleStartTask = (taskId) => {
    startTask(taskId);
    setTaskStatus({ ...taskStatus, [taskId]: "started" });
  };

  const handleStopTask = (taskId) => {
    stopTask(taskId);
    setTaskStatus({ ...taskStatus, [taskId]: "stopped" });
  };

  let filterData = todos;

  if (todosData === "active") {
    filterData = filterData.filter((task) => !task.completed);
  }

  if (todosData === "completed") {
    filterData = filterData.filter((task) => task.completed);
  }

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Type</th>
          <th>Due Date</th>
          <th>Due Time</th>
          <th>Start Time</th>
          <th>Stop Time</th>
          <th>Status</th>
          <th>History</th>
          <th>Time Spend</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filterData.map((todo) => {
          return (
            <tr key={todo.id}>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoAsCompleted(todo.id)}
                  />
                  {todo.task}
                </label>
              </td>
              <td>{todo.type}</td>
              <td>{todo.dueDate}</td>
              <td>{todo.dueTime}</td>
              <td>{todo.startTime ? todo.startTime.toLocaleString() : ""}</td>
              <td>{todo.stopTime ? todo.stopTime.toLocaleString() : ""}</td>
              <td>{todo.taskStatus}</td>
              <td>{}</td>
              <td>
                {todo.history && todo.history.length > 0 ? (
                  <ol>
                    {todo.history.map((entry, index) => (
                      <li key={index}>
                        {entry.action} -{" "}
                        {entry.timestamp
                          ? entry.timestamp.toLocaleString()
                          : ""}
                      </li>
                    ))}
                  </ol>
                ) : null}
              </td>
              <td>
                {todo.completed ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                ) : taskStatus[todo.id] === "started" ? (
                  <button
                    type="button"
                    onClick={() => handleStopTask(todo.id)}
                    className={`stop ${
                      taskStatus[todo.id] === "stopped" ? "hidden" : ""
                    }`}
                  >
                    Stop
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartTask(todo.id)}
                    className={`start ${
                      taskStatus[todo.id] === "started" ? "hidden" : ""
                    }`}
                  >
                    Start
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Todos;
