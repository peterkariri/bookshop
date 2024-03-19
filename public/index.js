// script.js
document.addEventListener('DOMContentLoaded', function() {
    const booksList = document.getElementById('books-list');
    const addBookForm = document.getElementById('add-book-form');
  
    // Fetch and display books
    fetchBooks();
  
    // Add book form submit event
    addBookForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
  
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      });
  
      if (response.ok) {
        const newBook = await response.json();
        addBookToList(newBook);
        addBookForm.reset();
      }
    });
  
    // Function to fetch books from the server
    async function fetchBooks() {
      booksList.innerHTML = ''; // Clear books list
  
      const response = await fetch('/api/books');
      const books = await response.json();
  
      books.forEach(book => {
        addBookToList(book);
      });
    }
  
    // Function to add a book to the list
    function addBookToList(book) {
      const bookItem = document.createElement('div');
      bookItem.innerHTML = `
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <button class="delete-btn" data-id="${book._id}">Delete</button>
      `;
      booksList.appendChild(bookItem);
  
      // Add event listener for delete button
      bookItem.querySelector('.delete-btn').addEventListener('click', async function() {
        const bookId = this.getAttribute('data-id');
        const response = await fetch(`/api/books/${bookId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          bookItem.remove(); // Remove book from UI
        }
      });
    }
  });
  