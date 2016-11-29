'use strict';

(function(){
    angular.module('Conrad').directive('conLline', conLline)

    conLline.$inject = ['FormConst', '$state'];

    function conLline(FormConst, $state){
        return{
            restrict: 'E',
            templateUrl: 'dimensions/views/forms/lline-form.html',
            link: function(scope, elem, attrs){
              scope.llineFlows = FormConst.LLINE_FLOWS;
              scope.selectedFlow = FormConst.LLINE_FLOWS[7];

              scope.llineReturns = FormConst.LLINE_RETURNS;
              scope.selectedReturn = FormConst.LLINE_RETURNS[7]

              scope.llineRooms = FormConst.LLINE_ROOMS;
              scope.selectedRoom = FormConst.LLINE_ROOMS[0];

              scope.lline = {
                database: FormConst.DATABASES[1],
                query: "SELECT * FROM " + FormConst.TABLES[0],
                flow : scope.selectedFlow,
                return : scope.selectedReturn,
                room : scope.selectedRoom,
                effect : FormConst.LLINE_EFFECT,
                length : FormConst.LLINE_LENGTH,
                maxLen: 6000,
                minLen: 400
              }
            }
        }
     }
})();
