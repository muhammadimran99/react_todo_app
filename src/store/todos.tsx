import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  type: string;
  dueDate: string;
  dueTime: string;
  startTime: string;
  stopTime: string;
  taskStatus: string;
  history: TodoHistoryEntry[];
};

export type TodoHistoryEntry = {
  action: string; // e.g., "Created", "Started", "Stopped", "Completed"
  timestamp: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddToDo: (newTodo: Todo) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  startTask: (id: string) => void;
  stopTask: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvideer = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (error) {
      return [];
    }
  });

  const handleAddToDo = (newTodo: Todo) => {
    setTodos((prev) => {
      const { task, type, dueDate, dueTime } = newTodo;
      const createdAt = new Date();
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          type,
          dueDate,
          dueTime,
          completed: false,
          createdAt,
          startTime: "",
          stopTime: "",
          taskStatus: "",
          history: [{ action: "Created", timestamp: createdAt }],
        },
        ...prev,
      ];

      console.log("my previous " + prev);
      console.log(newTodos);

      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // mark compelted
  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // delete the indivisual data
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };
  const startTask = (id: string) => {
    setTodos((prev) => {
      const startTime = new Date();
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = {
            ...todo,
            startTime,
            taskStatus: "started",
          };
          if (!updatedTodo.history) {
            updatedTodo.history = []; 
          }
          updatedTodo.history.push({ action: "Started", timestamp: startTime });
          return updatedTodo;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };
  
  const stopTask = (id: string) => {
    setTodos((prev) => {
      const stopTime = new Date();
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = {
            ...todo,
            stopTime,
            taskStatus: "stopped",
          };
          if (!updatedTodo.history) {
            updatedTodo.history = []; 
          }
          updatedTodo.history.push({ action: "Stopped", timestamp: stopTime });
          return updatedTodo;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };
  

  return (
    <todosContext.Provider
      value={{
        todos,
        handleAddToDo,
        toggleTodoAsCompleted,
        handleDeleteTodo,
        startTask,
        stopTask,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

// consumer
export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos used outside of Provider");
  }
  return todosConsumer;
};
