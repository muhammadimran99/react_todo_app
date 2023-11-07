import AddToDo from "./components/addtodo"
import Navbar from "./components/navbar"
import Todos from "./components/todos"
import Sidebar from "./components/SIdebar"
import "./App.css"

const App = () => {
  return (
    <>
    <Sidebar />
    <main>
      <h1>Welcome To Todo-App </h1>
      <Navbar />
      <AddToDo />
      <Todos />
    </main>
    </>
  )
}

export default App