//WYSWIETLANIE LISTY
var GETBooks = function(){
$.ajax({
    url: "http://localhost:8282/books/",
    data: {},
    type: "GET",
    dataType: "json"
}).done(function(books) {
    //2. przerob na JS
    // var booksFromJsonString= books;
    // var booksParsed = JSON.parse(booksFromJsonString); ODRAZU SA zparsowane !
    var booksFromJSON = books; //import z Json
    //dynamiczne tworzenie listy ksiazek
    var bookListQuery = document.querySelector("#books_list"); // dostaje tablice obiektow !!!
    var counter = 1;
    booksFromJSON.forEach(function(eachBook) {
        var newBookP = document.createElement("p");
        var newBookDiv = document.createElement("div");
        newBookP.innerHTML = counter + " :   " + eachBook.title + " "
                    + '<button class="" id="exp">Expand</button>' + " "
                    + '<button class="" id="exp">Delete</button>';

        bookListQuery.appendChild(newBookP);
        // bookListQuery.appendChild(newBookDiv);
        counter++;
    });
}); }






















GETBooks();


//DODAWANIE KSIAZKI
var button = document.querySelector("#btn");
button.addEventListener("click", function(event) {
    // event.preventDefault();
    //data gathered from FORM
    // var form = document.querySelector("form"); // alt
    // var title = form.elements.email.value;

    var objectBook = {
        title: document.querySelector("input#title").value,
        author: document.querySelector("input#author").value,
        type: document.querySelector("input#type").value,
        publisher: document.querySelector("input#publisher").value,
        isbn: document.querySelector("input#isbn").value,
    }
    objectBook=JSON.stringify(objectBook); //dodaje nawiasy !!

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
        console.log("fail");      // czemu wysietla fail ??
        GETBooks();
    });

});


//USUNIECIE PO ID ???







// $.get({
//     url: "https://swapi.co/api/people/4/"
// }).done(function(data) {
//     console.log(data);
//     $(data.films).each(function(i, el) {
//         console.log(el);
//     });
// });

// curl -X POST -i -H "Content-Type: application/json" -d '{"isbn":"23453","title":"Piraci","publisher":"Hel","type":"exotic","author":"Bruce Eckel"}' http://localhost:8282/books/add
