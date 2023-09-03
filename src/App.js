
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksList from './components/BooksList';

function App() {
  useEffect(() => {
    setTimeout(() => {
      const loadingElement = document.querySelector('.countiner');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    }, 2000);  // hide after 2 seconds
  }, []);

  return (
    <div className="App">
      <div className="countiner">
        <div className="circle-cont">
          <div className="circel"></div>
        </div>
        ...
        <div className="circle-cont">
          <div className="circel"></div>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<BooksList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
