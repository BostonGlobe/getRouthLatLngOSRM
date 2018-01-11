# Finds the lat&lng of the fastest route between coordinates using osrm.js

Using [Open Source Routing Machine - OSRM](https://github.com/Project-OSRM/osrm-backend) library that uses the REST http API
that is exposed by ```osrm-routed```.

Can be used with NodeJS and with browserify.

# Example

```js
var OSRM = require('./src/osrm');

var osrm = new OSRM();
const fs = require('fs');

// add [lng,lat] below. The array should include all the spot you want to include in the route. Actually, this is the only part you should change.
// this example showed the route from Northeastern University to 53 State Street to Malden
const coords = [[-71.0913604, 42.3398067],[-71.0569118, 42.3581058], [-71.0698143,42.4275271]];

//Below is the magic part!
    osrm.route({coordinates: coords, steps: true, geometries: 'geojson' }, function(error, response) {
        console.log(response);

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

// Run this code, when you saw "The file was saved!" in the console, you can open ./src/routelatlng.json and get the latlng array of the route going through all the spot you mentioned in coords
// It may take a little bit longer if the distance is too long.


```

# Testing

```
npm test # run node tape tests
firefox test.html # check the console if tape tests worked
```

# Credit
Many thanks to [Open Source Routing Machine - OSRM](https://github.com/Project-OSRM/osrm-backend)
This simple tool is created by Yan Wu (yan.wu@globe.com).

