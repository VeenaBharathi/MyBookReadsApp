import React from 'react'
import {Link} from 'react-router-dom'
import ShelfComponent from './ShelfComponent'
import './App.css'

class ListOfBooksComponent extends React.Component {

render (){

const books = this.props.books;
const shelfUpdate = this.props.shelfUpdate;

const shelfNames = ['Currently Reading', 'Want To Read', 'Read'];	
	return (
		<div className="list-books">
            <div className="list-books-title">
            		<h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              	<div>


              	 {
              	 	// Repeat for all 3 shelves
               	  shelfNames.map((shelfName) => {

                    var filteredBooks;
               	  	 if(shelfName === "Currently Reading"){
                     filteredBooks = books.filter((book) => {
                        			return book.shelf === "currentlyReading";
                      			})	
                     }
                      else if(shelfName === "Want To Read"){
                     filteredBooks = books.filter((book) => {
                              return book.shelf === "wantToRead";
                            })  
                     }
                      else if(shelfName === "Read"){
                     filteredBooks = books.filter((book) => {
                              return book.shelf === "read";
                            })  
                     }

                    	// return shelf component html for each shelf by passing books with current shelf name
                     return (
                     	<ShelfComponent
                          books={filteredBooks}
                          shelfName={shelfName}
                          key={shelfName}
                          shelfUpdate={shelfUpdate}
                     />
                     )
                 
               	  })
                }

                </div>
            </div>

            <div className="open-search">
              <Link to ="/search"><button/></Link>
            </div>

        </div>      	
		)
}

}

export default ListOfBooksComponent