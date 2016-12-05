"use strict";
angular.module('Conrad')
  .factory('TableService', ['CalcService', 'FormConst', TableService]);

  function TableService(CalcService, FormConst){
    return{
      setTableRow: setTableRow,
    };

    function setTableRow(row, inputObject){
      console.log("database" + inputObject.database);
      let tubes = [];
      let n_koef;
      let wpm_nom;
      let height_fact = null;
      let rowArray = [];
      let values = null;
      let convector = FormConst.DATABASES[4];
      let vertical = FormConst.DATABASES[5];

      if(inputObject.database === vertical){
        let Obj = {
            userInput: inputObject,
            panel_fakt: row.panel_fakt
        }

        values = CalcService.calculateVerticalRows(Obj);

        rowArray[0] = row.tubes;
        rowArray[1] = row.artno + (inputObject.length / 10) + row.artno_pad
        rowArray[2] = values['height'];
        rowArray[3] = values['effect1'];
        rowArray[4] = inputObject.height;
        rowArray[5] = values['effect2'];

      //all other systems but vertical
      }else{
        if(row.wpm_nom){
          wpm_nom = row.wpm_nom.toString();
          wpm_nom = wpm_nom.replace(',', '.');
        }

        if(row.n_koef){
          n_koef = row.n_koef.toString();
          n_koef = n_koef.replace(',', '.');
        }else{
          if(inputObject.database === convector){
            n_koef = 1.2;
            height_fact = 1;
          }else{
            n_koef = 1;
          }
        }

        if(row.tubes){
          tubes = Array.from(row.tubes);
        }

        let Obj = {
            userInput: inputObject,
            n_koef: n_koef,
            wpm_nom: wpm_nom,
            height_fact: height_fact
        }
        values = CalcService.calculateRows(Obj);

        rowArray[0] = tubes;
        rowArray[1] = row.artno;
        rowArray[2] = values['length1'];
        rowArray[3] = values['effect1'];
        rowArray[4] = inputObject.length;
        rowArray[5] = values['effect2'];
      }

      return rowArray;
    }

}
