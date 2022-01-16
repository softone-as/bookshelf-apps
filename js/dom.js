const UNCOMPLETED_BOOK_ID = "books";
const COMPLETED_BOOK_ID = "completed-books";
const BOOK_ITEMID = "itemId";

//Function
function addBook() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearBook = document.getElementById("year").value;

  const book = makeBook(titleBook, authorBook, yearBook, false);
  const bookObject = composeBookObject(titleBook, authorBook, yearBook, false);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  uncompletedBookList.append(book);
  updateDataToStorage();
  document.getElementById("form").reset();
}

function makeBook(titleBook, authorBook, yearBook, isCompleted) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = titleBook;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = authorBook;

  const textYear = document.createElement("p");
  textYear.className = "year";
  textYear.innerText = yearBook;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createUndoButton());
    container.append(createTrashButton());
  } else {
    container.append(createCheckButton());
    container.append(createTrashButton());
  }

  return container;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function addBookToCompleted(bookElement) {
  const bookTitle = bookElement.querySelector(".inner > h2").innerText;
  const bookAuthor = bookElement.querySelector(".inner > p").innerText;
  const bookYear = bookElement.querySelector(".inner > p.year").innerText;

  const listCompleted = document.getElementById(COMPLETED_BOOK_ID);

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;
  listCompleted.append(newBook);
  updateDataToStorage();

  bookElement.remove();
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function createTrashButton() {
  return createButton("trash-button", function (event) {
    confirmDelete();
  });
}

function undoBookFromCompleted(bookElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  const bookTitle = bookElement.querySelector(".inner > h2").innerText;
  const bookAuthor = bookElement.querySelector(".inner > p").innerText;
  const bookYear = bookElement.querySelector(".inner > p.year").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
}

function confirmDelete() {}
const modal = document.getElementById("confirmModal");
const trashButton = document.getElementsByClassName("trash-button");
const cancelButton = document.getElementsByClassName("btn-cancel");
const deleteButton = document.getElementsByClassName("btn-cancel");
console.log(trashButton);
console.log(modal);
trashButton.onclick = function () {
  modal.style.display = "block";
};

deleteButton.onclick = function () {
  removeBook();
};

cancelButton.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
