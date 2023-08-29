
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';
import Filters from './Filters';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    axios.get('https://api.example.com/books')  // This should be the real API endpoint
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  const filteredBooks = books
    .filter(book => book.publisher.includes(filter))
    .sort((a, b) => {
      if (sort === 'rating') {
        return b.rating - a.rating;
      } else {
        return a.price - b.price;
      }
    });

  if (loading) return <div className="child_childBox__I9yMt child_title__19SEz child_link__19Afq child_item__1sVuh child_childBox__I9yMt">Loading...</div>;

  useEffect(() => {
        // Simulate checking for connectivity
        const isConnected = navigator.onLine;
        dispatch(setConnectivity(isConnected));

        if (!isConnected) {
            dispatch(setError("No internet connection."));
            dispatch(setLoading(false));
        } else {
            // TODO: Fetch the data from the API and update the state
            // For now, we'll simulate an API call with a timeout
            dispatch(setLoading(true));
            setTimeout(() => {
                // Simulate success
                dispatch(setLoading(false));
                // Set books data
            }, 2000);
        }
    }, [dispatch]);

    if (loading) {
        return <div className="child_childBox__I9yMt child_title__19SEz child_link__19Afq child_item__1sVuh child_childBox__I9yMt">Loading...</div>;
    }

    if (error) {
        return <div className="child_childBox__I9yMt child_title__19SEz child_link__19Afq child_item__1sVuh child_childBox__I9yMt">Error: {error}</div>;
    }

    
    let filteredBooks = books;
    if (filter) {
        filteredBooks = filteredBooks.filter(book => book.publisher.toLowerCase().includes(filter.toLowerCase()));
    }
    
    if (sort) {
        const [criteria, order] = sort.split('-');
        filteredBooks = filteredBooks.sort((a, b) => {
            if (order === 'asc') {
                return a[criteria] - b[criteria];
            } else {
                return b[criteria] - a[criteria];
            }
        });
    }
return (
    <div className="child_childBox__I9yMt child_title__19SEz child_link__19Afq child_item__1sVuh child_childBox__I9yMt">
      <Filters setFilter={setFilter} setSort={setSort} />
      <ul>
        {filteredBooks.map(book => <BookItem key={book.id} book={book} />)}
      </ul>
    </div>
  );
}

export default BookList;
