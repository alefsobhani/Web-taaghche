import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [sortType, setSortType] = useState(null);
    const [filterPublisher, setFilterPublisher] = useState('');

    useEffect(() => {
        let tempBooks = [...books];

        if (filterPublisher) {
            tempBooks = tempBooks.filter(book => book.publisher === filterPublisher);
        }

        if (sortType === 'rating') {
            tempBooks.sort((a, b) => b.rating - a.rating);
        } else if (sortType === 'price') {
            tempBooks.sort((a, b) => a.price - b.price);
        }

        setFilteredBooks(tempBooks);
    }, [books, sortType, filterPublisher]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        // Add logic here to fetch more books
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const cachedBooks = localStorage.getItem('books');
        if (cachedBooks) {
            setFilteredBooks(JSON.parse(cachedBooks));
        } else {
            localStorage.setItem('books', JSON.stringify(books));
        }
    }, [books]);

    return (
        <div className='book-list'>
            <div className="filters">
                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                </select>
                <select onChange={(e) => setFilterPublisher(e.target.value)}>
                    <option value="">Filter by Publisher</option>
                    <option value="Publisher1">Publisher1</option>
                    <option value="Publisher2">Publisher2</option>
                </select>
            </div>
            {filteredBooks.map(book => (
                <Link to={`/book/${book.id}`} key={book.id} className='book-item'>
                    <img src={book.coverUri} alt={book.title} className='book-cover' />
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>{book.authors.join(', ')}</div>
                    <div className='book-price'>{book.price}</div>
                    <div className='book-rating'>{book.rating}</div>
                </Link>
            ))}
            <div className="loading">Loading...</div>
            <div className="error">Error fetching data...</div>
        </div>
    );
};

export default BookList;
