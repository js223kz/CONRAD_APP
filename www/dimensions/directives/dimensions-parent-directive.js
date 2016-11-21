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

            scope.calc = (wpm_nom, n_koef = 1, maxLen, minLen, height_fact = null)=>{
              let values = [];
              values['watt1'] = null;
              values['watt2'] = null;
              values['length'] = null;
              let wpm = null;
              console.log("KOEF: " + n_koef);

/*$field[1] = 90;     //Watt?
$field[2] = 75;     //Return?
$field[3] = 25;     //Room?
$field[4] = 125;    //Height?
$field[5] = 2000;   //Output?
$field[6] = 4500;   //Length?*/
              let test = scope.userInput.flow - scope.userInput.return;
              if(wpm_nom){
                console.log("division: " + test);
                if(scope.userInput.flow - scope.userInput.return){
                wpm = wpm_nom * Math.pow((scope.userInput.flow - scope.userInput.return) / (Math.log((scope.userInput.flow - scope.userInput.room) /
                (scope.userInput.return - scope.userInput.room))) / ((75 - 65) / Math.log((75 - 20) / (65 - 20))), n_koef);
                    console.log("WPM ensam: " + Math.floor(wpm));
                }
              }

              if(wpm){
                console.log("if wpm" + wpm);
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
                  console.log("Längd: " + scope.userInput.length);
                  console.log("höjdfakt: " + height_fact);
                  console.log("WPM: " + wpm);
                  let w1 = Math.ceil((scope.userInput.length / 1000 ) * height_fact * wpm);
                  let le = Math.round((scope.userInput.effect * height_fact) / wpm) * 1000;
                  let w2 = Math.ceil((le / 1000 ) * height_fact * wpm);

                  values['watt1'] = w1;

                  if(le < maxLen && le > minLen)
                  {
                      values['length'] = le;
                      values['watt2'] = w2;
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
              //rowArray['tubes'] = $this->addTubes($row->tubes);
              rowArray[0] = row.artno;
              rowArray[1] = values['length'];
              rowArray[2] = values['watt2'];
              rowArray[3] = scope.userInput.length;
              rowArray[4] = values['watt1'];

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
