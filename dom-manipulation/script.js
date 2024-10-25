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

function addQuote() {
    const newQuote = {
        text: newQuoteText.value,
        category: newQuoteCategory.value
    };

    quotes.push(newQuote);
    newQuoteText.value = '';
    newQuoteCategory.value = '';
    toggleForm();
    showRandomQuote();
}

function toggleForm() {
    addQuoteForm.style.display = addQuoteForm.style.display === 'none' ? 'block' : 'none';
}

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', toggleForm);