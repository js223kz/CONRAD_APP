'use strict';

(function(){
    angular.module('Conrad').directive('conSkyline', conSkyline)

    conSkyline.$inject = ['FormConst'];

    function conSkyline(FormConst){
        return{
          restrict: 'E',
          templateUrl: 'dimensions/views/forms/skyline-form.html',
          link: function(scope, elem, attrs){
            scope.skylineFlows = FormConst.SKYLINE_FLOWS;
            scope.selectedFlow = FormConst.SKYLINE_FLOWS[7];

            scope.skylineReturns = FormConst.LLINE_RETURNS;
            scope.selectedReturn = FormConst.SKYLINE_RETURNS[7]

            scope.skylineRooms = FormConst.SKYLINE_ROOMS;
            scope.selectedRoom = FormConst.SKYLINE_ROOMS[0];

            scope.skyline = {
              database: FormConst.DATABASES[2],
              query: "SELECT * FROM " + FormConst.TABLES[0],
              flow : scope.selectedFlow,
              return : scope.selectedReturn,
              room : scope.selectedRoom,
              effect : FormConst.SKYLINE_EFFECT,
              length : FormConst.SKYLINE_LENGTH,
              maxLen: 6000,
              minLen: 400
            }
          }
        }
     }

})();
