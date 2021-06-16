var yahooEl = document.querySelector("#yahoo-row");
var seekingAlphaEl = document.querySelector("#seekingAlpha-row");
var userInputEl = document.querySelector("#user-input");
var userSubmitEl = document.querySelector("#user-form");
var historyBoxEl = document.querySelector("#searchHistory");

//Array to hold search history
var recentSearches = []; // create an array to store all search resaults

var submitHandler = function (event) {
  event.preventDefault();

  var stockInput = userInputEl.value.trim();

  if (stockInput) {
    //TODO Clear old content

    //save search to local storage and append to
    getYahooInfo(stockInput);
    getSeekingAlphaInfo(stockInput);
    searchFunction(stockInput);
  } else {
    //TODO ADD modal to give user an error message
  }
};

// Fetches data from Yahoo using API
var getYahooInfo = function (userInput) {
  //fetch API
  fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=" +
      userInput +
      "&region=US",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3278eeb05dmsh2bd0e74742e9284p16c8fcjsn01bbb5e74c2e",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      loadYahooPage(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Fetches news from Seeking Alpha using its API
var getSeekingAlphaInfo = function (userInput) {
  fetch(
    "https://seeking-alpha.p.rapidapi.com/news/list?id=" +
      userInput +
      "&until=0&size=20",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3278eeb05dmsh2bd0e74742e9284p16c8fcjsn01bbb5e74c2e",
        "x-rapidapi-host": "seeking-alpha.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      loadSeekingAlphaPage(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

var loadYahooPage = function (data) {
  //Clear box
  yahooEl.innerHTML = "";

  //Column to hold header
  var headerCol = document.createElement("div");
  headerCol.classList = "col s12";

  //Header element showing the stock name
  var headerEl = document.createElement("h4");
  headerEl.textContent = data.quoteType.longName;

  //Append header to column
  headerCol.append(headerEl);

  //Append column to page element
  yahooEl.append(headerCol);

  //Row for company information
  var infoCardRow = document.createElement("div");
  infoCardRow.classList = "col s4";
  //Card for company information
  var infoCard = document.createElement("div");
  infoCard.classList = "card blue-grey";

  var infoCardContentEl = document.createElement("div");
  infoCardContentEl.classList = "card-content white-text";

  var infoCardTitle = document.createElement("span");
  infoCardTitle.classList = "card-title";
  infoCardTitle.textContent = "Company information";

  //Unordered list for adding info
  var infoCardContentList = document.createElement("ul");
  infoCardContentList.classList = "collection";

  //Info on country
  var infoCardLocation = document.createElement("li");
  infoCardLocation.classList = "collection-item blue-grey";
  infoCardLocation.textContent =
    "Headquarters: " +
    data.summaryProfile.city +
    ", " +
    data.summaryProfile.country;

  //Info on industry
  var infoCardIndustry = document.createElement("li");
  infoCardIndustry.classList = "collection-item blue-grey";
  infoCardIndustry.textContent = "Industry: " + data.summaryProfile.industry;

  //Summary
  var infoCardWebsite = document.createElement("li");
  infoCardWebsite.classList = "collection-item blue-grey";
  infoCardWebsite.textContent = "Website: " + data.summaryProfile.website;

  //Append content list
  infoCardContentList.append(infoCardLocation);
  infoCardContentList.append(infoCardIndustry);
  infoCardContentList.append(infoCardWebsite);
  //Append title to card
  infoCardContentEl.append(infoCardTitle);
  //Append list to card
  infoCardContentEl.append(infoCardContentList);
  //Append content to card
  infoCard.append(infoCardContentEl);
  //Append card to row
  infoCardRow.append(infoCard);
  //Append row to HTML element
  yahooEl.append(infoCardRow);

  //Row for price and other stock information
  var financeCardRow = document.createElement("div");
  financeCardRow.classList = "col s4";
  //Card for price and other stock information
  var financeCard = document.createElement("div");
  financeCard.classList = "card";

  var financeCardContent = document.createElement("div");
  financeCardContent.classList = "card-content";

  //Title for finance card
  var financeCardTitle = document.createElement("span");
  financeCardTitle.classList = "card-title";
  financeCardTitle.textContent = "Stock Information";

  //List for adding finance info
  var financeCardList = document.createElement("ul");
  financeCardList.classList = "collection";

  //Info on price
  var financeCardPrice = document.createElement("li");
  financeCardPrice.classList = "collection-item";
  financeCardPrice.textContent = "Price: $" + data.price.regularMarketPrice.raw;

  //Info on market cap
  var financeCardMarketCap = document.createElement("li");
  financeCardMarketCap.classList = "collection-item";
  financeCardMarketCap.textContent = "Market Cap: $" + data.price.marketCap.fmt;

  //info on profit margin
  var financeCardProfitMargin = document.createElement("li");
  financeCardProfitMargin.classList = "collection-item";
  financeCardProfitMargin.textContent =
    "Profit Margin: " + data.financialData.profitMargins.fmt;

  //Append price to list
  financeCardList.append(financeCardPrice);
  //append market cap to list
  financeCardList.append(financeCardMarketCap);
  //Append profit margin info to list
  financeCardList.append(financeCardProfitMargin);
  //Append title to content
  financeCardContent.append(financeCardTitle);
  //Append list to card
  financeCardContent.append(financeCardList);
  //Append title to content to card
  financeCard.append(financeCardContent);
  //Append Card to row
  financeCardRow.append(financeCard);
  //Append financeRow to HTML EL
  yahooEl.append(financeCardRow);

  //add row for stock movement data
  var movementCardRow = document.createElement("div");
  movementCardRow.classList = "col s4";
  //Card for company information
  var movementCard = document.createElement("div");
  movementCard.classList = "card blue-grey";

  var movementCardContentEl = document.createElement("div");
  movementCardContentEl.classList = "card-content white-text";

  var movementCardTitle = document.createElement("span");
  movementCardTitle.classList = "card-title";
  movementCardTitle.textContent = "Stock Movement";

  //Unordered list for adding info
  var movementCardContentList = document.createElement("ul");
  movementCardContentList.classList = "collection";

  //Info on price high
  var movementCardHigh = document.createElement("div");
  movementCardHigh.classList = "collection-item blue-grey";
  movementCardHigh.textContent =
    "52 Week High: $" + data.summaryDetail.fiftyTwoWeekHigh.raw;

  //Info on price low
  var movementCardLow = document.createElement("div");
  movementCardLow.classList = "collection-item blue-grey";
  movementCardLow.textContent =
    "52 Week Low: $" + data.summaryDetail.fiftyTwoWeekLow.raw;

  //Info on stock volume
  var movementCardVol = document.createElement("div");
  movementCardVol.classList = "collection-item blue-grey";
  movementCardVol.textContent =
    "Average Volume: " + data.summaryDetail.averageVolume.fmt;

  //Append price high to list
  movementCardContentList.append(movementCardHigh);
  //Append price low to list
  movementCardContentList.append(movementCardLow);
  //Append volume to list
  movementCardContentList.append(movementCardVol);
  //Append title to content
  movementCardContentEl.append(movementCardTitle);
  //Append list to card
  movementCardContentEl.append(movementCardContentList);
  //Append content to card
  movementCard.append(movementCardContentEl);
  //Append card to row
  movementCardRow.append(movementCard);
  //Append movementCardRow to HTML El
  yahooEl.append(movementCardRow);
};

//loads SeekinngAlpha Stock News onto screen
var loadSeekingAlphaPage = function (data) {
  //Clear content
  seekingAlphaEl.innerHTML = "";

  var newsArr = data.data;

  for (var i = 0; i < newsArr.length; i++) {
    //create column
    var newsCol = document.createElement("div");
    newsCol.classList = "col s12";

    //Create header news site
    var newsHeader = document.createElement("h6");

    //Create link
    var newsLink = document.createElement("a");
    newsLink.textContent = newsArr[i].attributes.title;
    newsLink.href = "https://www.seekingalpha.com" + newsArr[i].links.self;

    //Append link to header
    newsHeader.append(newsLink);

    //Append link to column
    newsCol.append(newsHeader);

    //Append to col to page
    seekingAlphaEl.append(newsCol);
  }
};

//function to save searches is initizialized after search button is clicked
var searchFunction = function (data) {
  recentSearches.push(data); // This line puts the value from the text box in an array

  $("#textboxSearch").val(""); //  clear the text box after search
  $("#searchHistory").text(""); //clear the seach history window then repopulate with the new array

  // the function below loops through the array and adds each item in the array
  // to the span element within the Search history arear
  $.each(recentSearches, function (index, value) {
    $("#searchHistory").append(
      "<li class='historyItem'  onclick='addtotextbox(" +
        index +
        ")'>" +
        value +
        "</li>"
    );
  });

  // saves the search resaults to local storage after search button is clicked
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
};

//loads searches from local storage
var loadSearches = function () {
  recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
  //loads the search resault if there is anything saved in localstorage
  if (recentSearches) {
    $.each(recentSearches, function (index, value) {
      $("#searchHistory").append(
        "<li class='historyItem'  onclick='addtotextbox(" +
          index +
          ")'>" +
          value +
          "</li>"
      );
    });
  } else {
    recentSearches = [];
  }
};

var addtotextbox = function (id) {
  $("#textboxSearch").val(recentSearches[id]);
};

loadSearches();
userSubmitEl.addEventListener("submit", submitHandler);
