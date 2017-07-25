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

    var data = [];
    data[0] = new Weather ('Warsaw', 17, 21, 18, 'lr', "Light rain");
    data[1]= new Weather ('Los Angeles', 19, 27, 25, 'c', "Clear");
    data[2] = new Weather ('London', 14, 23, 16, 'hr', "Heavy Rain");
    data[3] = new Weather ('Paris', 14, 23, 16, 's', "Showers");
    data[4] = new Weather ('Madrid', 18, 31, 28, 'lc', "Light Cloud");
    data[5] = new Weather ('Oslo', 16, 23, 17, 'hc', "Heavy Cloud");
    data[6] = new Weather ('Sydney', 11, 19, 13, 't', "Heavy Cloud");


      return{
        testing: function (){
          console.log(data);
        },

      getDataFromSerwer: function(){
        var weatherUrl = 'https://www.metaweather.com/api/location/44418/' ;
//        var weatherUrl = 'api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111 ' ;
//        var weatherUrl = 'https://api.github.com/users/jeresig' ;
//                var weatherUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts%7Cpageimages&format=json&exintro=&titles=Cairns%20Customs%20House&piprop=thumbnail&pithumbsize=380&callback=jsonp_1462667223891_5118' ;
//
        $.ajax({
          url: weatherUrl,
          type: "GET",
          dataType: 'jsonp',
          cache: true,
          success: function (data, status, error) {
            console.log('success', data);
          },
          error: function (data, status, error) {
            console.log('error', data, status, error);
          }
        });
//

      },

        getData: function(){
          return data;
        }
      }
    })();
  // END WEATHER CONTROLLER

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
        UIController.printStartData(data);
        weatherController.getDataFromSerwer();
//        setupEventListeners();
      }
    }

  })(weatherController, UIController);
  // END GLOBAL APP CONTROLLER
// end DOMContentLoaded

  controller.init();
});

