"use strict";
angular.module('Conrad')
  .factory('TableService', ['CalcService', TableService]);

  function TableService(CalcService){
    return{
      setTableRow: setTableRow,
    };

    function setTableRow(row, inputObject){
      let tubes = [];
      let n_koef;
      if(row.n_koef){
        n_koef = row.n_koef.toString();
        n_koef = n_koef.replace(',', '.');
      }else{
        n_koef = 1;
      }

      if(row.tubes){
        Array.from(row.tubes);
      }
      
      let Obj = {
          userInput: inputObject,
          n_koef: n_koef,
          wpm_nom: row.wpm_nom,
          height_fact: null
      }
      let values = CalcService.calculateRows(Obj);

      let rowArray = [];
      rowArray[0] = tubes;
      rowArray[1] = row.artno;
      rowArray[2] = values['length1'];
      rowArray[3] = values['effect1'];
      rowArray[4] = inputObject.length;
      rowArray[5] = values['effect2'];
      return rowArray;
    }

}
/*class Finned extends Base
{

    protected function query()
    {
        $col = 'c' . $this->input->return;
        $where = 'WHERE name LIKE "' . $this->input->flow . $this->input->room . '%"';

        $query = 'SELECT name AS artno,' . $col . ' AS wpm_nom, tubes FROM article ' . $where;

        return $query;
    }

    protected function setRow($row)
    {
        $values = $this->calc($row->wpm_nom, null);

        $arr = array();
        $arr[] = $this->addTubes($row->tubes);
        $arr[] = $row->artno;
        $arr[] = $values['length'];
        $arr[] = $values['watt2'];
        $arr[] = $this->input->length;
        $arr[] = $values['watt1'];

        $this->addRow($arr);
    }

}*/
