!function(){for(var n,e=function(){},o=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],t=o.length,i=window.console=window.console||{};t--;)n=o[t],i[n]||(i[n]=e)}(),document.addEventListener("DOMContentLoaded",function(){var n=function(){return{data:function(){$.ajax({url:"https://www.metaweather.com/api/location/44418/",type:"GET",dataType:"jsonp",cache:!0,success:function(n,e,o){console.log("success",n)},error:function(n,e,o){console.log("error",n,e,o)}})}}}();(function(n,e){return{init:function(){console.log("App has started"),n.data()}}})(n).init()});