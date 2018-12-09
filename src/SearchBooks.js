import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import SingleBookItemComponent from './SingleBookItemComponent'
import './App.css'

class SearchBooks extends React.Component {

  //state variables for search page
  state = {
    books: [],
    searchVal: '',
    results: []
  }

  //search books based on query function which is triggered when input box value changes
  bookSearch(){
    let searchValue = this.state.searchVal;
    var resultBooks;
     if(searchValue === '' || searchValue === undefined){
        return this.setState({results: []})
      }

      else{

          BooksAPI.search(searchValue.trim())
          .then((response) => {
                if(response.error){
                    this.setState({results: []})
                }
                else{
                      response.forEach(book => {
                        let allBooks = this.state.books;
                        resultBooks = allBooks.filter(eachbook => eachbook.id === book.id);  

                         if(resultBooks.length === 1) {
                              book.shelf = resultBooks[0].shelf 
                          }
                          else{
                            book.shelf = 'none';
                          }
                      return this.setState({results: response})
                      });
                }
          })
      }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

 
  render (){
    const updateShelf = this.props.updateShelf;
      
      
    return(
      <div>
        <div className="search-books">
            <div className="search-books-bar">
              <Link to = '/' className="close-search"> Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                value = {this.state.searchVal} 
                onChange={(e) => this.setState({searchVal: e.target.value}, this.bookSearch)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                    this.state.results.map(b => 
                        <SingleBookItemComponent
                            key={b.id}
                            book={b}
                            updateShelf={updateShelf}
                      />
                      )      
                }
              </ol>
            </div>
          </div>
      </div>
      )
    }
  }

  export default SearchBooks