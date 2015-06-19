(function(){

angular.module('opsee.global.services', []);

function moment($window){
  return $window.moment;
}
angular.module('opsee.global.services').service('moment',moment);

})();//IIFE