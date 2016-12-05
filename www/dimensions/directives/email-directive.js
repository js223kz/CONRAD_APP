'use strict';

(function(){
    angular.module('Conrad').directive('conEmail', conEmail)


    function conEmail(){
        return{
          restrict: 'E',
          template: `<div class="glyphicon glyphicon-envelope"
                          aria-hidden="true"
                          sr-only="Skicka som email"
                          ng-click="emailTable()">
                    </div>`,
          link: function(scope, elem, attrs){

            scope.emailTable = ()=>{
              console.log("email table");
            }

          }
        }
     }
})();
