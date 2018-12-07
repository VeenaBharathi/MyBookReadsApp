import React from 'react'
import SingleBookItemComponent from './SingleBookItemComponent'
import './App.css'

class ShelfComponent extends React.Component {

    render(){
    	 let getBooks = this.props.books;
         let shelfName = this.props.shelfName;
    	 const updateShelf = this.props.updateShelf;

    	 return( 
    	 	<div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfName}</h2>
                  <div className="bookshelf-books">
	                    <ol className="books-grid">
	                    	
							{
								getBooks.map((b) => {
									return (
										<SingleBookItemComponent
											book={b}
											key={b.id}
											updateShelf={updateShelf}
										/>
									)
								})
							}
						 		
	                    </ol>
                   </div>
             </div>   
             )   
    }
}

export default ShelfComponent