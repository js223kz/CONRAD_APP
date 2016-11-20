'use strict';

(function(){
    angular.module('Conrad').directive('conLline', conLline)

    conLline.$inject = ['DimConst'];

    function conLline(DimConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/lline-form.html',
            link: function(scope, elem, attrs){
              scope.llineFlows = DimConst.LLINE_FLOWS;
              scope.selectedFlow = DimConst.LLINE_FLOWS[7];

              scope.llineReturns = DimConst.LLINE_RETURNS;
              scope.selectedReturn = DimConst.LLINE_RETURNS[7]

              scope.llineRooms = DimConst.LLINE_ROOMS;
              scope.selectedRoom = DimConst.LLINE_ROOMS[0];

              scope.lline = {
                flow : scope.selectedFlow,
                return : scope.selectedReturn,
                room : scope.selectedRoom,
                watt : DimConst.LLINE_EFFECT,
                length : DimConst.LLINE_LENGTH,
              }

              scope.calculateLline= function(){
                console.log(JSON.stringify(scope.lline));
              }

            }
        }
     }

})();
