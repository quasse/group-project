var loadPage = function () {
  //Loads form for user to fill out
  submitHandler();
};

var submitHandler = function () {
  //loadStockinfo
  //loadSeekingAlphaInfo
  getYahooInfo();
  getSeekingAlphaInfo();
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
  //loads YahooFinance inf onto screen
  console.log("Inside Yahoo FInance page load function");
  console.log(data);
};

var loadSeekingAlphaPage = function (data) {
  //loads stock info onto screen
  console.log("inside seeking alpha page function");
  console.log(data);
};

loadPage();
