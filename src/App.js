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

// Fetch all books and set state at load 
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({
          books: books
        })
    })
  }

//sehlf update function ehich updates the selectced book with new shelf value
  shelfUpdate = (currbook, newShelf) => {
    const availableBooks = this.state.books;
    BooksAPI.update(currbook, newShelf)
          .then((response) => {               
              let otherBooks = availableBooks.filter(allbooks => 
                       {return allbooks.shelf !== newShelf && allbooks.id !== currbook.id});
              currbook.shelf = newShelf;
              let filteredBooks = availableBooks.filter(allbooks => 
                        {return allbooks.shelf === currbook.shelf && allbooks.id !== currbook.id}).concat([currbook]);
              let newBookSet = filteredBooks.concat(otherBooks)
              this.setState({books:newBookSet});
      })
}

// defining routes '/' to main page and '/search' to search page
  render() {
    return  (
       <div className="MyReadsApp">
          <Route exact path="/" render={() => (
              <ListOfBooksComponent 
                  books={this.state.books} 
                  shelfUpdate={this.shelfUpdate}
                  />
              )}
          />

          <Route path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              shelfUpdate={this.shelfUpdate}
            />
            )}
          />
        </div>    
    )
  }
}

export default BooksApp