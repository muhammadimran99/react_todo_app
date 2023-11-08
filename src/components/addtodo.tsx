import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";
import "./addtodo.css"

const AddToDo = () => {
    const [todo, setTodo] = useState("");
    const [type, setType] = useState("Recurring"); // Default value
    const [dueDate, setDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");
    const { handleAddToDo } = useTodos();

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTodo = {
          task: todo,
          type,
          dueDate,
          dueTime,
      };
        handleAddToDo(newTodo);
        setTodo("");
        setType("Recurring");
        setDueDate("");
        setDueTime("");

    };

    return (
      <div className="addTodo">
        <form onSubmit={handleFormSubmit}>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Recurring">Recurring</option>
                <option value="Daily">Daily</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} />
            <button type="submit">Add</button>
        </form>
        </div>
    );
};

export default AddToDo;
