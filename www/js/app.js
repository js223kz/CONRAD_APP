
var db = null;
angular.module('Conrad', ['ionic', 'ui.router', 'ngMessages', 'ngCordova'])
.run([  '$ionicPlatform',
        '$cordovaSQLite',
        'DbService',
        'DimConst',
        function($ionicPlatform, $cordovaSQLite, DbService, DimConst) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

       DbService.cloneDB(DimConst.DATABASES);

    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('index', {
          url: '/',
          templateUrl: 'dimensions/views/dimensions-main-view.html',
          controller: 'DimensionsCtrl'
      });

  $urlRouterProvider.otherwise('/');
});
