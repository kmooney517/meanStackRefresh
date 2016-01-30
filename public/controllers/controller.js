var app = angular
  .module('app', [])
  .constant('SERVER', {
    URL:'https://boiling-wildwood-85823.herokuapp.com',
    CONFIG: {
      headers: {}
    }
  });

app.controller('appController', appController);

function appController ($scope, $http, SERVER) {

  let url = SERVER.URL + '/contactList/';

  refresh();
  function refresh() {
    $http.get(url, SERVER.CONFIG).success(function(res) {
      console.log(res);
      $scope.contactList = res;
    });
    $scope.contact = {};
  }


  $scope.addContact = function() {
    $http.post(url, $scope.contact, SERVER.CONFIG).success(function(res) {
      console.log(res);
    });
    refresh();
  }

  $scope.removeContact = function(id) {
    $http.delete(url + id, SERVER.CONFIG).success(function(res) {
      refresh();
    });
  }

  $scope.editContact = function(id) {
    console.log(id);
    $http.get(url + id, SERVER.CONFIG).success(function(res) {
      $scope.contact = res;
    });
  }

  $scope.updateContact = function () {
    console.log('hi', $scope.contact._id);
    $http.put(url + $scope.contact._id, $scope.contact, SERVER.CONFIG).success(function(res) {
      console.log(res);
      refresh();
    });
  }

  $scope.deselect = function () {
    $scope.contact = {};
  }




}
