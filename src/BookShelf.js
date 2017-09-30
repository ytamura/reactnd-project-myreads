import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {
  static propTypes = {
     books: PropTypes.array.isRequired,
     updateShelf: PropTypes.func.isRequired,
     title: PropTypes.string
  };

  render() {
    const {books, updateShelf, title} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) =>
                <Book
                  key={book.id}
                  book={book}
                  updateShelf={updateShelf}
                />
              )}
            </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;