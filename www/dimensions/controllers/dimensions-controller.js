'use strict';

(function(){
    angular.module('Conrad').controller('DimensionsCtrl', DimensionsCtrl)

    DimensionsCtrl.$inject = ['$scope', 'DimConst', 'DbService', '$q']

    function DimensionsCtrl($scope, DimConst, DbService, $q){
      $scope.heatSystems = DimConst.HEATSYSTEMS;
      $scope.selectedHeatSystem = $scope.heatSystems[0];
      $scope.showTable = false;
      $scope.articles = null;
      $scope.userInput = null;
      $scope.error = null;
      $scope.tableArray = [];

      $scope.errorMessage = (error)=>{
        $scope.error = error;
      }

      $scope.showTableView = ()=>{
        return $scope.showTable = true;
      }

      $scope.getTableRows = (input)=>{
        return $q((resolve, reject)=> {
          DbService.openDB(input.database, "article")
          .then((data)=>{
            resolve(data);
          }).catch((error)=>{
            reject(error);
          });
        });
      }
     }
})();
