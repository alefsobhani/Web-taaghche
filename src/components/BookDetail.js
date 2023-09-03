
import React from 'react';
import '../App.css';  // Importing the styles;

const BookDetail = ({ book }) => {
    if (!book) {
        return <div className="loading">Select a book to see its details...</div>;
    }

    return (
        <div className="book-detail">;
            <img src={book.coverUri} alt={book.title} className="book-cover" />;
            <h2>{book.title}</h2>;
            <p>Authors: {book.authors.join(', ')}</p>;
            <p>Price: {book.price} $</p>;
            <p>Rating: {'⭐'.repeat(book.rating)}</p>;
            <p>Publisher: {book.publisher}</p>;
            <p>Physical Price: {book.physicalPrice} $</p>;
            <p>Number of Pages: {book.numberOfPages}</p>;
            <p>Description: {book.description}</p>;
            <a href={`https://taaghche.com/book/${book.id}`} target="_blank" rel="noopener noreferrer">More Details</a>;
        </div>;
    );
}

export default BookDetail;
