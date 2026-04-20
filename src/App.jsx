import Board from "./components/Board"
import { TaskProvider } from "./contexts/TaskContext"

function App() {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  )
}

export default App