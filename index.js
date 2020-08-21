let myLibrary = [];
let mybooks = document.getElementsByClassName('book-card');



function Book(title, author, pages, read){ 
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.read = read; 
    this.info = function(){
        return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read; 
    } 
} 


function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function render() {
    for(let i=0; i<myLibrary.length; i++){
        mybooks.innerHTML = `<div class="col-4 p-0 card text-center light-background">
        <div class="card-header">
          ${myLibrary[i].author}
        </div>
        <div class="card-body">
          <h5 class="card-title">${myLibrary[i].title}</h5>
          <p class="card-text">${myLibrary[i].pages} pages</p>
          <a href="#" class="btn btn-primary">Remove this book</a>
        </div>
        <div class="card-footer text-muted">
        ${myLibrary[i].read}
        </div>
      </div>`
    }
}

addBookToLibrary('Math', 'Taiwo', 200, 'Read');
addBookToLibrary('JavaScript', 'Patricia', 300, 'Read');
addBookToLibrary('Romeo and Juliet', 'Patricia', 500, 'Not Read yet');
render(); 
 