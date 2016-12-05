'use strict';

(function(){
    angular.module('Conrad').directive('conPrint', conPrint)

    conPrint.$inject = ['$ionicPlatform', '$location'];

    function conPrint($ionicPlatform, $location){
        return{
          restrict: 'E',
          template: `<div   class="glyphicon glyphicon-print"
                            aria-hidden="true"
                            sr-only="Skriv ut"
                            ng-click="print()"></div>`,
          link: function(scope, elem, attrs){

            scope.printTable = (uri)=>{
              let page = document.getElementById('calc-table').innerHTML;
              cordova.plugins.printer.print(page, 'Document.html', (res)=> {
                    alert(res ? 'Utskriften klar' : 'Utskriften avbruten');
                });
            }

          /*  scope.pickPrinter = ()=>{
              console.log("inne i pick printer");
              cordova.plugins.printer.pick((uri)=> {
                console.log("printer: " + uri);
                if(uri){
                  console.log("inne i uri: " + uri);
                  scope.printTable(uri);
                }else{
                  alert(`Tips: skicka tabellen som e-post till en enhet som är ansluten till en skrivare`);
                }
              });
            }*/

            scope.print = ()=>{
              document.addEventListener('deviceready', function () {
                cordova.plugins.printer.check((avail, count)=> {
                   if(avail){
                    scope.printTable();
                  }else{
                    alert("Enheten har ingen utskriftsfunktion.");
                  }
                });
              }, false);

            }

          }
        }
     }
})();
