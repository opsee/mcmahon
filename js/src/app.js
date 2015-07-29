(function(){

  angular.module('opsee', ['ngTouch', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics', 'ngAnimate', 'angularMoment', 'opsee.global'])

  angular.module('opsee').run(function ($rootScope, $window, $q, $http, $templateCache, $location, $timeout, $document, $analytics) {

    $window.FastClick.attach(document.body);

  });

})();//IIFE