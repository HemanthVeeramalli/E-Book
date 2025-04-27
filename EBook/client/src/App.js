import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './component/BookList';
import Stats from './component/Stats';
import './index.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const start = startIndex < 0 ? 0 : startIndex;
      const res = await axios.get('http://localhost:5000/api/books', {
        params: { q: query, limit, startIndex: start },
      });
      setData(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) fetchBooks();
  }, [startIndex, limit]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Book Explorer</h1>
      </header>

      <nav className="search-bar">
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStartIndex(0);
      fetchBooks();
    }}
    className="search-form"
  >
    <input
      type="text"
      placeholder="Search books..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <select
      value={limit}
      onChange={(e) => setLimit(e.target.value)}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
    <button type="submit">Search</button>
  </form>
</nav>


      {loading && <div className="loader"></div>}

      {!loading && data?.books?.length === 0 && (
        <div className="no-results">No books found for "{query}"</div>
      )}

      {!loading && data && data.books.length > 0 && (
        <>
          <BookList books={data.books} />
          <Stats stats={data.stats} total={data.totalItems} />

          <div className="pagination">
            <button
              onClick={() => setStartIndex(Math.max(0, startIndex - limit))}
              disabled={startIndex === 0}
            >
              Previous
            </button>
            <button onClick={() => setStartIndex(startIndex + Number(limit))}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
