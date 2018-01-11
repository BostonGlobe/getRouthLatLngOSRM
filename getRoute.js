var OSRM = require('./src/osrm');

var osrm = new OSRM();
const fs = require('fs');

// add [lng,lat] below. The array should include all the spot you want to include in the route.
const coords = [[-71.0913604, 42.3398067],[-71.0569118, 42.3581058], [-71.0698143,42.4275271]];

//Below is the magic part!
    osrm.route({coordinates: coords, steps: true, geometries: 'geojson' }, function(error, response) {
        // console.log(response);

        var route = response.routes[0].geometry.coordinates; //This would give you the route coordinates [lng, lat]
        // console.log(response.routes[0].legs);


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


