import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    searchResults: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      /* Update book in main view */
      let books = this.state.books;
      let existingBook = books.filter((b) => b.id === book.id);

      if (existingBook.length === 1) {
        /* Just change the shelf */
        existingBook[0].shelf = shelf;
        this.setState({books: books});
      } else {
        /* Add to books if new */
        book.shelf = shelf;
        this.setState((state) => ({
          books: state.books.concat([book])
        }));
      }

      /* Also update search results */
      let searchResults = this.state.searchResults;
      let existingResult = books.filter((b) => b.id === book.id);

      if (existingResult.length === 1) {
        /* Just change the shelf */
        existingResult[0].shelf = shelf;
        this.setState({searchResults: searchResults});
      }
    })
  }

  updateQuery = (query) => {
    const { books } = this.state;

    this.setState({query: query});
    query = query.trim();
    if (query) {
      BooksAPI.search(query, 20).then((searchResults) => {
        if (searchResults.length > 0) {
          searchResults.map(book => {
            let existingBook = books.filter((b) => b.id === book.id);
            if (existingBook.length === 1) {
              book.shelf = existingBook[0].shelf;
            } else {
              book.shelf = 'none';
            }
          })
          this.setState({searchResults: searchResults});
        }
      })
    } else {
      this.setState({searchResults: []});
    }
  }

  render() {
    const { books, query, searchResults} = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            query={query}
            searchResults={searchResults}
            updateQuery={this.updateQuery}
            updateShelf={this.updateShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
