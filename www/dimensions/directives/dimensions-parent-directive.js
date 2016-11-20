'use strict';

(function(){
    angular.module('Conrad').directive('dimensionDir', dimensionDir)

    dimensionDir.$inject = ['DbService', 'DimConst', '$q', '$cordovaSQLite']

    function dimensionDir(DbService, DimConst, $q, $cordovaSQLite){
      return {
          restrict: 'E',
          link: function(scope) {
            scope.heatSystems = DimConst.HEATSYSTEMS;
            scope.selectedHeatSystem = scope.heatSystems[0];
            scope.showTable = false;

            scope.calculate = function(system){
              scope.showTable = true;
              DbService.queryDatabase(system);
              console.log(JSON.stringify(system));
            }

        }
      }
    }
})();
