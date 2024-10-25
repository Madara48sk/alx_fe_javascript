// ... (existing code)

// Populate categories dynamically
function populateCategories() {
    const categories = quotes.map(quote => quote.category);
    const uniqueCategories = [...new Set(categories)];

    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '';
    categoryFilter.innerHTML += '<option value="all">All Categories</option>';

    uniqueCategories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;

    if (selectedCategory === 'all') {
        quoteDisplay.innerHTML = quotes.map(quote => `"${quote.text}" - ${quote.category}`).join('<br>');
    } else {
        const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
        quoteDisplay.innerHTML = filteredQuotes.map(quote => `"${quote.text}" - ${quote.category}`).join('<br>');
    }

    // Save the selected category to local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// ... (rest of the code)

// Load last selected category from local storage
const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
if (lastSelectedCategory) {
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    filterQuotes();
}

// Update categories in dropdown when adding new quotes
addQuoteButton.addEventListener('click', () => {
    // ... (existing code)

    // Update categories in dropdown
    populateCategories();
});