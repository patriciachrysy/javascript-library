let myLibrary = [];
let mybooks = document.querySelector('.book-card');
let formSpace = document.querySelector('.form-space');
let bookForm = document.getElementById('display-form');
 bookForm.addEventListener('click', function(){
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
                <label for="read">Status</label>
                <select class="form-control" name="read" required>
                    <option>Read</option>
                    <option>Not read yet</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" id="addBook" onclick="saveBook()">Save</button>
        </form>
    </div>
`
});


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
    let allBooks = '';
    for(let i=0; i<myLibrary.length; i++){
        allBooks += `<div class="col-3 p-0 card text-center light-background">
        <div class="card-header">
          ${myLibrary[i].author}
        </div>
        <div class="card-body">
          <h5 class="card-title">${myLibrary[i].title}</h5>
          <p class="card-text">${myLibrary[i].pages} pages</p>
          <a href="#" class="btn btn-warning" onclick="removeBook(${i})">Remove this book</a>
        </div>
        <div class="card-footer text-muted">
        ${myLibrary[i].read}
        </div>
      </div>`;
    }
    mybooks.innerHTML = allBooks;
}

function removeBook(index){
    let confirmation = confirm(`Are you sure you want to remove ${myLibrary[index].title}?`)
        if(confirmation == true){
            myLibrary.splice(index,1);
            render();
    }
}

function saveBook(){
    let myForm = document.getElementById('bookForm');
    addBookToLibrary(myForm.elements.namedItem('title').value,
    myForm.elements.namedItem('author').value, myForm.elements.namedItem('pages').value, myForm.elements.namedItem('read').value
    );
    render();
}

addBookToLibrary('Math', 'Taiwo', 200, 'Read');
addBookToLibrary('JavaScript', 'Patricia', 300, 'Read');
addBookToLibrary('Romeo and Juliet', 'Patricia', 500, 'Not Read yet');
render(); 
console.log(myLibrary);

