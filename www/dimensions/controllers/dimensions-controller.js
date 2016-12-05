'use strict';

(function(){
    angular.module('Conrad').controller('DimensionsCtrl', DimensionsCtrl)

    DimensionsCtrl.$inject = ['$scope', 'FormConst', 'DbService', '$q', '$state']

    function DimensionsCtrl($scope, FormConst, DbService, $q, $state){
      $scope.heatSystems = FormConst.HEATSYSTEMS;
      $scope.selectedHeatSystem = $scope.heatSystems[0];
      $scope.error = null;

      $scope.errorMessage = (error)=>{
        $scope.error = error;
      }

      $scope.calculateRows = (inputObject)=>{
        $state.go('table', {obj:inputObject})
      }
     }
})();
