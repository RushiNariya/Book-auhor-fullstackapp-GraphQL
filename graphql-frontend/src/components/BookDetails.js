import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
  const { data } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });

  console.log(props);
  // const { book, loading } = data;

  // useEffect(() => {}, [book, loading]);

  console.log(data);

  const displayBookDetails = () => {
    if (props.bookId && data !== undefined) {
      const { book } = data;
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else if (props.bookId && data === undefined) {
      return <div>Loading...</div>;
    } else {
      return <div> No Book selected.</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
}

export default BookDetails;
