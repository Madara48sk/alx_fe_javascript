const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const addQuoteButton = document.getElementById('addQuoteButton');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

let quotes = [
    { text: 'The only way to do great work is to love what you do.', category: 'Steve Jobs' },
    { text: 'Life is what happens to you while you\'re busy making other plans.', category: 'John Lennon' },
    // Add more quotes here
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function createAddQuoteForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote">
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category">
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(form);
}

function addQuote() {
    const newQuote = {
        text: newQuoteText.value,
        category: newQuoteCategory.value
    };

    quotes.push(newQuote);
    newQuoteText.value = '';
    newQuoteCategory.value = '';
    showRandomQuote();
}

newQuoteButton.addEventListener('click', showRandomQuote);
createAddQuoteForm();