<link rel="stylesheet" type="text/css" href="../styles/1.css" />
import React from 'react';
import mockData from '../mockData.json';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const book = mockData.books.find(b => b.id === parseInt(id));

  const handleShare = () => {
    // In a real environment, we can use the Web Share API
    // navigator.share({ title: book.title, url: book.url });
    alert(`Sharing book: ${book.title}`);
  };

  return (
    <div className="book-details container">;
      <img src={book.coverUri} alt={book.title} className="book-cover" />;
      <h2>{book.title}</h2>;
      <p>{book.authors.join(', ')}</p>;
      <p>{book.price}</p>;
      <p>{Array(book.rating).fill('⭐').join('')}</p>;
      <p>Publisher: {book.publisher}</p>;
      <p>Physical Price: {book.physicalPrice}</p>;
      <p>Number of Pages: {book.numberOfPages}</p>;
      <p>Description: {book.description}</p>;
      <button onClick={handleShare}>Share</button>;
      <a href={book.url} target="_blank" rel="noopener noreferrer">More Details</a>;
    </div>;
  );
};

export default BookDetails;
