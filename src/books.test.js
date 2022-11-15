import BooksPresenter from "./Books/BooksPresenter";
import httpGateway from "./Shared/HttpGateway";

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

it("should confirm that we can load 3 model books and hit backend", async () => {
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
  let booksPresenter = new BooksPresenter();
  const response = await booksPresenter.addBook(requestBodyDto);

  expect(httpGateway.get).toHaveBeenCalledWith(
    "https://api.logicroom.co/api/tommy.han.cs@gmail.com/books"
  );
  expect(response.success).toBe(true);
});
