'use strict';

(function(){
    angular.module('Conrad').directive('dimensionDir', dimensionDir)

    dimensionDir.$inject = ['DbService', 'DimConst', '$q', '$cordovaSQLite']

    function dimensionDir(DbService, DimConst, $q, $cordovaSQLite){
      return {
          restrict: 'E',
          link: function(scope) {
            scope.heatSystems = DimConst.HEATSYSTEMS;
            scope.selectedHeatSystem = scope.heatSystems[0];
            scope.showTable = false;

            scope.articles = null;
            scope.userInput = null;
            scope.tableArray = [];


            scope.decimalAdjust = (type, value, exp)=> {
              // If the exp is undefined or ze ro...
              if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
              }
              value = +value;
              exp = +exp;
              // If the value is not a number or the exp is not an integer...
              if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
              }
              // Shift
              value = value.toString().split('e');
              value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
              // Shift back
              value = value.toString().split('e');
              return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
            }

            scope.calc = (wpm_nom, n_koef = 1, maxLen, minLen, height_fact = null)=>{
              let values = [];
              values['effect1'] = null;
              values['effect2'] = null;
              values['length1'] = null;
              let wpm = null;

              if(wpm_nom){
                if(scope.userInput.flow - scope.userInput.return){
                wpm = Math.floor(wpm_nom * Math.pow((scope.userInput.flow - scope.userInput.return) / (Math.log((scope.userInput.flow - scope.userInput.room) /
                (scope.userInput.return - scope.userInput.room))) / ((75 - 65) / Math.log((75 - 20) / (65 - 20))), n_koef));
                }
              }

              if(wpm){
                  if(!height_fact){
                      let inputHeight = scope.userInput.height;
                      if(inputHeight <= 100)
                          height_fact = 1;
                      else if(inputHeight <= 125)
                          height_fact = 1.1;
                      else if(inputHeight <= 150)
                          height_fact = 1.2;
                      else if(inputHeight <= 200)
                          height_fact = 1.3;
                      else
                          height_fact = 1;
                  }
                  //calculate first length and round number to nearest 10
                  let length_1 = ((scope.userInput.effect * height_fact) / wpm) * 1000;
                  length_1 = scope.decimalAdjust('round',length_1, 1);
                  let effect_1 = Math.ceil((length_1 / 1000 ) * height_fact * wpm);
                  let effect_2 = Math.ceil((scope.userInput.length / 1000 ) * height_fact * wpm);



                  values['effect2'] = effect_2;

                  if(length_1 < maxLen && length_1 > minLen)
                  {
                      values['length1'] = length_1;
                      values['effect1'] = effect_1;
                  }
              }
              return values;
            }

            scope.addRow = (rowArray)=>{
              scope.tableArray.push(rowArray);
              console.log("RAD!!!!!!!!" + rowArray);
            }

            scope.setRow = (row)=>{
              let n_koef = row.n_koef.toString();
              n_koef = n_koef.replace(',', '.');
              let values = scope.calc(row.wpm_nom, n_koef, row.max_length, row.min_length);

              let rowArray = [];
              rowArray[0] = row.tubes;
              rowArray[1] = row.artno;
              rowArray[2] = values['length1'];
              rowArray[3] = values['effect1'];
              rowArray[4] = scope.userInput.length;
              rowArray[5] = values['effect2'];

              scope.addRow(rowArray);
            }



            scope.calculate = function(userInput){
              scope.showTable = true;
              scope.userInput = userInput;
              DbService.openDB(userInput.database, "article")
              .then((data)=>{
                data.forEach((row)=>{
                  scope.setRow(row);
                });


              }).catch((error)=>{
                console.log(error);
              });
            }

        }
      }
    }
})();
