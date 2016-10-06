var $ = require('jQuery');
var _ = require('underscore');
var handlebars = require('handlebars');

// var source   = $('#photo-album').html();
// var template = handlebars.compile(source);
//
// var context = {};
//
// $('#album-container').html(template(context));
// $('#album-container').append(template());







var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=zine&includes=Images,Shop&sort_on=score"




var source   = $("#flex-stamp").html();
var template = handlebars.compile(source);
var html;

var context = [];
var count = 16;
// for(var i=0; i<count; i++){
//
//   var card = {
//     'image': 'https://placecage.com/'+(340+(i*2))+'/'+(270+i)
//   }
//
//   context.push(card) ;
// }
//
// context.forEach(function(card){
//   html = template(card);
//   $('.flex-grid').append(html);
// });




var result = [];

function logData(data) {
   console.log(data);

   for(var i=0; i<data.results.length; i++){
      html = template(
         {
            'image': data.results[i].Images[0].url_170x135,
            'title': data.results[i].title,
            'price': data.results[i].price,
            'url':  data.results[i].url,
            'shop':
               {
                  'name': data.results[i].Shop.shop_name,
                  'url':  data.results[i].Shop.url
               }
         });
      $('.flex-grid').append(html);

   }
}



// result.forEach(function(card){
//    console.log("Card:"+card);
//    console.log(template(card));
//   html = template(card);
//   $('.flex-grid').append(html);
// });

fetchJSONP(url, logData);






/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
