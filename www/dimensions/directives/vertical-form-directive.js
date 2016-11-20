'use strict';

(function(){
    angular.module('Conrad').directive('conVertical', conVertical)

    conVertical.$inject = ['DimConst'];

    function conVertical(DimConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/vertical-form.html',
            link: function(scope, elem, attrs){
              scope.verticalFlows = DimConst.VERT_FLOWS;
              scope.selectedFlow = DimConst.VERT_FLOWS[3];

              scope.verticalReturns = DimConst.VERT_RETURNS;
              scope.selectedReturn = DimConst.VERT_RETURNS[3];

              scope.verticalLengths = DimConst.VERT_LENGTHS;
              scope.selectedLength = DimConst.VERT_LENGTHS[3];

              scope.vertical = {
                flow : scope.selectedFlow,
                return : scope.selectedReturn,
                room : DimConst.VERT_ROOM,
                length : scope.selectedLength,
                watt : DimConst.VERT_EFFECT,
                height: DimConst.VERT_HEIGHT,
              }

              scope.calculateVertical = function(){
                console.log(JSON.stringify(scope.vertical));
              }

            }
        }
     }

})();
