'use strict';

(function(){
    angular.module('Conrad').controller('TableCtrl', TableCtrl)

    TableCtrl.$inject = ['$scope','DbService', 'TableService', 'FormConst', '$q', '$state', '$stateParams']

    function TableCtrl($scope, DbService, TableService, FormConst, $q, $state, $stateParams){
      let inputObject = $stateParams.obj;
      let database = inputObject.database;
      let inputQuery = inputObject.query;
      let descQuery = "SELECT * FROM " + FormConst.TABLES[1];
      $scope.tableArray = [];
      $scope.descriptionArray = [];
      $scope.error = null;

      $scope.errorMessage = (error)=>{
        $scope.error = error;
      }

      $scope.goBack = ()=>{
        $scope.tableArray = [];
        $scope.descriptionArray = [];
        $state.go('form');
      }

      $scope.setDescription = (rows)=>{
        rows.forEach((row)=>{
          $scope.descriptionArray.push(row);
        });
      }

      $scope.setRows = (rows)=>{
        rows.forEach((row)=>{
            $scope.tableArray.push(TableService.setTableRow(row, inputObject));
        });

        DbService.openDB(database, descQuery)
        .then($scope.setDescription)
        .catch($scope.errorMessage);
      }

      $scope.getTableRows = ()=>{
          DbService.openDB(database, inputQuery)
          .then($scope.setRows)
          .catch($scope.errorMessage);
      }
      $scope.getTableRows();
    }
})();
