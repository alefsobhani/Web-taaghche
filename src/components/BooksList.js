<link rel="stylesheet" type="text/css" href="../styles/1.css" />
import React, { useState, useEffect } from 'react';
import mockData from '../mockData.json';
import '../App.css';  // Importing the styles

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setTimeout(() => {
            const cachedBooks = localStorage.getItem('booksData');
            if (cachedBooks) {
                setBooks(JSON.parse(cachedBooks));
                setLoading(false);
            } else {
                if (navigator.onLine) {
                    setBooks(mockData.books);
                    // Cache the books data
                    localStorage.setItem('booksData', JSON.stringify(mockData.books));
                    setLoading(false);
                } else {
                    setError("No internet connection");
                    setLoading(false);
                }
            }
        }, 2000);
    }, []);

    const [sortType, setSortType] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredBooks = filter 
        ? books.filter(book => book.publisher.toLowerCase().includes(filter.toLowerCase()))
        : books;

    let sortedBooks = [...filteredBooks];
    if (sortType === 'price') {
        sortedBooks.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (sortType === 'rating') {
        sortedBooks.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);
    }

    const [visibleBooksCount, setVisibleBooksCount] = useState(30);  // Initial number of books to display

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && visibleBooksCount < filteredBooks.length) {
            setVisibleBooksCount(visibleBooksCount + 10);  // Load 10 more books
        }
    };

    useEffect(() => {
        const booksListContainer = document.getElementById('books-list-container');
        booksListContainer && booksListContainer.addEventListener('scroll', handleScroll);
        return () => booksListContainer && booksListContainer.removeEventListener('scroll', handleScroll);
    }, [visibleBooksCount, filteredBooks]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div>
            <div className="filter-section">
                <div className="sort-section">
                    <label>Sort by: </label>
                    <select className="form-control" onChange={handleSortChange}>
                        <option value="">Select...</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                    <select className="form-control" onChange={handleSortOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <input className="form-control" 
                    type="text" 
                    placeholder="Filter by Publisher" 
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => setFilter("")}>Clear Filter</button>
            </div>
            <div className="books-list">
                {filteredBooks.slice(0, visibleBooksCount).map(book => (
                    <div key={book.id} className="book-item">
                        <img src={book.coverUri} alt={book.title} className="book-cover" />
                        <h2>{book.title}</h2>
                        <p>{book.authors.join(', ')}</p>
                        <p>{book.price} $</p>
                        <p>{'⭐'.repeat(book.rating)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BooksList;
