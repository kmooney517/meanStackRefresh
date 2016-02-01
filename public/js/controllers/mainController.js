var app = angular
  .module('app', [])
;

app.controller('appController', appController);

function appController ($scope, $http) {

  let vm = this;

  vm.refresh = refresh;
  vm.addContact = addContact;
  vm.removeContact = removeContact;
  vm.editContact = editContact;
  vm.updateContact = updateContact;
  vm.deselect = deselect;


  refresh();
  function refresh() {
    $http.get('/contactList').success(function(res) {
      console.log(res);
      $scope.contactList = res;
    });
    $scope.contact = {};
  }


  function addContact() {
    $http.post('/contactList', $scope.contact).success(function(res) {
      console.log(res);
    });
    refresh();
  }

  function removeContact(id) {
    $http.delete('/contactList/' + id).success(function(res) {
    });
    refresh();  
  }
  
  function editContact(id) {
    $http.get('contactList/' + id).success(function(res) {
      $scope.contact = res;
    });    
  }

  function updateContact() {
    console.log('hi', $scope.contact._id);
    $http.put('contactList/' + $scope.contact._id, $scope.contact).success(function(res) {
      console.log(res);
      refresh();
    });
  }

  function deselect() {
    $scope.contact = {}; 
  }




}
