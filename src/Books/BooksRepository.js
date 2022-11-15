import httpGateway from "../Shared/HttpGateway.js";
import Observable from "../Shared/Observable";

class BooksRepository {
  programmersModel = null;
  apiUrl = "https://api.logicroom.co/api/pete@logicroom.co/";

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getBooks = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadApiData();
    this.programmersModel.notify();
  };

  addBook = async (bookPm) => {
    const requestDto = {
      name: bookPm.name,
      author: bookPm.author,
    };
    const response = await httpGateway.post(this.apiUrl + "books", requestDto);
    if (response.success) {
      await this.loadApiData();
      this.programmersModel.notify();
    } else {
      console.log("BooksRepository.addBook failed to add a book");
    }
  };

  loadApiData = async () => {
    const booksDto = await httpGateway.get(this.apiUrl + "books");
    this.programmersModel.value = booksDto.result.map((bookDto) => {
      return bookDto;
    });
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
