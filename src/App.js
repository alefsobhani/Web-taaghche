<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
=======
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import "./responsive_design_template.css";

const App = () => {
    const [sortOrder, setSortOrder] = useState('asc'); 
    const [bookOffset, setBookOffset] = useState(0); 
    const filteredBooks = []; 
    const sortType = ''; 

    const advancedSortedBooks = useMemo(() => {
        let booksToSort = [...filteredBooks];
        switch (sortType) {
            case 'price':
                booksToSort.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
                break;
            case 'rating':
                booksToSort.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);
                break;
            default:
                break;
        }
        return booksToSort.slice(0, bookOffset);
    }, [filteredBooks, sortType, sortOrder, bookOffset]);

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const loadMoreBooks = () => {
        setBookOffset(prevOffset => prevOffset + 5);
    };

    const cachedBooks = [];
    useEffect(() => {
        localStorage.setItem('cachedBooks', JSON.stringify(cachedBooks));
    }, []);

    return (
        <Router>
            <div>
                <select value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <Switch>
                    <Route path="/" exact component={BookList} />
                    <Route path="/book/:id" component={BookDetails} />
                </Switch>
                {advancedSortedBooks.map(book => (
                    // Render each book.
                ))}
                <button onClick={loadMoreBooks}>Load More</button>
            </div>
        </Router>
    );
};
>>>>>>> edb1d02de1a0cd3c873b299e8962ce702d30c7c0

export default App;
