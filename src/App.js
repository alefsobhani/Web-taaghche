
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import MainPage from './components/MainPage';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Book App</h1>
      </div>
      <Router>
        <Switch>
          <Route path="/book/:id">
            <BookDetails />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
