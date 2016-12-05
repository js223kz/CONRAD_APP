
var db = null;
angular.module('Conrad', ['ionic', 'ui.router', 'ngMessages', 'ngCordova', 'ngIOS9UIWebViewPatch'])
.run([  '$ionicPlatform',
        'DbService',
        'FormConst',
        function($ionicPlatform, DbService, FormConst) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

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
