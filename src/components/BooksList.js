import React, { useState, useEffect } from 'react';
import mockData from '../mockData.json';
import '../App.css';

const LoadingSpinner = () => {
  return <div className="loading-spinner"></div>;
};

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [visibleBooksCount, setVisibleBooksCount] = useState(30);
  const [sortType, setSortType] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setTimeout(() => {
      const cachedBooks = localStorage.getItem('booksData');
      if (cachedBooks) {
        setBooks(JSON.parse(cachedBooks));
        setLoading(false);
      } else {
        if (navigator.onLine) {
          setBooks(mockData.books);
          localStorage.setItem('booksData', JSON.stringify(mockData.books));
          setLoading(false);
        } else {
          setError("No internet connection");
          setLoading(false);
        }
      }
    }, 2000);
  }, []);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;

      if (isBottom && books.length < mockData.books.length) {
        const nextBooks = mockData.books.slice(books.length, books.length + 30);
        setBooks(prevBooks => [...prevBooks, ...nextBooks]);
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll);

    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [books]);

  useEffect(() => {
    const booksListContainer = document.getElementById('books-list-container');
    booksListContainer?.addEventListener('scroll', handleScroll);
    return () => booksListContainer?.removeEventListener('scroll', handleScroll);
  }, [visibleBooksCount]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && visibleBooksCount < filteredBooks.length) {
      setVisibleBooksCount(visibleBooksCount + 10);
    }
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (sortType === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortType === 'rating') {
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });

  const filteredBooks = filter
    ? sortedBooks.filter(book => book.publisher.toLowerCase().includes(filter.toLowerCase()))
    : sortedBooks;

  const handleClearFilter = () => {
    setFilter("");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <div>
        <div className="filter-section">
          <div className="sort-section">
            <label>Sort by:</label>
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
          <input
            className="form-control"
            type="text"
            placeholder="Filter by Publisher"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="btn btn-primary formats_formats__23Hla formats_download__vphPW" onClick={handleClearFilter}>Clear Filter</button>
        </div>
        <div id="books-list-container" className="books-list" onScroll={handleScroll}>
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
    </>
  );
};

export default BooksList;
