import React from 'react';

const BookDetails = ({ book }) => {
    return (
        <div className='book-details'>
            <img src={book.coverUri} alt={book.title} className='book-cover' />
            <div className='book-title'>{book.title}</div>
            <div className='book-authors'>{book.authors.join(', ')}</div>
            <div className='book-price'>{book.price}</div>
            <div className='book-rating'>{book.rating}</div>
            <div className='book-publisher'>{book.publisher}</div>
            <div className='book-physicalPrice'>{book.physicalPrice}</div>
            <div className='book-numberOfPages'>{book.numberOfPages}</div>
            <div className='book-description'>{book.description}</div>
            <a href={`https://taaghche.com/book/${book.id}`} className="more-details">More Details</a>
            <button className="share-button">Share</button>
        </div>
    );
};

export default BookDetails;
