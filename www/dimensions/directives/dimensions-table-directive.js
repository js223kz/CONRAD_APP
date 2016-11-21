'use strict';

(function(){
    angular.module('Conrad').directive('conTable', conTable)

    conTable.$inject = ['DbService', 'DimConst', '$q', '$cordovaSQLite']

    function conTable(DbService, DimConst, $q, $cordovaSQLite){
      return {
          restrict: 'E',
          templateUrl: 'dimensions/views/forms/dimensions-table-view.html',
          link: function(scope) {
            document.addEventListener("deviceready", onDeviceReady, false);
              function onDeviceReady(){
                  screen.lockOrientation('landscape');
              }
            }
          }
    }
})();
