import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import "./responsive_design_template.css";

const [sortOrder, setSortOrder] = useState('asc'); 
const [bookOffset, setBookOffset] = useState(0); 

const advancedSortedBooks = useMemo(() => {
    let booksToSort = [...filteredBooks]; // TODO: Define filteredBooks or replace it with the actual data source
    switch (sortType) { // TODO: Define sortType or replace it with the actual sorting criterion
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
}, [filteredBooks, sortType, sortOrder, bookOffset]); // TODO: Define filteredBooks and sortType or update the dependency array

const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
};

const loadMoreBooks = () => {
    setBookOffset(prevOffset => prevOffset + 5);
};

const App = () => {

    useEffect(() => {
        localStorage.setItem('cachedBooks', JSON.stringify(cachedBooks)); // TODO: Define cachedBooks or replace it with the actual data source
    }, [cachedBooks]); // TODO: Define cachedBooks or update the dependency array

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
                    // TODO: Render each book. You need to provide the JSX structure here.
                ))}
                <button onClick={loadMoreBooks}>Load More</button>
            </div>
        </Router>
    );
};

export default App;
