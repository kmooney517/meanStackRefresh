var app = angular
  .module('app', [])
  .constant('SERVER', {
    URL: 'https://boiling-wildwood-85823.herokuapp.com',
    CONFIG: {
      headers: {}
    }
  });

app.controller('appController', appController);

function appController ($scope, $http, SERVER) {

  var url = SERVER.URL;

  refresh();
  function refresh() {
    $http.get(url+ '/contactList', SERVER.CONFIG).success(function(res) {
      console.log(res);
      $scope.contactList = res;
    });
    $scope.contact = {};
  }


  $scope.addContact = function() {
    $http.post(url+ '/contactList', $scope.contact).success(function(res) {
      console.log(res);
    });
    refresh();
  }

  $scope.removeContact = function(id) {
    $http.delete(url+ '/contactList/' + id).success(function(res) {
      refresh();
    });
  }

  $scope.editContact = function(id) {
    console.log(id);
    $http.get(url+ '/contactList/' + id).success(function(res) {
      $scope.contact = res;
    });
  }

  $scope.updateContact = function () {
    console.log('hi', $scope.contact._id);
    $http.put(url+ '/contactList/' + $scope.contact._id, $scope.contact).success(function(res) {
      console.log(res);
      refresh();
    });
  }

  $scope.deselect = function () {
    $scope.contact = {};
  }




}
