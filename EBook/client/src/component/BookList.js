import React, { useState } from 'react';
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <div className="book-image-container">
            <img
              src={book.image}
              alt={book.title}
              className="book-image"
            />
            <div className="book-description">
              {book.description}
            </div>
          </div>
          <div className="book-info">
            <strong>{book.authors.join(', ')}</strong> - {book.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
