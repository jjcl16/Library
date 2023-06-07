const addBookButton = document.querySelector('#addBook');
const showBooksButton = document.querySelector('#showBooks');
const clearScreenButton = document.querySelector('#clearScreen');
const inputs = document.querySelectorAll('input');
const bookList = document.querySelector('#bookList');
const myLibrary = [];

/* Book Constructor */
class Book {
  constructor(title, author, pages, readed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
  }

  info() {
    return !this.readed ? `${this.title} by ${this.author}, ${this.pages} pages, not read yet.` : `${this.title} by ${this.author}, ${this.pages} pages, readed.`;
  }
}
/* get info from a book 
Book.prototype.info = function () {
  return !this.readed
    ? `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`
    : `${this.title} by ${this.author}, ${this.pages} pages, readed.`;
};
*/
// Book.prototype.checkBookOnLibary = function () {};

/* create a div for each book */
function listBooks() {
  myLibrary.map((book, index) => {
    // create bookBox
    const bookBox = document.createElement('div');
    bookBox.classList.add('bookBox');
    bookList.appendChild(bookBox);
    // create bookInfo
    const bookInfo = document.createElement('div');
    bookInfo.textContent = book.info();
    bookInfo.classList.add('bookInfo');
    bookBox.appendChild(bookInfo);
    // create Read button
    const readedButton = document.createElement('button');
    if (book.readed) {
      readedButton.classList.add('readed');
      readedButton.textContent = 'Readed';
    } else {
      readedButton.classList.add('notReaded');
      readedButton.textContent = 'Not Readed';
    }
    readedButton.setAttribute('id', `${index}`);
    readedButton.addEventListener('click', changeState);
    bookBox.appendChild(readedButton);
    // create remove Button
    const removeButton = document.createElement('button');
    removeButton.classList.add(`${index}`);
    removeButton.textContent = 'Remove book';
    removeButton.addEventListener('click', removeBook);
    bookBox.appendChild(removeButton);
  });
}

/* Shows books on screen removing the list */
function showBooks() {
  removeBooksListed();
  listBooks();
}

function changeState(e) {
  // console.log(e.target.id);
  // const path = e.composedPath();
  const index = e.target.id;
  myLibrary[index].readed = !myLibrary[index].readed;
  showBooks();
}

/* Remove a book */
function removeBook(e) {
  const path = e.composedPath();
  const index = path[0].className;
  myLibrary.splice(index, 1);
  showBooks();
}

/* revome list of books */
function removeBooksListed() {
  if (bookList.hasChildNodes()) {
    let child = bookList.lastChild;
    while (child) {
      bookList.removeChild(child);
      child = bookList.lastChild;
    }
  }
}

/* add a new book */
function addBookToLibrary() {
  const titleInput = inputs[0].value;
  const authorInput = inputs[1].value;
  const pagesInput = inputs[2].value;
  const readedInput = inputs[3].checked;
  if (titleInput !== '' && authorInput !== '' && pagesInput !== '') {
    const newBook = new Book(titleInput, authorInput, pagesInput, readedInput);
    !checkBookOnList(newBook)
      ? myLibrary.push(newBook)
      : alert('Already added');
  }
  showBooks();
}

function checkBookOnList(bookToCheck) {
  let find = false;
  myLibrary.find((book) => {
    if (
      bookToCheck.title === book.title &&
      bookToCheck.author === book.author &&
      bookToCheck.pages === book.pages
    ) {
      find = true;
      return find;
    }
    return find;
  });
  return find;
}

/* Events */
addBookButton.addEventListener('click', addBookToLibrary);
showBooksButton.addEventListener('click', showBooks);
clearScreenButton.addEventListener('click', removeBooksListed);

/*
// just for development 
for (let index = 0; index < 14; index++) {
  const book = new Book();
  book.title = "title";
  book.author = "author";
  book.pages = "7";
  book.readed = true;
  myLibrary.push(book);
}
*/
