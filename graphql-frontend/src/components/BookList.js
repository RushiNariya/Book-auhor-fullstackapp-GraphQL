import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';
// import { compose, graphql } from 'react-apollo';

function BookList() {
  const { data, loading } = useQuery(getBooksQuery);
  // console.log(data, loading);

  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading Books...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => {
              setSelected(book.id);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;

// export default graphql(getBooksQuery)(BookList);
