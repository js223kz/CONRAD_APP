'use strict';

(function(){
    angular.module('Conrad').directive('conProline', conProline)

    conProline.$inject = ['FormConst', 'CalcService', '$state'];

    function conProline(FormConst, CalcService, $state){
        return{
          restrict: 'E',
          templateUrl: 'dimensions/views/forms/proline-form.html',
          link: function(scope, elem, attrs, ctrl){
            scope.prolineHeights = FormConst.PRO_HEIGHTS;
            scope.selectedHeight = scope.prolineHeights[0];

            scope.proline = {
              database: FormConst.DATABASES[0],
              query: "SELECT * FROM " + FormConst.TABLES[0],
              flow : FormConst.PRO_FLOW,
              return : FormConst.PRO_RETURN,
              room : FormConst.PRO_ROOM,
              effect : FormConst.PRO_EFFECT,
              length : FormConst.PRO_LENGTH,
              height : scope.selectedHeight,
              maxLen: 6000,
              minLen: 400
            }
          }
        }
     }

})();
