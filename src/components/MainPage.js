
import React, { useState } from 'react';
import BooksList from './BooksList';

const MainPage = () => {
    const [publisherFilter, setPublisherFilter] = useState('');
    const [sortOption, setSortOption] = useState('');  // Can be 'rating' or 'price'

    return (
        <div>
            <div>
                <label>Filter by Publisher:</label>
                <input 
                    type="text" 
                    value={publisherFilter} 
                    onChange={(e) => setPublisherFilter(e.target.value)} 
                />
                <button onClick={() => setPublisherFilter('')}>Clear Filter</button>
            </div>
            <div>
                <label>Sort by:</label>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">None</option>
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <BooksList filter={publisherFilter} sort={sortOption} />
        </div>
    );
};

export default MainPage;
