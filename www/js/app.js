
var db = null;
angular.module('Conrad', ['ionic', 'ui.router', 'ngMessages', 'ngCordova'])
.run([  '$ionicPlatform',
        'DbService',
        'FormConst',
        function($ionicPlatform, DbService, FormConst) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      DbService.cloneDB(FormConst.DATABASES);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('form', {
          url: '/',
          templateUrl: 'dimensions/views/form-view.html',
          controller: 'DimensionsCtrl'
      })
      .state('table', {
          url: '/tabell',
          templateUrl: 'dimensions/views/table-view.html',
          params:{obj:null},
          controller: 'TableCtrl'
      });

      $urlRouterProvider.otherwise('/');
});
