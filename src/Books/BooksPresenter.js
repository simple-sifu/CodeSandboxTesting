import booksRepository from "./BooksRepository.js";

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name };
      });
      callback(booksVm);
    });
  };

  addBook = async (bookVm) => {
    const bookPm = {
      name: bookVm.name,
      author: bookVm.author,
    };
    const response = await booksRepository.addBook(bookPm);
    return response;
  };
}
