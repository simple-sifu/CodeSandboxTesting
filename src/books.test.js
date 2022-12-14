import BooksPresenter from "./Books/BooksPresenter";
import httpGateway from "./Shared/HttpGateway";

it("should confirm that we can load 3 model books and hit backend", async () => {
  httpGateway.get = jest.fn().mockImplementation(() => {
    return {
      success: true,
      result: [
        {
          bookId: 18051,
          name: "Wind in the willows",
          ownerId: "tommy.han.cs@gmail.com",
          author: "Kenneth Graeme",
        },
        {
          bookId: 18061,
          name: "I, Robot",
          ownerId: "tommy.han.cs@gmail.com",
          author: "Isaac Asimov",
        },
        {
          bookId: 18071,
          name: "The Hobbit",
          ownerId: "tommy.han.cs@gmail.com",
          author: "Jrr Tolkein",
        },
      ],
    };
  });

  let viewModel = null;
  let booksPresenter = new BooksPresenter();
  await booksPresenter.load((generatedViewModel) => {
    viewModel = generatedViewModel;
  });

  expect(httpGateway.get).toHaveBeenCalledWith(
    "https://api.logicroom.co/api/tommy.han.cs@gmail.com/books"
  );
  expect(viewModel).toHaveLength(3);
  expect(viewModel[0].name).toBe("Wind in the willows");
  expect(viewModel[1].name).toBe("I, Robot");
  expect(viewModel[2].name).toBe("The Hobbit");
});

it("should confirm that we can load 1 book and hit backend", async () => {
  let requestBodyDto = {
    name: "To Kill a Mocking Bird",
    author: "Andy Warhol",
  };

  httpGateway.post = jest.fn().mockImplementation(() => {
    return {
      success: true,
      result: "book created",
    };
  });

  let booksPresenter = new BooksPresenter();
  const response = await booksPresenter.addBook(requestBodyDto);

  expect(httpGateway.post).toHaveBeenCalledWith(
    "https://api.logicroom.co/api/tommy.han.cs@gmail.com/books",
    requestBodyDto
  );
  expect(response.success).toBe(true);
  expect(response.result).toBe("book created");
});
