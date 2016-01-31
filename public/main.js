var app = angular
  .module('app', [])
;


app.controller('appController', appController);



function appController (x) {
  console.log(x);
}
