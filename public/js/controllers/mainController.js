var app = angular
  .module('app', [])
;

app.controller('appController', appController);

function appController ($scope, $http) {

  var vm = this;

  vm.getContacts = getContacts;
  vm.addContact = addContact;
  vm.removeContact = removeContact;
  vm.editContact = editContact;
  vm.updateContact = updateContact;
  vm.deselect = deselect;


  getContacts();
  function getContacts() {
    $http.get('/contactList').success(function(res) {
      console.log(res);
      vm.contactList = res;
    });

    $scope.$on('refreshList', function() {
      $http.get('/contactList').success(function(res) {
        vm.contactList = res;
      });
    });
  }


  function addContact() {
    if(vm.contact === undefined) {
      alert('Nope, nope, nope.');
    } else {
      $http.post('/contactList', vm.contact).success(function(res) {
        console.log(res);
        $scope.$broadcast('refreshList');
      });
      vm.contact = {};
    }
  }

  function removeContact(id) {
    $http.delete('/contactList/' + id).success(function(res) {
      console.log(res);
      $scope.$broadcast('refreshList');
    });

  }
  
  function editContact(id) {
    $http.get('contactList/' + id).success(function(res) {
      vm.contact = res;
      $scope.$broadcast('refreshList');
    });    

    $('.editBtns').removeClass('hidden').addClass('shown');
    $('.addBtn').addClass('hidden');


  }

  function updateContact() {
    $http.put('contactList/' + vm.contact._id, vm.contact).success(function(res) {
      $scope.$broadcast('refreshList');
    });

    vm.contact = {};
    $('.addBtn').removeClass('hidden').addClass('shown');
    $('.editBtns').removeClass('shown').addClass('hidden');


  }

  function deselect() {
    vm.contact = {}; 
    $('.addBtn').removeClass('hidden').addClass('shown');
    $('.editBtns').removeClass('shown').addClass('hidden');
  }




}
