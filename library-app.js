

class Book {
    //class methods
    constructor (title, author, pages, read, description) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.pages = pages;
        this.read = read;
        this.info = function () {return `${title} by ${author}, ${pages} pages`}
    }

    isRead() {
        this.read = this.read === true ? false : true;
    }
}

// Example books
const exampleBook1 = new Book('The Hobbit', 'J.R.R. Tolkien', '250', false, 'An unexpected journey of a vertically challenged homebody and his overly enthusiastic band of treasure-hungry dwarves, featuring a cameo appearance by a gold-obsessed dragon.')
const exampleBook2 = new Book('It', 'Stephen King', '1100', false, "A clown with a face only a mother could love terrorizes a town, proving that sometimes balloons aren't just for birthday parties.")
const exampleBook3 = new Book('Leviathan Wakes', 'James S.A. Corey', '580', false, 'When a space detective and a washed-up ship captain team up to solve a mystery, they discover that space zombies and interstellar politics make for one wild ride through the cosmos.')
const myLibrary = [exampleBook1, exampleBook2, exampleBook3];

// Book entry functions
const bookEntryModal = document.getElementById('book-entry-modal');
const modalBtn = document.getElementById('book-entry-btn')
const closeBtn = document.getElementById('closeBtn');

modalBtn.addEventListener('click', () => {
    bookEntryModal.showModal();
});    
closeBtn.addEventListener('click', () => {
    bookEntryModal.close();
});

document.getElementById('newBookForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title-new').value;
    const author = document.getElementById('author-new').value;
    const pageCount = document.getElementById('page-count-new').value;
    const description = document.getElementById('description-new').value;
    const newBookEntry = new Book(title, author, pageCount, description);

    addBookToLibrary(newBookEntry);
    bookEntryModal.close();
    displayBooks()
});

// display functions
function isBookInLibrary(title, library) {
     for (let i = 0; i < library.length; i++) {
        if (library[i].title === title) {
            return true;
        }
    }
    return false;
}

function addBookToLibrary(book) {
    // Check if book already exists
    if (isBookInLibrary(book.title, myLibrary) === true) {
        return alert("There is a book already by that title in your library.")
    }
    myLibrary.push(book)
    return alert("Book has been successfully added.");
}

function displayBooks() {
    // Get the books container
    const libraryCatalog = document.querySelector('.bookcards');

    //clear for updates
    libraryCatalog.innerHTML = '';

    // Loop through the library array and create bookcard divs
    myLibrary.forEach(book => {
        // Create a new bookcard div
        const bookCardDiv = document.createElement('div');

        // Create elements for book title, author
        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `by ${book.author}`;

        const pageCount = document.createElement('p');
        pageCount.textContent = `Pages: ${book.pages}`;

        // Append elements to the project div
        bookCardDiv.appendChild(title);
        bookCardDiv.appendChild(author);
        bookCardDiv.appendChild(pageCount);

        // Add event listener for mouseover event
        bookCardDiv.addEventListener('mouseover', () => {
            updateDescription(book);
        });

        bookCardDiv.addEventListener('mouseleave', () => {
            clearDescription(); 
        });

        // Append the project div to the projects container
        libraryCatalog.appendChild(bookCardDiv);
    });
}

function updateDescription(book) {
    const descriptionbox = document.querySelector('.description');

    //clear the section
    descriptionbox.innerHTML = '';

    //populate description div
    const newDesc = document.createElement('div');
    newDesc.textContent = book.description;
    descriptionbox.appendChild(newDesc);

}

function clearDescription() {
    const descriptionbox = document.querySelector('.description');
    descriptionbox.innerHTML = '';
}


displayBooks()

