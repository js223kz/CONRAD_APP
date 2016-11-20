"use strict";
angular.module('Conrad')
     .factory('DbService', ["DimConst",
                            "$cordovaSQLite",
                            "$q",
                            DbService]);

    function DbService(DimConst, $cordovaSQLite, $q){
      var self = this;
      return{
        cloneDB: cloneDB,
        openDB: openDB,
        error: error,
        success: success,
        queryDatabase: queryDatabase
      };

      function success(){
        return $q(function(resolve, reject) {
          console.log("success");
          resolve();
        });
      }

      function error(error){
        return $q(function(resolve, reject) {
          if(error.code == 516){
            console.log("success");
            resolve();
          }else{
            console.log("error");
            reject();
          }
        });
      }

      function openDB(dbName = DimConst.DATABASES[0]){
        return $q(function(resolve, reject) {
          db = window.sqlitePlugin.openDatabase({name: dbName, location: 0});
          var query = "SELECT * FROM input_fields";
          $cordovaSQLite.execute(db, query, []).then(function(res) {
             if(res.rows.length > 0) {
               console.log(JSON.stringify(res.rows.item(1)));
               resolve("kan läsa");

             } else {
                reject("inga rader");
             }
          }, function (err) {
              reject("funkar inte");
          });
        });
      };
      function cloneDB(databases){
        return $q(function(resolve, reject) {
          for(var i=0; i<databases.length; i++){
              window.plugins.sqlDB.copy(databases[i], 0, success, error);
          }
        });
      }

      function queryDatabase(query){
        console.log("database");
      }
}
