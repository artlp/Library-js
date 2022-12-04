const library = [];


let counter = 0;
class Book {
    constructor(title, author, readStatus) {
        this.title = title;
        this.author = author;
        this.dateAdded = new Date().toDateString();
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
const titlePlaceHolder = document.querySelector("#title__placeholder");
const authorPlaceHolder = document.querySelector("#author__placeholder");


let book1 = new Book("Gone with the Wind", "Margaret Mitchell", false);
let book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald", true);
let book3 = new Book("Strands of Bronze and Gold", "Jane Nickerson", false);
let book4 = new Book("The Hobbit", "J.R.R. Tolkien", true);

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const setTheme = theme => document.documentElement.className = theme;
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
        const dateAdded = document.createElement("p");
        dateAdded.innerHTML = `added on ${book.dateAdded}`;
        const btnDeleteBook = document.createElement("div");
        const readStatus = document.createElement("div")
        readStatus.classList.add("readstatus__div")
        if (book.readStatus) {
            readStatus.innerHTML = `<img src="./check-square.svg" class="readstatus_img" alt="read">`
        } else {
            readStatus.innerHTML = `<img src="./book-open.svg" class="readstatus_img" alt="not read">`
        }
        btnDeleteBook.setAttribute("data-id", book.id);
        btnDeleteBook.innerHTML = "⨉";
        btnDeleteBook.classList.add("btnDelete");
        maindiv.style.borderLeftColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        maindiv.appendChild(bookTitle);
        maindiv.appendChild(bookAuthor);
        maindiv.appendChild(dateAdded);
        maindiv.appendChild(readStatus)
        maindiv.appendChild(btnDeleteBook);
        bookGrid.appendChild(maindiv);
    }
    const modalbtn = document.createElement('div');
    modalbtn.classList.add('bookitem');
    modalbtn.classList.add('btnopen');
    modalbtn.innerHTML = `+ <span class="tooltiptext">Add a new book</span>
    `;
    bookGrid.appendChild(modalbtn);
    document.querySelector('.btnopen').addEventListener('click', openModal);

};

generateBookGrid();

function addBook() {
    let bookX = new Book(bookTitle.value, bookAuthor.value, bookRead.checked);
    bookTitle.value = '';
    bookAuthor.value = '';
    bookTitle.style.outline = "none";
    bookAuthor.style.outline = "none";
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
    if (bookTitle.checkValidity() && bookAuthor.checkValidity()) {
        addBook();
        closeModal();
        clearBookGrid();
        generateBookGrid();
    } else {
        bookTitle.style.outline = "2px solid red";
        bookAuthor.style.outline = "2px solid red";
    }
});

bookGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('btnDelete')) {
        let itemToDelete = library[event.target.dataset.id];
        library.splice(itemToDelete, 1);
        refresh();
    }
});


bookTitle.addEventListener('focus', () => {
    titlePlaceHolder.classList.add("placeholder__moved");
});
bookAuthor.addEventListener('focus', () => {
    authorPlaceHolder.classList.add("placeholder__moved");
});
bookTitle.addEventListener('focusout', () => {
    if (bookTitle.value === '') titlePlaceHolder.classList.remove("placeholder__moved");
});
bookAuthor.addEventListener('focusout', () => {
    if (bookAuthor.value === '') authorPlaceHolder.classList.remove("placeholder__moved");
});
