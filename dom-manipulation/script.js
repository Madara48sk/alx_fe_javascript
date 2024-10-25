const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const addQuoteButton = document.getElementById('addQuoteButton');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const importFile = document.getElementById('importFile');
const exportButton = document.getElementById('exportButton');

let quotes = [];

// Load quotes from local storage on initialization
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
}

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
    saveQuotes();
    showRandomQuote();
}

// Save quotes to local storage after modifications
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// JSON Export functionality
function exportQuotesToJson() {
    const jsonData = JSON.stringify(quotes);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();

    URL.revokeObjectURL(url);
}

// JSON Import functionality
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', toggleForm);
importFile.addEventListener('change', importFromJsonFile);
exportButton.addEventListener('click', exportQuotesToJson);

// Show last viewed quote (optional)
const lastQuote = retrieveLastViewedQuote();
if (lastQuote) {
    quoteDisplay.innerHTML = `"${lastQuote.text}" - ${lastQuote.category}`;
} else {
    showRandomQuote();
}

// Store last viewed quote on quote change (optional)
newQuoteButton.addEventListener('click', () => {
    const currentQuote = quotes[quotes.length - 1];
    storeLastViewedQuote(currentQuote);
});