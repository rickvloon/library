let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
    displayBooks(myLibrary);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks(myLibrary);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function deleteBook(myLibrary, index){
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getBookData(){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("status").value;

    if(title && author && pages && status){
        document.getElementById("book-form").reset();
        const book = new Book(title, author, pages, status);
        addBookToLibrary(book);
    }
    else{
        alert("Fill in all the fields");
    }
}

function displayBooks(allBooks){
    const table = document.querySelector("table");
    table.innerHTML = "<tr><th>Title</th><th>Author</th><th>Pages</th><th>Status</th><th class='delete-cell'>Action</th></tr>";

    for(let i = 0; i < allBooks.length; i++){
        table.innerHTML += `<tr><td>${allBooks[i].title}</td><td>${allBooks[i].author}</td><td>${allBooks[i].pages}</td><td class="status-bar" count="${i}">${allBooks[i].status}</td><td class="delete-cell"><button class="delete-button" count="${i}">Delete</button></td></tr>`;
    };

    const statusBars = document.querySelectorAll(".status-bar");
    statusBars.forEach(function(bar){
        bar.addEventListener("click", function(e){
            let bar = e.target;
            let index = bar.getAttribute("count");
            allBooks[index].changeStatus();
        });
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(function(button){
        button.addEventListener("click", function(e){
            let button = e.target;
            let index = button.getAttribute("count");
            deleteBook(myLibrary, index);
        });
    });
}

Book.prototype.changeStatus = function(){
    if(this.status == "read"){
        this.status = "not read";
    }
    else{
        this.status = "read";
    }
    displayBooks(myLibrary);
}

