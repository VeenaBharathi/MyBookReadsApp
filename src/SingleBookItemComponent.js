import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class SingleBookItemComponent extends React.Component {

  
    render(){

      const currBook = this.props.book;
      const shelfUpdate = this.props.shelfUpdate;
      
      return (
       <li>
            <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 174, 
                              backgroundImage: `url("${currBook.imageLinks.thumbnail} || ''}")` }}></div>
                            <div className="book-shelf-changer">
                              <select value={currBook.shelf } onChange={(event) => {
                     shelfUpdate(currBook, event.target.value);
                                }}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{currBook.title}</div>
                          <div className="book-authors">
                              {currBook.authors || 'No author listed for the book'}
                          </div>
                        </div>
      </li>
        )
    }

}

export default SingleBookItemComponent