/*
  eslint-disable no-unused-vars, no-alert
*/
const myLibrary = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : [];
const mybooks = document.querySelector('.book-card');
const formSpace = document.querySelector('.form-space');
const bookForm = document.getElementById('display-form');
bookForm.addEventListener('click', () => {
  formSpace.innerHTML = `
    <div class="col-8 p-3 card light-background">
        <form id="bookForm">
            <div class="form-group">
                <label for="title">The book title</label>
                <input type="text" name="title" class="form-control" placeholder="Enter the book title" required>
            </div>
            <div class="form-group">
                <label for="author">The author</label>
                <input type="text" name="author" class="form-control" placeholder="Enter the author's name" required>
            </div>
            <div class="form-group">
                <label for="pages">Number of pages</label>
                <input type="number" name="pages" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="read">Status</label>
                <select class="form-control" name="read" required>
                    <option>Read</option>
                    <option>Not read yet</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary" id="addBook" onclick="saveBook()">Save</button>
        </form>
    </div>
`;
});


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read === 'Read') {
    this.read = 'Not read yet';
  } else {
    this.read = 'Read';
  }
};


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function render() {
  let allBooks = '';
  let i = 0;
  while (i < myLibrary.length) {
    allBooks += `<div class="col-3 p-0 m-2 card text-center light-background">
            <div class="card-header">
            ${myLibrary[i].author}
            </div>
            <div class="card-body">
            <h5 class="card-title">${myLibrary[i].title}</h5>
            <p class="card-text">${myLibrary[i].pages} pages</p>
            <a href="#" class="btn btn-warning" onclick="removeBook(${i})">Remove this book</a>
            </div>
            <div class="card-footer text-muted">
                <a href="#" class="btn btn-info" onclick="changeRead(${i})">${myLibrary[i].read}</a>
            </div>
        </div>`;
    i += 1;
  }

  mybooks.innerHTML = allBooks;
}

function changeRead(index) {
  const mybook = myLibrary[index];
  if (mybook.read === 'Read') {
    mybook.read = 'Not read yet';
  } else {
    mybook.read = 'Read';
  }
  localStorage.setItem('library', JSON.stringify(myLibrary));
  render();
}

function removeBook(index) {
  const confirmation = window.confirm(`Are you sure you want to remove ${myLibrary[index].title}?`);
  if (confirmation === true) {
    myLibrary.splice(index, 1);
    render();
  }

  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function saveBook() {
  const myForm = document.getElementById('bookForm');
  if (myForm.elements.namedItem('title').value && myForm.elements.namedItem('author').value && myForm.elements.namedItem('pages').value && myForm.elements.namedItem('read').value) {
    addBookToLibrary(myForm.elements.namedItem('title').value, myForm.elements.namedItem('author').value, myForm.elements.namedItem('pages').value, myForm.elements.namedItem('read').value);
    render();
    myForm.reset();
    formSpace.innerHTML = '';
  } else {
    alert('Please fill all the fields correctly');
  }
}

render();
