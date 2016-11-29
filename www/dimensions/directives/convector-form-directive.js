'use strict';

(function(){
    angular.module('Conrad').directive('conConvector', conConvector)

    conConvector.$inject = ['FormConst'];

    function conConvector(FormConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/convector-form.html',
            link: function(scope, elem, attrs){
              scope.convectorHeights = FormConst.CON_HEIGHTS;
              scope.selectedHeight = scope.convectorHeights[6];

              scope.convector = {
                flow : FormConst.CON_FLOW,
                return : FormConst.CON_RETURN,
                room :FormConst.CON_ROOM,
                watt : FormConst.CON_EFFECT,
                length : FormConst.CON_LENGTH,
                height : FormConst.selectedHeight
              }

              scope.calculateConvector = function(){
                console.log(JSON.stringify(scope.convector));
              }
          }
        }
     }

})();
