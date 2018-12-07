import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListOfBooksComponent from './ListOfBooksComponent'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[]
  }

  updateShelf = (currbook, shelf) => {
    BooksAPI.update(currbook, shelf)
            .then((response) => {
                          currbook.shelf = shelf;
                          this.setState((state) => ({
                            books: state.books
                                  .filter((allbooks) => { 
                                        return (allbooks.id !== currbook.id) 
                                       })
                                  .concat([currbook])
                          }))
            })
  }

 componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({
          books: books
        })
    })
  }

  render() {
    return  (

       <div className="MyReadsApp">
          <Route exact path="/" render={() => (
              <ListOfBooksComponent 
                  books={this.state.books} 
                  updateShelf={this.updateShelf}
                  />
              )}
          />

          <Route path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              updateShelf={this.updateShelf}
            />
            )}
          />
        </div>     
  
    )
  }
}

export default BooksApp
