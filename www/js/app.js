// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ticks', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', function($scope, $ionicPopup) {

  $scope.title = localStorage.tickTitle || 'Touch to set title';
  $scope.count = +localStorage.tickCount || 0;

  $scope.editTitle = function() {
    $ionicPopup.prompt({
      title: 'Enter a new title:'
    }).then(function(res) {
      if (res) {
        $scope.title = localStorage.tickTitle = res;
      }
    });
  };

  $scope.confirmDelete = function() {
    $ionicPopup.confirm({
      title: 'Delete Tick Marks',
      template: 'Are you sure you want to delete all the tick marks?'
    }).then(function(res) {
      if (res) {
        $scope.setCount(0);
      }
    });
  };

  $scope.setCount = function(count) {
    $scope.count = localStorage.tickCount = count;
  };

  $scope.$watch('count', function(count) {
    $scope.ticksArray = [];
    var current;
    var n = 0;
    var i;
    for (i = 0; i < count; i++) {
      if (n === 0) {
        $scope.ticksArray.push( current = [] );
      }
      current.push(i);
      n++;
      if (n === 5) {
        n = 0;
      }
    }
  });

});
