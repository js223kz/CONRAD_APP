'use strict';

(function(){
    angular.module('Conrad').directive('conFinned', conFinned)

    conFinned.$inject = ['DimConst'];

    function conFinned(DimConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/finned-form.html',
            link: function(scope, elem, attrs){
              scope.finnedFlows = DimConst.FINNED_FLOWS;
              scope.selectedFlow = DimConst.FINNED_FLOWS[7];

              scope.finnedReturns = DimConst.FINNED_RETURNS;
              scope.selectedReturn = DimConst.FINNED_RETURNS[7]

              scope.finnedRooms = DimConst.FINNED_ROOMS;
              scope.selectedRoom = DimConst.FINNED_ROOMS[0];

              scope.finned = {
                flow : scope.selectedFlow,
                return : scope.selectedReturn,
                room : scope.selectedRoom,
                watt : DimConst.FINNED_EFFECT,
                length : DimConst.FINNED_LENGTH,
              }

              scope.calculateFinned = function(){
                console.log(JSON.stringify(scope.finned));
              }
            }
        }
     }

})();
