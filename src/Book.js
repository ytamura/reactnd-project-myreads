import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
     book: PropTypes.object.isRequired,
     updateShelf: PropTypes.func.isRequired
  };

  render() {
    const {book, updateShelf} = this.props;

    let bookCoverStyle = {};
    try {
      bookCoverStyle = {
        width: 128,
        height: 193,
        backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')'
      };
    } catch(err) {
      /* Book with id Mv_LHAAACAAJ throws this error */
      bookCoverStyle = {
        width: 128,
        height: 193,
        border: 1 
      };
    }

    let authors = 'unknown';
    if (book.authors) {
      authors = book.authors.join(', ');
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={bookCoverStyle}>
            </div>
            <div className={"book-shelf-changer book-shelf-changer-" + book.shelf}>
              <select 
                value={book.shelf}
                onChange={(event) => updateShelf(book, event.target.value)}
              >
                <option value="na" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Already Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    )
  }
}

export default Book