var OSRM = require('./src/osrm');

var osrm = new OSRM();
const fs = require('fs');

// add [lng,lat] below. The array should include all the spot you want to include in the route.
const coords = [[-70.180043, 48.244038], [-70.180043, 48.244038], [-71.078611, 48.386610], [-71.031802, 48.444089], [-69.715547, 48.149665]];

//Below is the magic part!
    osrm.route({coordinates: coords, steps: true, geometries: 'geojson' }, function(error, response) {

        var route = response.routes[0].geometry.coordinates; //This would give you the route coordinates [lng, lat]

        //Change the route to [lat,lng] so that leaflet could understand.
        var arrCoordinates =[];
        Array.from(route, function (i) {
            arrCoordinates.push(lnglatTolatlng(i));
        });

        function lnglatTolatlng(arr) {
            var latlng = [];
            latlng[0] = arr[1];
            latlng[1] = arr[0];
            return latlng;
        }

        // write the file to json!
        const content = JSON.stringify(arrCoordinates);

        fs.writeFile("routelatlng.json", content, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    });


