import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksList from './components/BooksList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<BooksList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
