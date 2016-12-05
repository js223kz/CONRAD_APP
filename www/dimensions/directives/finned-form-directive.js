'use strict';

(function(){
    angular.module('Conrad').directive('conFinned', conFinned)

    conFinned.$inject = ['FormConst', '$timeout'];

    function conFinned(FormConst, $timeout){
        return{
          restrict: 'E',
          templateUrl: 'dimensions/views/forms/finned-form.html',

          link: function(scope, elem, attrs){
            scope.finnedFlows = FormConst.FINNED_FLOWS;
            scope.selectedFlow = FormConst.FINNED_FLOWS[7];

            scope.finnedReturns = FormConst.FINNED_RETURNS;
            scope.selectedReturn = FormConst.FINNED_RETURNS[7]

            scope.finnedRooms = FormConst.FINNED_ROOMS;
            scope.selectedRoom = FormConst.FINNED_ROOMS[0];

            let column = 'c' + scope.selectedReturn;
            let selection = 'WHERE name LIKE "' + scope.selectedFlow + scope.selectedRoom + '%"';
            let query = 'SELECT name AS artno,' + column + ' AS wpm_nom, tubes FROM article ' + selection;

            scope.finned = {
              database: FormConst.DATABASES[3],
              query: query,
              flow : scope.selectedFlow,
              return : scope.selectedReturn,
              room : scope.selectedRoom,
              effect : FormConst.FINNED_EFFECT,
              length : FormConst.FINNED_LENGTH,
              maxLen: 6000,
              minLen: 400
            }
          }
        }
      }

})();
