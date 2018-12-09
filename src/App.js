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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({
          books: books
        })
    })
  }

  updateShelf = (book, newShelf) => {
    const availableBooks = this.state.books;
    BooksAPI.update(book, newShelf)
          .then((response) => {               
              let otherBooks = availableBooks.filter(allbooks => 
                       {return allbooks.shelf !== newShelf && allbooks.id !== book.id});
              book.shelf = newShelf;
              let filteredBooks = availableBooks.filter(allbooks => 
                        {return allbooks.shelf === book.shelf && allbooks.id !== book.id}).concat([book]);
              let newBookSet = filteredBooks.concat(otherBooks)
              this.setState({books:newBookSet});
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