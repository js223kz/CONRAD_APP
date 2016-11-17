'use strict';

(function(){
    angular.module('Conrad').directive('conProline', conProline)

    conProline.$inject = ['DimConst'];

    function conProline(DimConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/proline-form.html',
            link: function(scope, elem, attrs){
              scope.prolineHeights = DimConst.PRO_HEIGHTS;
              scope.selectedHeight = scope.prolineHeights[0];
              scope.proline = {
                flow : DimConst.PRO_FLOW,
                return : DimConst.PRO_RETURN,
                room :DimConst.PRO_ROOM,
                watt : DimConst.PRO_EFFECT,
                length : DimConst.PRO_LENGTH,
                height : scope.selectedHeight
              }
          }
        }
     }

})();