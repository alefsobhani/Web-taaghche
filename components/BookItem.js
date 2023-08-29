
import React from 'react';
import { Link } from 'react-router-dom';

function BookItem({ book }) {
  return (
    <li>
      <Link to={\`/book/\${book.id}\`}>
        <img src={book.coverUri} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.authors.join(', ')}</p>
        <p>{book.price}</p>
        <p>{book.rating}</p>
      </Link>
    </li>
  );
}

export default BookItem;
