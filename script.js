const library = [];


let counter = 0;
class Book {
    constructor(title, author, readStatus) {
        this.title = title;
        this.author = author;
        this.dateAdded = new Date().toLocaleString();
        this.readStatus = readStatus;
        library.push(this);
        this.id = counter++;
    }
}
const bookGrid = document.querySelector('.bookdisplay');
const btnSubmit = document.querySelector('.btnsubmit');
const bookTitle = document.querySelector('#form__title');
const bookAuthor = document.querySelector('#form__author');
const bookRead = document.querySelector('#form__read');
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");


let book1 = new Book("History of Math", "artlp", false);
let book2 = new Book("Another rainy day in Tomsk", "Lipskaia", true);
let book3 = new Book("I ate a sword", "Sword Eater", false);
let book4 = new Book("Basics of JS classes", "StackOverflow.com", true);

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };


closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


const generateBookGrid = () => {
    for (const book of library) {
        const maindiv = document.createElement("div");
        maindiv.classList.add("bookitem");
        const bookTitle = document.createElement("h2");
        bookTitle.innerText = book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = `by ${book.author}`;
        const readStatus = document.createElement("p");
        readStatus.innerHTML = `added on ${book.dateAdded} <br> Read: ${book.readStatus}`;
        const btnDeleteBook = document.createElement("div");
        btnDeleteBook.setAttribute("data-id", book.id);
        btnDeleteBook.innerHTML = "❌";
        btnDeleteBook.classList.add("btnDelete");
        maindiv.appendChild(bookTitle);
        maindiv.appendChild(bookAuthor);
        maindiv.appendChild(readStatus);
        maindiv.appendChild(btnDeleteBook);
        bookGrid.appendChild(maindiv);
    }
    const modalbtn = document.createElement('div');
    modalbtn.classList.add('bookitem');
    modalbtn.classList.add('btnopen');
    modalbtn.innerText = "ADD NEW BOOK +"
    bookGrid.appendChild(modalbtn);

};

document.querySelector('.btnopen').addEventListener('click',openModal);



generateBookGrid();
function addBook() {
    let bookX = new Book(bookTitle.value, bookAuthor.value, bookRead.checked);
    bookTitle.value = '';
    bookAuthor.value = '';
}
function refresh() {
    clearBookGrid();
    generateBookGrid();
}
function clearBookGrid() {
    bookGrid.replaceChildren('');
}

btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    addBook();
    closeModal();
    clearBookGrid();
    generateBookGrid();
});

bookGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('btnDelete')) {
        console.log(event.target.dataset.id);
        let itemToDelete = library[event.target.dataset.id];
        library.splice(itemToDelete, 1);
        refresh();
    }
});