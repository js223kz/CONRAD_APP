'use strict';

(function(){
    angular.module('Conrad').directive('conConvector', conConvector)

    conConvector.$inject = ['DimConst'];

    function conConvector(DimConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/convector-form.html',
            link: function(scope, elem, attrs){
              scope.convectorHeights = DimConst.CON_HEIGHTS;
              scope.selectedHeight = scope.convectorHeights[6];

              scope.convector = {
                flow : DimConst.CON_FLOW,
                return : DimConst.CON_RETURN,
                room :DimConst.CON_ROOM,
                watt : DimConst.CON_EFFECT,
                length : DimConst.CON_LENGTH,
                height : scope.selectedHeight
              }

              scope.calculateConvector = function(){
                console.log(JSON.stringify(scope.convector));
              }
          }
        }
     }

})();
