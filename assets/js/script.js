// Import any elements we ened
let historySelector = $("#history-selector");
let searchButton = $("#search-btn");
let resultsList = $("#results-list");
let searchInput = $('#search-input');
let dialogeGui = $("#dialog-message");
let userHistory=$('#search-history');
let searchDiv = $("#search");


let historyCache = [];
let localStorageKey = "google-wiki-search-history";

let googleCXKey = "630c7fb54684c4849";

let googleAPIURL = "https://www.googleapis.com/customsearch/v1?cx="+googleCXKey+"&";
let wikiAPIURL = "https://en.wikipedia.org/w/api.php?action=opensearch&&origin=*&";

let googleAPIKey = 'AIzaSyC8JZlJOM7ykwAq_PhFWgr8vAiti0UHay4';

//// History Handling ////
// This function renders the search history on the page itself
// setting up local storage for search history so it has a place to be stored

function renderHistory() {
    // if any history objects are disabled, do not delete them
    // load the history onto the page using a foreach
    historySelector.empty();
    historyCache.forEach (element => {
        let userHistoryItem= $("<button>");
        userHistoryItem.text();
        userHistoryItem.attr("class", "search-history-item");
        userHistoryItem.text(element);
        userHistoryItem.val(element);

        historySelector.append(userHistoryItem);
    })
    // created a variable for search history and added an area to append the history
}

// this function loads the history from localstorage from the localStorageKey and parses it from json
function loadHistory() {
    let history = JSON.parse(localStorage.getItem(localStorageKey));
    if (history !== null) {
        historyCache = history;
    }

    console.log(historyCache)
   
    renderHistory();
}

// if the search history has the same term already, it is moved to the start of the list
function saveHistory(query) {
    // check the historyCache for any terms which are === to the query
    // If a element is === to query, splice it from the array
    for (const index in historyCache) {
        if (historyCache[index] === query) {
            historyCache.splice(index, 1);
        }
    }
    // check if query is null or "", if it is etiher, return;
    if (query == null || query == "") {
        console.log ("variable is null or undefined");
        return;
    }
    // insert the query at the beginning of the historycache
    historyCache.unshift(query);
    // stringify the historycache and save it to localstorage in the localStorageKey
    localStorage.setItem(localStorageKey, JSON.stringify(historyCache));

    console.log(historyCache)
    console.log(query)
    renderHistory();
}
loadHistory();

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
    resultsList.empty();

    results.forEach(element => {
        let object = $("<li class='list-result has-background-white'>");
        let anchor = $("<a class='list-link is-size-5 has-text-weight-bold ml-5 mt-3'>");
        let description = $("<p class='list-description is-size-6 has-text-weight-semibold ml-5'>");
        
        anchor.text(element.Title);
        anchor.attr("href", element.Link);

        if (element.Description) {
            description.text(element.Description);
        }

        object.append(anchor);
        object.append(description);

        resultsList.append(object);
        
    })
}

// This function displays a error message below the search bar
function displayErrorMsg(msg) {
    dialogeGui.dialog({
        position: { my: "left top", at: "left bottom", of: searchDiv }
      });
    dialogeGui.dialog("open");
    dialogeGui.children()[0].textContent = msg;

    let timeout = window.setTimeout(function(){
        dialogeGui.dialog("close");
    }, 5000);

    dialogeGui.on("dialogclose", function() {
        clearTimeout(timeout);
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
        displayErrorMsg('You need a search input value!');
        return;
      }
      
    saveHistory(query)
    getSearchResults(query);
    console.log(query);
}

// this button starts a search based on the term inside it
function historyButtonClicked(event) {
    event.preventDefault();
    
    var userHistoryEl = $(event.target).text();
    saveHistory(userHistoryEl);
    // getSearchResults(query);
    getSearchResults(userHistoryEl);
}

// listen for click event on search button then pass to searchClicked
searchButton.on("click", searchClicked);

// listen for change event on history buttons then pass to historyButtonClicked
historySelector.on("click", ".search-history-item",historyButtonClicked);

$(function() {
    dialogeGui.dialog();
    dialogeGui.children()[0].textContent = "";
    dialogeGui.dialog("close");
});