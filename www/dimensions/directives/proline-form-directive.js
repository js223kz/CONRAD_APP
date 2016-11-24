'use strict';

(function(){
    angular.module('Conrad').directive('conProline', conProline)

    conProline.$inject = ['DimConst', 'CalcService'];

    function conProline(DimConst, CalcService){
        return{
          restrict: 'E',
          templateUrl: 'dimensions/views/forms/proline-form.html',
          link: function(scope, elem, attrs, ctrl){
            scope.prolineHeights = DimConst.PRO_HEIGHTS;
            scope.selectedHeight = scope.prolineHeights[0];

            scope.proline = {
              database: DimConst.DATABASES[0],
              flow : DimConst.PRO_FLOW,
              return : DimConst.PRO_RETURN,
              room : DimConst.PRO_ROOM,
              effect : DimConst.PRO_EFFECT,
              length : DimConst.PRO_LENGTH,
              height : scope.selectedHeight
            }
            scope.setProlineRow = (row)=>{
              let n_koef = row.n_koef.toString();
              n_koef = n_koef.replace(',', '.');

              let prolineObj = {
                  userInput: scope.proline,
                  n_koef: n_koef,
                  wpm_nom: row.wpm_nom,
                  maxLen: row.max_length,
                  minLen: row.min_length,
                  height_fact: null
              }
              let values = CalcService.calculateRows(prolineObj);

              let rowArray = [];
              rowArray[0] = row.tubes;
              rowArray[1] = row.artno;
              rowArray[2] = values['length1'];
              rowArray[3] = values['effect1'];
              rowArray[4] = scope.proline.length;
              rowArray[5] = values['effect2'];
              scope.tableArray.push(rowArray);
            }

            scope.calculate = (object)=>{
              scope.getTableRows(object)
              .then((rows)=>{
                rows.forEach((row)=>{
                  scope.setProlineRow(row);
                });
                scope.showTableView();
              }).catch(scope.errorMessage);
            }
          }
        }
     }

})();
