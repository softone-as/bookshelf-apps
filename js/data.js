const STORAGE_KEY = "BOOK_APPS";
let books = [];
let book_edited = [];

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function loadDataFromSession() {
  const serializedBook = sessionStorage.getItem("book");

  let book_data = JSON.parse(serializedBook);

  if (book_data !== null) book_edited = book_data;
  document.dispatchEvent(new Event("onsessionloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
  sessionStorage.removeItem("book");
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  let listCompleted = document.getElementById(COMPLETED_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}

function bookToEdited() {
  if (endPoint === "edit-book.html") {
    document.getElementById("edit_title").value = book_edited.title;
    document.getElementById("edit_author").value = book_edited.author;
    document.getElementById("edit_year").value = book_edited.year;
  }
}

function searchBook() {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const div = document.getElementsByClassName("item shadow");
  const value = document.getElementsByClassName("inner");

  for (let i = 0; i < value.length; i++) {
    const res = value[i].getElementsByTagName("h2")[0];
    txtValue = res.textContent || res.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}
