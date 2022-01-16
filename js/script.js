document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function () {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) loadDataFromStorage();

  const confirmModal = document.getElementById("confirmModal");
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
