import './App.css';
import { AppContent } from './components';
import { TaskProvider } from './components';

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
