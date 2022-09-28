// Import any elements we ened
let historyCache = [];
let localStorageKey = "google-wiki-search-history";


//// History Handling ////
// This function renders the search history on the page itself
function renderHistory() {
    console.log (renderHistory);
    // load the history onto the page using a foreach
    // created a variable for search history and added an area to append the history
    var searchHistroy = document.createElement ('p');
    searchHistroy.classList.add ('card-body');
    searchHistroy.append(renderHistory);
}

// this function loads the history from localstorage from the localStorageKey and parses it from json
function loadHistory() {
    // load the history from localstorage
    // parse the history from json
    // if the data we parsed is null, do not set the historyCache to it

    renderHistory();
}

// if the search history has the same term already, it is moved to the start of the list
function saveHistory(query) {
    // check if query is null or "", if it is etiher, return;

    // check the historyCache for any terms which are === to the query
        // If a element is === to query, splice it from the array

    // insert the query at the beginning of the historycache

    // stringify the historycache and save it to localstorage in the localStorageKey
}


//// Search result handling ////

// This function gets the search results for our query term from the google and wikipidea apis
function getSearchResults(query) {
    let searchResults = [];

    // prep url for querying google

    // prep url for querying wikipedia

    // fetch google url
        // .then parse recieved data to searchResults

    // fetch wikipedia url
        // .then parse recieved data to searchResults

    displaySearchResults(searchResults);
}

// this function displays the results we got, formatted into a array
function displaySearchResults(results) {
    // loop through all results
        // create object for displaying
        // edit values needed for it
        // append to search list
}

//// Button Handlers ////

// This function starts a search based on the term entered into it
function searchClicked(event) {
    // get target

    // get text input by button

    // getSearchResults(query);
}

// this button starts a search based on the term inside it
function historyButtonClicked(event) {
    // get target

    // get target.value

    // getSearchResults(query);
}

// this brings you to the page the object is attached to
function resultsButtonClicked(event) {
    // get target

    // get target.attr("data-ref")

    // set location to data-ref
}


// listen for click event on search button then pass to searchClicked

// listen for click event on history buttons then pass to historyButtonClicked

// listen for change event on searchResultButtons then pass to resultsButtonClicked