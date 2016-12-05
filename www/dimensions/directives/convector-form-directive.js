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


            let selection = 'WHERE height = ' + scope.selectedHeight;
            let query = 'SELECT artno, wpm_nom, tubes FROM article ' + selection;

            scope.convector = {
              database: FormConst.DATABASES[4],
              query: query,
              flow : FormConst.CON_FLOW,
              return : FormConst.CON_RETURN,
              room : FormConst.CON_ROOM,
              effect : FormConst.CON_EFFECT,
              length : FormConst.CON_LENGTH,
              height : scope.selectedHeight,
              maxLen: 6000,
              minLen: 400
            }
          }
        }
     }
})();
