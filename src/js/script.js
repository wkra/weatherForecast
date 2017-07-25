document.addEventListener("DOMContentLoaded", function () {
// WEATHER CONTROLLER
  var weatherController = (function(){

      return{
      data: function(){
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

      }

      }
    })();
  // END WEATHER CONTROLLER

  // UI CONTROLLER
  var UIController = (function(){

    return

  })();
  // END UI CONTROLLER

  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){

    return {
      init: function(){
        console.log("App has started");
        weatherController.data();
      }
    }

  })(weatherController, UIController);
  // END GLOBAL APP CONTROLLER
// end DOMContentLoaded

  controller.init();
});

