// Import any elements we ened
let historyCache = [];
let localStorageKey = "google-wiki-search-history";

let googleCXKey = "630c7fb54684c4849";

let googleAPIURL = "https://www.googleapis.com/customsearch/v1?cx="+googleCXKey+"&";
let wikiAPIURL = "https://en.wikipedia.org/w/api.php?action=opensearch&&origin=*&";

let googleAPIKey = 'AIzaSyC8JZlJOM7ykwAq_PhFWgr8vAiti0UHay4'

//// History Handling ////
// This function renders the search history on the page itself
function renderHistory() {
    // clear current history
        // if any history objects are disabled, do not delete them

    // load the history onto the page using a foreach
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
function createSearchResultObject(Title, Link, Description) {
    return {
        Title:Title,
        Link: Link,
        Description: Description
    }
}

// This function gets the search results for our query term from the google and wikipidea apis
function getSearchResults(query) {
    let searchResults = [];
    let googleFinished = false;
    let wikiFinished = false;

    // prep url for querying google
    let googleURL = googleAPIURL+"key="+googleAPIKey+"&q="+query;

    // prep url for querying wikipedia
    let wikiURL = wikiAPIURL+"search="+query;

    // fetch google url
    // .then parse recieved data to searchResults
    fetch(googleURL)
        .then(function(response){
            return response.json();
        })
        .then(function(body){
            console.log(body);
            body.items.forEach(element => {
                searchResults.push(createSearchResultObject(element.title, element.link, element.htmlSnippet));
            });

            googleFinished = true;
        })

    // fetch wikipedia url
    // .then parse recieved data to searchResults
    fetch(wikiURL)
        .then(function(response){
            return response.json();
        })
        .then(function(body){
            console.log(body);
            for (const index in body[1]) {
                searchResults.push(createSearchResultObject(body[1][index], body[3][index], body[2][index]));
            }

            wikiFinished = true;
        })

        // This waits until both requests are finished
        function waitUntilFinished() {
            if (googleFinished && wikiFinished) {
                console.log(searchResults)
                displaySearchResults(searchResults);
            } else {
                window.setTimeout(waitUntilFinished, 100);
            }
        }
    waitUntilFinished();
}

getSearchResults("Cats");

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