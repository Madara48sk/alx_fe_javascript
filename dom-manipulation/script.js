const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const addQuoteButton = document.getElementById('addQuoteButton');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const importFile = document.getElementById('importFile');
const exportButton = document.getElementById('exportButton');
const syncStatus = document.getElementById('syncStatus');

let quotes = [];

// Load quotes from local storage on initialization
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
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

    // Send the new quote to the server
    sendNewQuoteToServer(newQuote);
}

// Save quotes to local storage after modifications
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories dynamically
function populateCategories() {
    const categories = quotes.map(quote => quote.category);
    const uniqueCategories = [...new Set(categories)];

    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '';
    categoryFilter.innerHTML += '<option value="all">All Categories</option>';

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;

    if (selectedCategory === 'all') {
        quoteDisplay.textContent = quotes.map(quote => `"${quote.text}" - ${quote.category}`).join('<br>');
    } else {
        const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
        quoteDisplay.textContent = filteredQuotes.map(quote => `"${quote.text}" - ${quote.category}`).join('<br>');
    }

    // Save the selected category to local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Simulate server interactions (replace with actual API calls)
const serverURL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverURL);
        const data = await response.json();
        const serverQuotes = data.map(post => ({ text: post.title, category: post.body }));
        syncQuotes(serverQuotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

function syncQuotes(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    // Simple conflict resolution strategy: prioritize server data
    const mergedQuotes = serverQuotes.concat(localQuotes.filter(quote => !serverQuotes.some(serverQuote => serverQuote.text === serverQuote.text)));

    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    quotes = mergedQuotes;

    // Update quote display
    showRandomQuote();

    // Update sync status
    syncStatus.textContent = 'Quotes synced with server!';
}

// Periodically fetch quotes from the server
setInterval(fetchQuotesFromServer, 5000); // Adjust interval as needed

// Send a new quote to the server
async function sendNewQuoteToServer(newQuote) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        });

        if (response.ok) {
            console.log('Quote sent successfully!');
            // Handle successful response, e.g., update local quotes
        } else {
            console.error('Error sending quote:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending quote:', error);
    }
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

// Update categories in dropdown when adding new quotes
addQuoteButton.addEventListener('click', () => {
    // ... (existing code)

    // Update categories in dropdown
    populateCategories();
});