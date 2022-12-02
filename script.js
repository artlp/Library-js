const library = [];
class Book {
    constructor(title, author, readStatus) {
        this.title = title;
        this.author = author;
        this.dateAdded = new Date().toLocaleString();
        this.readStatus = readStatus;
        library.push(this);
    }
}
const bookGrid = document.querySelector('.bookdisplay');
let book1 = new Book("History of Math", "artlp", false);
let book2 = new Book("Another rainy day in Tomsk", "Lipskaia", true);
let book3 = new Book("I ate a sword", "Sword Eater", false);
let book4 = new Book("Basics of JS classes", "StackOverflow.com", true);

for (const book of library) {
    const maindiv = document.createElement("div");
    maindiv.classList.add("bookitem")
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = book.title;
    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `by ${book.author}`;
    const readStatus = document.createElement("p");
    readStatus.innerHTML = `added on ${book.dateAdded} <br> Read: ${book.readStatus}`;
    maindiv.appendChild(bookTitle);
    maindiv.appendChild(bookAuthor);
    maindiv.appendChild(readStatus);
    bookGrid.appendChild(maindiv);
}