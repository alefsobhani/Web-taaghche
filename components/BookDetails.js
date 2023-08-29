
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookDetails({ match }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(\`https://api.example.com/books/\${match.params.id}\`)  // This should be the real API endpoint
      .then(response => {
        setBook(response.data);
      })
      .catch(error => console.error(error));
  }, [match.params.id]);

  if (!book) return <div className="child_childBox__I9yMt child_title__19SEz child_link__19Afq child_item__1sVuh child_childBox__I9yMt">Loading...</div>;

  return (
    <div className="child_childBox__I9yMt child_title__19SEz child_link__19Afq child_item__1sVuh child_childBox__I9yMt">
      <img src={book.coverUri} alt={book.title} />
      <h2>{book.title}</h2>
      <p>{book.authors.join(', ')}</p>
      <p>{book.price}</p>
      <p>{book.rating}</p>
      <p>{book.publisher}</p>
      <p>{book.physicalPrice}</p>
      <p>{book.numberOfPages}</p>
      <p>{book.description}</p>
      <a href={\`https://taaghche.com/book/\${book.id}\`}>جزئیات بیشتر</a>
      <button onClick={() => window.alert('Share this book!')}>اشتراک گذاری</button>
    </div>
  );
}

export default BookDetails;

function shareBookDetails(bookId) {
    const bookLink = `https://taaghche.com/book/${bookId}`;
    navigator.clipboard.writeText(bookLink).then(function() {
        alert('Link copied to clipboard!');
    }).catch(function(err) {
        alert('Could not copy link: ', err);
    });
}
