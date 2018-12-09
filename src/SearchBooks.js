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
    searchResults: []
  }

  //search books based on query function which is triggered when input box value changes
  bookSearch(){
    let searchValue = this.state.searchVal;
    var resultBooks;
    // if user searches for empty string
     if(searchValue === ''){
        return this.setState({searchResults: []})
      }
      // If a valid value is given by user
      else{

          BooksAPI.search(searchValue.trim())
          .then((resp) => {
            // for valid response
              if(!resp.error){
                    resp.forEach(bookInResponse => {
                      let allBooks = this.state.books;
                      // Filtering only the result books among all books in the state
                      resultBooks = allBooks.filter(eachbook => eachbook.id === bookInResponse.id);  
                      //if result length === 0 => The book is not present in one of the shelves, set the shelf name to none
                       if(resultBooks.length !== 1) {
                            bookInResponse.shelf = 'none';
                        }
                        else{
                          // else set shelf name to its original shelf name
                          bookInResponse.shelf = resultBooks[0].shelf 
                        }
                    return this.setState({searchResults: resp})
                    });                   
              }
              else{
                     this.setState({searchResults: []})
              }
          })
      }
  }

// Fetch all books and set state at load 
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      this.setState({books: res})
    })
  }

 
  render (){
    const shelfUpdate = this.props.shelfUpdate;
    const userEnteredInput = this.state.searchVal;
      
    // return search page html by calling bookSearch function when the user input changes
    return(
      <div>
        <div className="search-books">
            <div className="search-books-bar">
              <Link to = '/' className="close-search"> Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title"
                onChange={(e) => {
                  this.setState({searchVal: e.target.value})
                  this.bookSearch()
                }}
                value = {userEnteredInput} 
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

                {
                    this.state.searchResults.map(b => 
                        <SingleBookItemComponent
                            key={b.id}
                            book={b}
                            shelfUpdate={shelfUpdate}
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