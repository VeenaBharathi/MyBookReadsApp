import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import SingleBookItemComponent from './SingleBookItemComponent'
import './App.css'

class SearchBooks extends React.Component {

  state = {
    books: [],
    results: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  updateQueryAndSearch = (query) => {
    this.setState(
      {query: query},
      this.searchBasedOnQuery
    )
  }

  searchBasedOnQuery = () => {
    const query = this.state.query;
    if (query === '' || query === undefined) {
      return this.setState({
        results: []
      })
    }

   BooksAPI.search(query.trim())
      .then((response) => {
        if (response.error) {
          return this.setState({
            results: []
          })
        } else {
          response.forEach(b => {
            let match = this.state.books.filter(B => B.id === b.id);
            b.shelf = match[0] ? match[0].shelf : 'none';
         
          });
          return this.setState({
            results: response
          })
        }
      })
  }

  render (){
      const updateShelf = this.props.updateShelf;
      return(
      <div className="app">
        
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search"> Close </Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title"
                  value={this.state.query}
                  onChange={(e) => this.updateQueryAndSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                 {
                  this.state.results.map((book) => {
                    return (
                      <SingleBookItemComponent
                        key={book.id}
                        book={book}
                        updateShelf={updateShelf}
                      />
                    )
                  })
                }
              </ol>
            </div>
          </div>
      </div>
      )
    }
  }

  export default SearchBooks