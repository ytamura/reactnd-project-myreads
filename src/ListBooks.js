import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  static propTypes = {
     books: PropTypes.array.isRequired,
     updateShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, updateShelf } = this.props;
    const shelves = [
      {name: 'currentlyReading', title: 'Currently Reading'},
      {name: 'wantToRead', title: 'Want to Read'},
      {name: 'read', title: 'Already Read'}
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) =>
            <BookShelf
              key={shelf.name}
              books={books.filter((book) => book.shelf === shelf.name)}
              updateShelf={updateShelf}
              title={shelf.title}
            />
          )}
        </div>
        <div className="open-search">
          <Link to="/search">+</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks