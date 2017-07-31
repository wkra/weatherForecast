!function(){for(var e,t=function(){},n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],a=n.length,i=window.console=window.console||{};a--;)e=n[a],i[e]||(i[e]=t)}(),document.addEventListener("DOMContentLoaded",function(){var e=function(){var t=function(e,t,n,a,i,r){this.city=e,this.min=t,this.max=n,this.curr=a,this.icon=i,this.alt=r},n=[["523920","poland"],["44418","uk"],["615702","france"],["862592","norway"],["721943","italy"],["1118370","japan"],["753692","spain"]],a=0;return{getLoadingFlag:function(){return a},increaseLoadingFlag:function(){a++},getDataFromSerwer:function(t,n){var a=t,i=""+a;$.ajax({url:"https://crossorigin.me/https://www.metaweather.com/api/location/"+i,type:"GET",cache:!0,success:function(t,a,i){e.increaseLoadingFlag(),$.isFunction(n)&&n(t)},error:function(t,a,i){e.increaseLoadingFlag(),console.log("error",t,a,i),$.isFunction(n)&&n(!1)}})},getValuesFromData:function(e){var n=e.title,a=this.roundValues(e.consolidated_weather[0].min_temp),i=this.roundValues(e.consolidated_weather[0].max_temp),r=this.roundValues(e.consolidated_weather[0].the_temp),o=e.consolidated_weather[0].weather_state_abbr,s=e.consolidated_weather[0].weather_state_name;return new t(n,a,i,r,o,s)},roundValues:function(e){return Math.round(e)},locationSearch:function(e,t){var n=e;$.ajax({url:"https://crossorigin.me/https://www.metaweather.com/api/location/search/?query="+n,type:"GET",cache:!0,success:function(e,n,a){if($.isFunction(t))if(""==e)$.isFunction(t)&&t(!1);else{var i=e[0].woeid;t(i)}},error:function(e,n,a){console.log("error",e,n,a),$.isFunction(t)&&t(!1)}})},getStartData:function(){return n}}}(),t=function(){var e={addCityInpt:".add-city--input",addCityBtn:".add-city--button",addCityP:".add-city--p",messageSpinner:".message--spinner"};return{getDOMstrings:function(){return e},addWheatherBox:function(e,t){var n='<div class="section--item"><div class="weather-box"><div class="weather-box--el weather-box--el__temp"><div class="temp--el temp--el__min"><span><b>Min:</b> %min% &#176;C</span></div><div class="temp--el temp--el__max"><span><b>Max:</b> %max% &#176;C</span></div></div><div class="weather-box--el weather-box--el__icon"><img src="https://www.metaweather.com/static/img/weather/png/64/%icon%.png" alt="%alt%"></div><div class="weather-box--el weather-box--el__city"> <span>%city%</span></div><div class="weather-box--el weather-box--el__curr-temp"><span>%curr% &#176;C</span></div></div></div>',a=n.replace("%min%",e.min);a=a.replace("%max%",e.max),a=a.replace("%icon%",e.icon),a=a.replace("%alt%",e.alt),a=a.replace("%city%",e.city),a=a.replace("%curr%",e.curr),void 0!==t&&(a=a.replace("section--item","section--item flag--"+t)),$(".section--item__plus").before(a)},printMessage:function(t){$(e.addCityP).text(t)},getInput:function(t){return void 0===t?$(e.addCityInpt).val():$(e.addCityInpt).val(t)},addSpinner:function(){$(e.messageSpinner).addClass("message--spinner__show")},remSpinner:function(){$(e.messageSpinner).removeClass("message--spinner__show")},ableButton:function(){$(e.addCityBtn).removeClass("disabled")},backgroundScrollEffect:function(e,t,n){function a(e,t,n){var a=jQuery(n).offset(),s=a.top,c=s+jQuery(n).outerHeight();if(o>s&&r<s+$(n).height()){$(this).scrollTop();$(n).css("background-position","50%"+Math.round(e+(o-s)*(t-e)/(i+(c-s)))+"%")}}var i=jQuery(window).height(),r=jQuery(window).scrollTop(),o=i+r,s=jQuery(window).width();a(e,t,n),$(window).scroll(function(){i=jQuery(window).height(),r=jQuery(window).scrollTop(),o=i+r,s=jQuery(window).width(),a(e,t,n)})}}}();(function(e,t){var n=t.getDOMstrings(),a=function(n){e.locationSearch(n,function(e){0!=e?(r(e),t.printMessage("Location found. Prepering to add.")):(t.printMessage("Location not found."),t.remSpinner())})},r=function(n,a){e.getDataFromSerwer(n,function(n){if(0!=n){var i=e.getValuesFromData(n);t.addWheatherBox(i,a),e.getLoadingFlag()==e.getStartData().length?(t.printMessage("You can add city."),t.remSpinner(),t.ableButton()):e.getLoadingFlag()>e.getStartData().length&&(t.printMessage("Location added. You can add more!"),t.remSpinner())}else e.getLoadingFlag()==e.getStartData().length?(t.printMessage("Sorry, problem with MethaWeather API. Not all cities may by loaded."),t.remSpinner(),t.ableButton()):(t.printMessage("Sorry, problem with MethaWeather API. Please try again."),t.remSpinner())})},o=function(e){""===t.getInput()?t.printMessage("Please type a city name."):(a(t.getInput()),t.printMessage("Searching in progress..."),t.addSpinner(),t.getInput(""))},s=function(){$(n.addCityBtn).click(o),$(document).keyup(function(e){13===e.which&&o()})},c=function(e){for(i=0;i<e.length;i++)r(e[i][0],e[i][1])};return{init:function(){s(),c(e.getStartData()),t.backgroundScrollEffect(-100,100,"header")}}})(e,t).init()});