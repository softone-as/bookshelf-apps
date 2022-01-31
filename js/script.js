const currentUrl = window.location.href;
const endPoint = currentUrl.split("/").pop();

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadDataFromStorage();
    loadDataFromSession();
  }
  if (endPoint == "add-book.html") {
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", function () {
      event.preventDefault();
      addBook();
    });
  } else if (endPoint == "edit-book.html") {
    const submitEditForm = document.getElementById("edit_form");
    submitEditForm.addEventListener("submit", function () {
      event.preventDefault();
      editBook(book_edited.id);
    });
  }
});

document.addEventListener("ondatasaved", () => {});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

document.addEventListener("onsessionloaded", () => {
  bookToEdited();
});
