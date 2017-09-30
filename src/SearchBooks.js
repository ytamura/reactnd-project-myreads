import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    searchResults: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired
  };

  render() {
    const {query, searchResults, updateQuery, updateShelf} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"/>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              placeholder="Search by title or author"
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
        </div>
        <BookShelf books={searchResults} updateShelf={updateShelf}/>
      </div>
    )
  }
}

export default SearchBooks