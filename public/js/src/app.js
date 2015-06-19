(function(){

  angular.module('opsee', ['ngTouch', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics', 'ui.router', 'ngAnimate', 'opsee.global'])

  angular.module('opsee').run(function ($rootScope, $window, $q, $http, $templateCache, $location, $timeout, $document, $analytics, $state) {

    $window.FastClick.attach(document.body);

  });

})();//IIFE