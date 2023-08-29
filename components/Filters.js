
import React from 'react';

function Filters({ setFilter, setSort }) {
  return (
    <div className="child_childBox__I9yMt child_title__19SEz child_link__19Afq child_item__1sVuh child_childBox__I9yMt">
      <input 
        type="text" 
        placeholder="Filter by publisher..." 
        onChange={(e) => setFilter(e.target.value)} 
      />
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="rating">Sort by Rating</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>
  );
}

export default Filters;
