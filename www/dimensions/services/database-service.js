"use strict";
angular.module('Conrad')
     .factory('DbService', ["$cordovaSQLite",
                            "$q",
                            DbService]);

    function DbService($cordovaSQLite, $q){
      return{
        cloneDB: cloneDB,
        openDB: openDB,
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

      function openDB(dbName, query){
        return $q(function(resolve, reject) {
          let data = [];
          db = window.sqlitePlugin.openDatabase({name: dbName, location: 0});
          $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
              for (var i = 0, max = res.rows.length; i < max; i++) {
                console.log("databas: " + res.rows.item(i))
                data.push(res.rows.item(i))
              }
                resolve(data);

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
          for(var i=0; i < databases.length; i++){
              window.plugins.sqlDB.copy(databases[i], 0, success, error);
          }
        });
      }

      function queryDatabase(query){
        console.log("database");
      }
}
