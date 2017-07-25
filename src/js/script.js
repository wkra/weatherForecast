document.addEventListener("DOMContentLoaded", function () {
  // UI CONTROLLER
  var UIController = (function(){

    var DOMstrings = {
      addCityInpt: ".add-city-input",
      addCityBtn: ".add-city-btn",
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

  // WEATHER CONTROLLER
  var weatherController = (function(UIController){

    var Weather = function(city, min, max, curr, icon, alt){
      this.city = city;
      this.min = min;
      this.max = max;
      this.curr = curr;
      this.icon = icon;
      this.alt = alt;
    }

    var data = [];



      return{
        testing: function (){
          console.log(data);
        },

      getDataFromSerwer: function(url){
        var self = this;
        var weatherUrl = url;

        $.ajax({
          url: weatherUrl,
          type: "GET",
//          dataType: 'jsonp',
          cache: true,
          success: function (data, status, error) {
            self.getValuesFromData(data);
          },
          error: function (data, status, error) {
            console.log('error', data, status, error);
          }
        });

        return data;

      },
        getValuesFromData: function(data){
          var city = data.title;
          var min = this.roundValues(data.consolidated_weather[0].min_temp);
          var max = this.roundValues(data.consolidated_weather[0].max_temp);
          var curr = this.roundValues(data.consolidated_weather[0].the_temp);
          var icon = data.consolidated_weather[0].weather_state_abbr;
          var alt = data.consolidated_weather[0].weather_state_name;

          var newWeather = new Weather(city, min, max, curr, icon, alt);
          console.log(newWeather);

          return UIController.addWheatherBox(newWeather);
        },

        roundValues: function(val){
          return Math.round(val);
        },

        getData: function(){
          return data;
        }
      }
  })(UIController);
  // END WEATHER CONTROLLER



  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){

    var setupEventListeners = function(){
      //some code
    }

    var DOMstrings = UIController.getDOMstrings();

    var data = weatherController.getData();

    return {
      init: function(){
        console.log("App has started");

//        UIController.printStartData(data);
        weatherController.getDataFromSerwer('https://crossorigin.me/https://www.metaweather.com/api/location/2487956/');
        weatherController.getDataFromSerwer('https://crossorigin.me/https://www.metaweather.com/api/location/44418/');
        weatherController.getDataFromSerwer('https://crossorigin.me/https://www.metaweather.com/api/location/523920/');
        weatherController.getDataFromSerwer('https://crossorigin.me/https://www.metaweather.com/api/location/615702/');
        weatherController.getDataFromSerwer('https://crossorigin.me/https://www.metaweather.com/api/location/766273/');
        weatherController.getDataFromSerwer('https://crossorigin.me/https://www.metaweather.com/api/location/1105779/');
        weatherController.getDataFromSerwer('https://crossorigin.me/https://www.metaweather.com/api/location/1118370/');
//        setupEventListeners();
      }
    }

  })(weatherController, UIController);
  // END GLOBAL APP CONTROLLER
// end DOMContentLoaded

  controller.init();
});

