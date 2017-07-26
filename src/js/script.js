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
    }

    return{
      testing: function (){
        console.log(data);
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
            if($.isFunction(callback)) {callback(data);}
          },
          error: function (data, status, error) {
            console.log('error', data, status, error);
            console.log("Sorry, some problems with MetaWeather API serwer. Please refresh page.")
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

            // get woeid number
            var woeid = data[0].woeid

            if($.isFunction(callback)) {callback(woeid);}

          },
          error: function (data, status, error) {
            console.log('error', data, status, error);
          }
        });

      },

    }
  })();
  // END WEATHER CONTROLLER


  // UI CONTROLLER
  var UIController = (function(){

    var DOMstrings = {
      addCityInpt: ".add-city-input",
      addCityBtn: ".add-city-btn",
      searchCityBtn: ".search-city-btn",
      minTemp: ".temp--el__min",
      maxTemp: ".temp--el__max",
      weatherIcon: ".weather-box--el__icon",
      city: ".weather-box--el__city",
      currTemp: ".weather-box--el__curr-temp",
    };


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
      printStartData: function(startObj){
        for (i=0; i < startObj.length; i++)
          this.addWheatherBox(startObj[i]);
      }
    }

  })();
  // END UI CONTROLLER



  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){

    var setupEventListeners = function(){
      //some code
    }

    var DOMstrings = UIController.getDOMstrings();


// new Location
    var newLocation = function(cityName){

      // search location
      var location = weatherController.locationSearch(cityName, function(data){

          // location find
          if (data != false){

            locationWithWoeid(data);

          } else {
            // location not find
            console.log("Sorry, location not find, or some problems with MetaWeather API serwer");
          }


        });
    };

    // get data from serwer with function callback to add new weather forecast

    var locationWithWoeid = function (data){

      weatherController.getDataFromSerwer(data, function(data){

        // callback function for waiting for data

        // get values from data
        var valuesFromData = weatherController.getValuesFromData(data);

        // add weather forecast
        UIController.addWheatherBox(valuesFromData);

      })

    };



    return {
      init: function(){
        console.log("App has started");
//        newLocation("Warsaw");
//        newLocation("London");
//        newLocation("Paris");
//        newLocation("Chicago");
//        newLocation("Rio de Janeiro");
//        newLocation("Tokyo");
//        newLocation("Sydney");
        locationWithWoeid("455825");
        locationWithWoeid("2379574");
        locationWithWoeid("44418");
        locationWithWoeid("523920");
        locationWithWoeid("1118370");
        locationWithWoeid("1105779");
        locationWithWoeid("615702");
      }
    }

  })(weatherController, UIController);
  // END GLOBAL APP CONTROLLER


// end DOMContentLoaded

  controller.init();
});

