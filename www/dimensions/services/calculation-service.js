"use strict";
angular.module('Conrad')
  .factory('CalcService', [CalcService]);

  function CalcService(){
    var self = this;
    return{
      decimalAdjust: decimalAdjust,
      calculateRows: calculateRows,
      calculateVerticalRows: calculateVerticalRows
    };

    function decimalAdjust(type, value, exp){
      // If the exp is undefined or zero...
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

    /*only calculates table rows vertical system*/
    function calculateVerticalRows(obj){
      let values = [];
      values['height'] = null;
      values['effect1'] = null;
      values['effect2'] = null;
      let wpm = null;

      if(obj.userInput.height < 1000){
        obj.userInput.height = 1000;
      }

      if(obj.userInput.height > 3200){
        obj.userInput.height = 3200;
      }

      wpm = Math.round(Math.pow((((obj.userInput.flow - obj.userInput.return) /
                      Math.log((obj.userInput.flow - obj.userInput.room) /
                      (obj.userInput.return - obj.userInput.room))) / ((75 - 65) /
                      Math.log((75 - 20) / (65 - 20)))), 1.21), 2);

      values['height'] = Math.ceil(((obj.userInput.effect / obj.panel_fakt) /
                        (obj.userInput.length / 70) - (35.83333 * wpm))
                        / (5.83333 * wpm) * 100);

      if(values['height'] < 1000){
        values['height'] = 1000;
      }

      if(values['height'] > 3200){
        values['height'] = 3200;
      }
      values['height'] = Math.ceil(values['height'] / 100) * 100;
      values['effect1'] = Math.ceil(obj.panel_fakt *
                          (35.83333 + (values['height'] / 100) * 5.83333 * wpm) *
                          obj.userInput.length / 70);

      values['effect2'] = Math.round(obj.panel_fakt * ((35.83333 * wpm) +
                          (obj.userInput.length / 100) *
                          (5.83333 * wpm)) * obj.userInput.length / 70);

      return values;
    }

    /*calculate table rows for all systems
    except Vertical*/
    function calculateRows(obj){
      let values = [];
      values['effect1'] = null;
      values['effect2'] = null;
      values['length1'] = null;
      let wpm = null;

      if(obj.wpm_nom){
        if(obj.userInput.flow - obj.userInput.return){
          wpm = Math.floor(obj.wpm_nom * Math.pow((obj.userInput.flow - obj.userInput.return) /
          (Math.log((obj.userInput.flow - obj.userInput.room) /
          (obj.userInput.return - obj.userInput.room))) /
          ((75 - 65) / Math.log((75 - 20) / (65 - 20))), obj.n_koef));
        }
      }

      if(wpm){
          if(!obj.height_fact){
              let inputHeight = obj.userInput.height;
              if(inputHeight <= 100)
                  obj.height_fact = 1;
              else if(inputHeight <= 125)
                  obj.height_fact = 1.1;
              else if(inputHeight <= 150)
                  obj.height_fact = 1.2;
              else if(inputHeight <= 200)
                  obj.height_fact = 1.3;
              else
                  obj.height_fact = 1;
          }
          //calculate first length and round number to nearest 10
          let length_1 = ((obj.userInput.effect * obj.height_fact) / wpm) * 1000;
          length_1 = decimalAdjust('round',length_1, 1);
          let effect_1 = Math.ceil((length_1 / 1000 ) * obj.height_fact * wpm);
          let effect_2 = Math.ceil((obj.userInput.length / 1000 ) * obj.height_fact * wpm);

          values['effect2'] = effect_2;


          if(length_1 < obj.userInput.maxLen && length_1 > obj.userInput.minLen){
            values['length1'] = length_1;
            values['effect1'] = effect_1;
          }
      }
      return values;
    }
}
