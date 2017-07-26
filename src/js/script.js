document.addEventListener("DOMContentLoaded", function () {


  // WEATHER CONTROLLER
  var weatherController = (function(){

    var Weather = function(city, min, max, curr, icon, alt){
      this.city = city;
      this.min = min;
      this.max = max;
      this.curr = curr;
      this.icon = icon;
      this.alt = alt;
    };

    var startData = ["455825", "2379574", "44418", "523920", "1118370", "1105779", "615702"];
//    var startData = ["Warsaw", "London", "Paris", "Chicago", "Rio de Janeiro", "Tokyo", "Sydney"];

    var loadingFlag = 0;

    return {
      testing: function (){
        console.log(data);
      },

      getLoadingFlag: function(){
        return loadingFlag;
      },
      increaseLoadingFlag: function(){
        loadingFlag++;

      },

      getDataFromSerwer: function(woeid, callback){

        var weatherUrl = 'https://crossorigin.me/https://www.metaweather.com/api/location/';
        var numWoeid = woeid;
        var stringWoeid = '' + numWoeid;

        $.ajax({
          url: weatherUrl + stringWoeid,
          type: "GET",
          cache: true,
          success: function (data, status, error) {

            //increase loading flag
            weatherController.increaseLoadingFlag();

            //function callback
            if($.isFunction(callback)) {callback(data);};

          },
          error: function (data, status, error) {

            //increase loading flag
            weatherController.increaseLoadingFlag();
            console.log('error', data, status, error);

            //function callback
            if($.isFunction(callback)) {callback(false);};


          }
        });

      },
      getValuesFromData: function(data){
        var city = data.title;
        var min = this.roundValues(data.consolidated_weather[0].min_temp);
        var max = this.roundValues(data.consolidated_weather[0].max_temp);
        var curr = this.roundValues(data.consolidated_weather[0].the_temp);
        var icon = data.consolidated_weather[0].weather_state_abbr;
        var alt = data.consolidated_weather[0].weather_state_name;

        var newWeather = new Weather(city, min, max, curr, icon, alt);

        return newWeather;
      },

      roundValues: function(val){
        return Math.round(val);
      },
      locationSearch: function(name, callback){

        var cityName = name;
        var searchUrl = 'https://crossorigin.me/https://www.metaweather.com/api/location/search/?query=';

        $.ajax({
          url: searchUrl + cityName,
          type: "GET",
          cache: true,
          success: function (data, status, error) {

            if($.isFunction(callback)) {

              if (data == ""){

                // location not found
                if($.isFunction(callback)) {callback(false);}

              } else {
                // get woeid number
              var woeid = data[0].woeid
              callback(woeid);}
            }
          },
          error: function (data, status, error) {
            console.log('error', data, status, error);
            if($.isFunction(callback)) {callback(false);}
          }
        });

      },

      getStartData: function(){
        return startData;
      },

    }
  })();
  // END WEATHER CONTROLLER


  // UI CONTROLLER
  var UIController = (function(){

    var DOMstrings = {
      addCityInpt: ".add-city--input",
      addCityBtn: ".add-city--button",
      addCityP: ".add-city--p",
      messageSpinner: ".message--spinner",
    };

    //public methods
    return {
      getDOMstrings: function(){
        return DOMstrings;
      },
      addWheatherBox: function(addObj){
        var html = '<div class="section--item"><div class="weather-box"><div class="weather-box--el weather-box--el__temp"><div class="temp--el temp--el__min"><span><b>Min:</b> %min% &#176;C</span></div><div class="temp--el temp--el__max"><span><b>Max:</b> %max% &#176;C</span></div></div><div class="weather-box--el weather-box--el__icon"><img src="https://www.metaweather.com/static/img/weather/png/64/%icon%.png" alt="%alt%"></div><div class="weather-box--el weather-box--el__city"> <span>%city%</span></div><div class="weather-box--el weather-box--el__curr-temp"><span>%curr% &#176;C</span></div></div></div>';

        // replace placeholder text
        var newHtml = html.replace('%min%', addObj.min);
        newHtml = newHtml.replace('%max%', addObj.max);
        newHtml = newHtml.replace('%icon%', addObj.icon);
        newHtml = newHtml.replace('%ialt%', addObj.alt);
        newHtml = newHtml.replace('%city%', addObj.city);
        newHtml = newHtml.replace('%curr%', addObj.curr);

        // insert HTML into DOM
        $(".section--item__plus").before(newHtml);
      },

      // print Mesage
      printMessage: function(message){
        $(DOMstrings.addCityP).text(message);
      },

      // get input value
      getInput: function(data){
        if (data === undefined){
          return $(DOMstrings.addCityInpt).val();
        } else {
          return $(DOMstrings.addCityInpt).val(data);
        }
      },

      // add spinner
      addSpinner: function(){
      $(DOMstrings.messageSpinner).addClass("message--spinner__show");
      },

    // rem spinner
      remSpinner: function(){
      $(DOMstrings.messageSpinner).removeClass("message--spinner__show");
      },

      //able button
      ableButton: function(){
      $(DOMstrings.addCityBtn).removeClass("disabled");
    },



    }

  })();
  // END UI CONTROLLER



  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){

    var DOMstrings = UIController.getDOMstrings();


// new Location
    var searchLocation = function(cityName){

      // search location
      var location = weatherController.locationSearch(cityName, function(data){
        // callback function for waiting for data


          // location find
          if (data != false){

            locationWithWoeid(data);
            UIController.printMessage("Location found. Prepering to add.");

          } else {
            // location not find
            UIController.printMessage("Location not found.");

            //rem spinner
            UIController.remSpinner();
          }


        });
    };

    // get data from serwer with function callback to add new weather forecast

    var locationWithWoeid = function (data){

      weatherController.getDataFromSerwer(data, function(data){
        // callback function for waiting for data

        if (data != false){
        // get values from data
        var valuesFromData = weatherController.getValuesFromData(data);

        // add weather forecast
        UIController.addWheatherBox(valuesFromData);

          if (weatherController.getLoadingFlag() == weatherController.getStartData().length){

            // print message loading completed
            UIController.printMessage("You can add city.");

            //rem spinner
            UIController.remSpinner();

            // able button
            UIController.ableButton();

          }
          else if (weatherController.getLoadingFlag() > weatherController.getStartData().length){

            // print message location added
            UIController.printMessage("Location added. You can add more!");

            //rem spinner
            UIController.remSpinner();
          }



        }
        else {
          if (weatherController.getLoadingFlag() == weatherController.getStartData().length){

            // print message loading completed
            UIController.printMessage("Sorry, problem with MethaWeather API. Not all cities may by loaded.");

            //rem spinner
            UIController.remSpinner();

            // able button
            UIController.ableButton();

          } else {
          // location not find
          UIController.printMessage("Sorry, problem with MethaWeather API. Please try again.");

          // rem spinner
          UIController.remSpinner();
          }
        }
      })

    };

    var startSearch = function(l){

      if (UIController.getInput() === ""){
        UIController.printMessage("Please type a city name.");
      } else {
        console.log(UIController.getInput());
        searchLocation(UIController.getInput());

        // print message
        UIController.printMessage("Searching in progress...");

        // add spinner
        UIController.addSpinner();

        // rem text from input
        UIController.getInput("");
      }
    };

    // events listeners
    var setupEventListeners = function(){

      // Add city btn
      $(DOMstrings.addCityBtn).click(startSearch);

      // Enter key
      $(document).keyup(function(e){
        if (e.which === 13){
          startSearch();
        }

      })
    };

    // show start data
    var startDataFunc = function(data){
      for (i=0; i < data.length; i++){
        //        searchLocation(data[i]);
        locationWithWoeid(data[i]);
      }
    };


    return {
      init: function(){
        console.log("App has started");
        setupEventListeners()
        startDataFunc(weatherController.getStartData());
      }
    }

  })(weatherController, UIController);
  // END GLOBAL APP CONTROLLER


// end DOMContentLoaded

  controller.init();
});

