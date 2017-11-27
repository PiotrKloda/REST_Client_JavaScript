var GETBooks = function() {
    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function(books) {
        var booksFromJSON = books;
        var bookListQuery = document.querySelector("#books_list");
        var counter = 1;
        booksFromJSON.forEach(function(eachBook) {
            var newBookP = document.createElement("p");
            var newBookDiv = document.createElement("div");
            newBookP.innerHTML = counter + " :   " + eachBook.title + " " +
                '<button class="expBtn btn-success btn-xs" data-BookId="' + eachBook.id + '">Expand <span class="glyphicon glyphicon-arrow-down"></span></button>' + " " +
                '<button class="delBtn btn-danger btn-xs" data-BookId="' + eachBook.id + '">Delete <span class="glyphicon glyphicon-trash"></span></button>';
            newBookDiv.innerHTML =
                '<form id="' + eachBook.id + '"> ' +
                ' <div>Title: ' + eachBook.title + " ------- " + '  <input type="text" id="title" value="' + eachBook.title + '"/><br/> </div> ' +
                ' <div>Author: ' + eachBook.author + " ------- " + '  <input type="text" id="author" value="' + eachBook.author + '"/><br/> </div> ' +
                ' <div>Type: ' + eachBook.type + " ------- " + '  <input type="text" id="type" value="' + eachBook.type + '"/><br/> </div> ' +
                ' <div>Publisher: ' + eachBook.publisher + " ------- " + '  <input type="text" id="publisher" value="' + eachBook.publisher + '"/><br/> </div> ' +
                ' <div>Isbn: ' + eachBook.isbn + " ------- " + '  <input type="number" id="isbn" value="' + eachBook.isbn + '"/><br/> </div> ' +
                ' <button class="editSubmitBtn" data-BookId="' + eachBook.id + '">Submit changes <span class="glyphicon glyphicon-send"></span></button> ' +
                '<br/>' +
                '<br/>' +
                '</form>';
            newBookDiv.style.display = "none";
            bookListQuery.appendChild(newBookP);
            bookListQuery.appendChild(newBookDiv);
            counter++;
        });
    });
}
GETBooks();

var expandButtons = $(".expBtn");
var grandParent = $("#books_list");
grandParent.on("click", ".expBtn", function(event) {
    if (event.target.parentElement.nextElementSibling.style.display == "none") {
        event.target.parentElement.nextElementSibling.style.display = "inline";
    } else {
        event.target.parentElement.nextElementSibling.style.display = "none";
    }
});

var grandParent = $("#books_list");
grandParent.on("click", ".delBtn", function(event) {
    var idToDel = event.target.getAttribute("data-BookId");
    $.ajax({
        url: "http://localhost:8282/books/remove/" + idToDel,
        type: "DELETE",
    }).done(function() {
        console.log("success DELETE");
        window.location.reload(false);
    }).fail(function() {
        console.log("fail DELETE");
    });
});

var grandParent = $("#books_list");
grandParent.on("click", ".editSubmitBtn", function(event) {
    event.preventDefault();
    var updatedBook = {
        title: event.target.parentElement.querySelector("#title").value,
        author: event.target.parentElement.querySelector("#author").value,
        type: event.target.parentElement.querySelector("#type").value,
        publisher: event.target.parentElement.querySelector("#publisher").value,
        isbn: event.target.parentElement.querySelector("#isbn").value
    }
    updatedBook = JSON.stringify(updatedBook);
    console.log(updatedBook);
    $.ajax({
        url: "http://localhost:8282/books/"+event.target.getAttribute("data-BookId")+"/update",
        data: updatedBook,
        type: "PUT",
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        console.log("success");
    }).fail(function() {
        console.log("fail");
    });
});

var button = document.querySelector("#btn");
button.addEventListener("click", function(event) {
    var objectBook = {
        title: document.querySelector("input#title").value,
        author: document.querySelector("input#author").value,
        type: document.querySelector("input#type").value,
        publisher: document.querySelector("input#publisher").value,
        isbn: document.querySelector("input#isbn").value,
    }
    objectBook = JSON.stringify(objectBook);
    $.ajax({
        url: "http://localhost:8282/books/add",
        data: objectBook,
        type: "POST",
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        console.log("success");
        GETBooks();
    }).fail(function() {
        console.log("fail");
        GETBooks();
    });
});
