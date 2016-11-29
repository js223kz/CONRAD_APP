'use strict';

(function(){
    angular.module('Conrad').directive('conVertical', conVertical)

    conVertical.$inject = ['FormConst'];

    function conVertical(FormConst){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/vertical-form.html',
            link: function(scope, elem, attrs){
              scope.verticalFlows = FormConst.VERT_FLOWS;
              scope.selectedFlow = FormConst.VERT_FLOWS[3];

              scope.verticalReturns = FormConst.VERT_RETURNS;
              scope.selectedReturn = FormConst.VERT_RETURNS[3];

              scope.verticalLengths = FormConst.VERT_LENGTHS;
              scope.selectedLength = FormConst.VERT_LENGTHS[3];

              scope.vertical = {
                flow : scope.selectedFlow,
                return : scope.selectedReturn,
                room : FormConst.VERT_ROOM,
                length : scope.selectedLength,
                watt : FormConst.VERT_EFFECT,
                height: FormConst.VERT_HEIGHT,
              }

              scope.calculateVertical = function(){
                console.log(JSON.stringify(scope.vertical));
              }

            }
        }
     }

})();
