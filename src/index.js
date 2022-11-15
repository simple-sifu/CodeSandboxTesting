import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

import "./styles.css";

function App() {
  const booksPresenter = new BooksPresenter();
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);
  const bookNameRef = useRef(null);
  const authorRef = useRef(null);

  React.useEffect(() => {
    async function load() {
      await booksPresenter.load((viewModel) => {
        copyViewModelToStateViewModel(viewModel);
      });
    }
    load();
  }, []);

  const handleSubmit = async () => {
    const viewModel = {
      name: bookNameRef.current.value,
      author: authorRef.current.value,
    };
    await booksPresenter.addBook(viewModel);
  };

  return (
    <div>
      <h2>Books</h2>
      {stateViewModel.map((book, i) => {
        return <div key={i}>{book.name}</div>;
      })}
      <h4>Add Books</h4>
      <label></label>
      <form onSubmit={handleSubmit}>
        <label>
          bookName:
          <input type="text" ref={bookNameRef} />
        </label>
        <br />
        <label>
          author:
          <input type="text" ref={authorRef} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
