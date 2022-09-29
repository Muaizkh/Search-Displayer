// Import any elements we ened
let historySelector = $("#history-selector");
let searchButton = $("#search-btn");
let resultsList = $("#results-list");
var searchInput = $('#search-input');


let historyCache = [];
let localStorageKey = "google-wiki-search-history";

let googleCXKey = "630c7fb54684c4849";

let googleAPIURL = "https://www.googleapis.com/customsearch/v1?cx="+googleCXKey+"&";
let wikiAPIURL = "https://en.wikipedia.org/w/api.php?action=opensearch&&origin=*&";

let googleAPIKey = 'AIzaSyC8JZlJOM7ykwAq_PhFWgr8vAiti0UHay4';

var userSearch =$('#search-input');
var userHistory=$('#search-history');

//// History Handling ////
// This function renders the search history on the page itself
// setting up local storage for search history so it has a place to be stored

// clear current history
var recentHistory = []
function saveSearchedValue(query) {
    // recentSearchHistory.push($("search-history").val());
    // $("#search-input").val('');
    // $("#search-history").val('');
    // as local storage we need to 
    localStorage.setItem("recentHistory",JSON.stringify(query));
    console.log (query)
}

function renderHistory() {
    userHistory.html("");
    userHistory = JSON.parse(localStorage.getItem("recentHistory"));
    if(!userHistory) {
        userHistory = {
            history:[]
        };
        localStorage.setItem("userHistory",JSON.stringify(historyCache));
    }
    userHistory.recentHistory.forEach (e=> {
let userHistoryItem= $("<li>");
userHistoryItem.text();
userHistoryItem.attr("class", "search-history-item");
searchHistoryItem.on("click", function (){
    renderHistory ();
})
var searchHistoryListEl= $("#recentHistory");
searchHistoryListEl.append(userHistoryItem);
        // if any history objects are disabled, do not delete them
    console.log (renderHistory);
    // load the history onto the page using a foreach

})
    // created a variable for search history and added an area to append the history
    var searchHistory = document.createElement ('p');
    searchHistory.classList.add ('card-body');
    searchHistory.append(renderHistory);
    renderHistory();
}

// this function loads the history from localstorage from the localStorageKey and parses it from json
// function loadHistory() {
    // load the history from localstorage

    // parse the history from json
    // if the data we parsed is null, do not set the historyCache to it

//     renderHistory();
// }

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
    let searchResults = {
        google: [],
        wiki:[]
    };
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
                searchResults.google.push(createSearchResultObject(element.title, element.link, element.htmlSnippet));
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
                searchResults.wiki.push(createSearchResultObject(body[1][index], body[3][index], body[2][index]));
            }

            wikiFinished = true;
        })

        // This waits until both requests are finished
        function waitUntilFinished() {
            if (googleFinished && wikiFinished) {
                let finalresults = [];
                
                while (searchResults.google.length > 0 && searchResults.wiki.length > 0) {
                    if (searchResults.google[0]) {
                        finalresults.push(searchResults.google[0]);
                        searchResults.google.splice(0, 1);
                    }
                    if (searchResults.wiki[0]) {
                        finalresults.push(searchResults.wiki[0]);
                        searchResults.wiki.splice(0, 1);
                    }
                }

                console.log(finalresults);
                displaySearchResults(finalresults);
            } else {
                window.setTimeout(waitUntilFinished, 100);
            }
        }
    waitUntilFinished();
}

// this function displays the results we got, formatted into a array
function displaySearchResults(results) {
    results.forEach(element => {
        let object = $("<li>");
        let anchor = $("<a>");
        let description = $("<p>");

        anchor.text(element.Title);
        anchor.attr("href", element.Link);

        if (element.Description) {
            description.text(element.Description);
        }

        object.append(anchor);
        object.append(description);

        resultsList.append(object);
        // resultsList.classList.replace("hide","show")
    })
}

//// Button Handlers ////

// This function starts a search based on the term entered into it
function searchClicked(event) {
    // get target
    event.preventDefault();
    
    var query = searchInput.val()
    // get text input by button
    console.log(query)
    if  (!query || query==='') {
        console.error('You need a search input value!');
        return;
      }
    // getSearchResults(query);
    getSearchResults(query);
    saveSearchedValue (query);
    console.log(query);
}

// this button starts a search based on the term inside it
function historyButtonClicked(event) {
    event.preventDefault();
    // get target
    var userHistoryEl = userHistory.val()
    // get target.value
    if  (!userHistoryEl || userHistoryEl==='') {
        console.error('You need a search input value!');
        return;
      }
    // getSearchResults(query);
    getSearchResults(userHistoryEl);
}

// this brings you to the page the object is attached to
function resultsButtonClicked(event) {
    event.preventDefault();
    // get target
    var resultsEl = resultsList.value
    // get target.attr("data-ref")
    resultsEl.setAttribute()
    // set location to data-ref
}
// listen for click event on search button then pass to searchClicked
searchButton.on("click", searchClicked);

// listen for change event on history buttons then pass to historyButtonClicked
historySelector.on("change", historyButtonClicked);
