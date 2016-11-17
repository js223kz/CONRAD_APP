'use strict';

(function(){
    angular.module('Conrad').directive('conSkyline', conSkyline)

    conSkyline.$inject = ['DimConst'];

    function conSkyline(DimConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/skyline-form.html',
            link: function(scope, elem, attrs){
              scope.skylineFlows = DimConst.SKYLINE_FLOWS;
              scope.selectedFlow = DimConst.SKYLINE_FLOWS[7];

              scope.skylineReturns = DimConst.LLINE_RETURNS;
              scope.selectedReturn = DimConst.SKYLINE_RETURNS[7]

              scope.skylineRooms = DimConst.SKYLINE_ROOMS;
              scope.selectedRoom = DimConst.SKYLINE_ROOMS[0];

              scope.skyline = {
                flow : scope.selectedFlow,
                return : scope.selectedReturn,
                room : scope.selectedRoom,
                watt : DimConst.SKYLINE_EFFECT,
                length : DimConst.SKYLINE_LENGTH,
              }

            }
        }
     }

})();
