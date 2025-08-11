// frontend/src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToDoPage from './pages/ToDoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

