var yahooEl = document.querySelector("#yahoo-row");

var loadPage = function () {
  //Loads form for user to fill out
  submitHandler();
  //There will be an event handler
};

var submitHandler = function () {
  //save search to local storage and append to
  getYahooInfo();
  //getSeekingAlphaInfo(); - this too
};

var getYahooInfo = function () {
  //fetch API
  fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=AMRN&region=US",
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

var getSeekingAlphaInfo = function () {
  fetch(
    "https://seeking-alpha.p.rapidapi.com/news/list?id=aapl&until=0&size=20",
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
  //loads YahooFinance info onto screen
  console.log("Inside Yahoo FInance page load function");
  console.log(data);

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
  infoCard.classList = "card blue-grey lighten-1";

  var infoCardContentEl = document.createElement("div");
  infoCardContentEl.classList = "card-content white-text";

  var infoCardTitle = document.createElement("span");
  infoCardTitle.classList = "card-title";
  infoCardTitle.textContent = "Company information";

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

  //Card for price and other stock information

  //add card for key statistics
};

var loadSeekingAlphaPage = function (data) {
  //loads SeekinngAlpha Stock News onto screen
  console.log("inside seeking alpha page function");
  console.log(data);
};

loadPage();
