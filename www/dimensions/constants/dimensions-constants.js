'use strict';

(function(){

    angular.module('Conrad')
        .constant('DimConst', {

          DATABASES : [
            "Proline.sqlite",
            "Lline.sqlite",
            "Skyline.sqlite",
            "Finned.sqlite",
            "Convectors.sqlite",
            "Vertical.sqlite"
          ],

          //dropdown values dimensions
          HEATSYSTEMS: [
            "Proline",
            "L-line",
            "Skyline",
            "Kamrör",
            "Konvektorer + Radiatorer",
            "Vertical"
          ],
          //proline form default values
          PRO_FLOW: 75,
          PRO_RETURN: 65,
          PRO_ROOM: 20,
          PRO_EFFECT: 2000,
          PRO_LENGTH: 4500,
          PRO_HEIGHTS: [100, 125, 150, 200],

          //lline form default values
          LLINE_FLOWS: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
          LLINE_RETURNS: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
          LLINE_ROOMS: [20, 25],
          LLINE_EFFECT: 2000,
          LLINE_LENGTH: 4500,

          //skyline form default values
          SKYLINE_FLOWS: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
          SKYLINE_RETURNS: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
          SKYLINE_ROOMS: [20, 25],
          SKYLINE_EFFECT: 2000,
          SKYLINE_LENGTH: 4500,

          //finned form default values
          FINNED_FLOWS: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
          FINNED_RETURNS: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
          FINNED_ROOMS: [20, 25],
          FINNED_EFFECT: 2000,
          FINNED_LENGTH: 4500
      });
}());
