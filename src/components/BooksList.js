
import React, { useState, useEffect, useRef } from 'react';
import mockData from '../mockData.json';

const BooksList = ({ filter, sort }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (offset >= mockData.books.length) {
                setHasMore(false);
                setLoading(false);
                return;
            }
            const newBooks = mockData.books.slice(offset, offset + 5);
            setBooks(prevBooks => [...prevBooks, ...newBooks]);
            setOffset(prevOffset => prevOffset + 5);
            setLoading(false);
        }, 2000);
    }, [offset]);

    // This is a mock error for demonstration purposes
    useEffect(() => {
        if (books.length > 10 && !error) {
            setError("Mock network error after loading 10 books.");
        }
    }, [books, error]);

    let displayedBooks = books;

    // Filter books based on publisher
    if (filter) {
        displayedBooks = displayedBooks.filter(book => book.publisher.toLowerCase().includes(filter.toLowerCase()));
    }

    // Sort books based on selected option
    if (sort === 'rating') {
        displayedBooks = displayedBooks.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'price') {
        displayedBooks = displayedBooks.sort((a, b) => parseFloat(a.price.slice(0, -1)) - parseFloat(b.price.slice(0, -1)));
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && displayedBooks.map(book => (
                <div key={book.id} className="book-item container">
                    <img src={book.coverUri} alt={book.title} className="book-cover" />
                    <h2>{book.title}</h2>
                    <p>{book.authors.join(', ')}</p>
                    <p>{book.price}</p>
                    <p>{Array(book.rating).fill('⭐').join('')}</p>
                </div>
            ))}
            {hasMore && !loading && <div ref={bottomRef}>Loading more...</div>}
        </div>
    );
};

export default BooksList;
