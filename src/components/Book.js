import React from 'react';

const Book = ({ book }) => {
    return (
        <div className="book">;
            <img src={book.coverUri} alt={book.title} className="book-cover" />;
            <h3>{book.title}</h3>;
            <p>{book.authors.join(', ')}</p>;
            <p>{book.price}</p>;
            <p>{Array(book.rating).fill('⭐').join('')}</p>;
            <a href={`/book/${book.id}`} className="btn-details">Details</a>;
        </div>;
    );
};

export default Book;
