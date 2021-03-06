'use strict';
module.exports = function(CoffeeShop) {
  CoffeeShop.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is ' + currentHour);
    var response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business. We are still open for about ' +
                  (CLOSE_HOUR - currentHour) + ' hours.';
    }
    else {
      response = 'Sorry but we are closed. Only about ' +
                  (((OPEN_HOUR + 24) % CLOSE_HOUR) -
                  (currentHour % CLOSE_HOUR)) +
                   ' hours till we are open! \n' +
                  'Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };
  CoffeeShop.remoteMethod(
    'status',
    {
      http: {path: '/status', verb: 'get'},
      returns: {arg: 'status', type: 'string'},
    }
  );
};
