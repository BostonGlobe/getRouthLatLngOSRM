var OSRM = require('./src/osrm');

var osrm = new OSRM();

const Leaflet = require('leaflet');
const D3 = require('d3');
const fs = require('fs');
const d3 = new D3();

d3.json('Zip_Codes.json', function (err, data) {
    console.log(data);
});



        // write the file to json!
        const content = JSON.stringify(arrCoordinates);

        // fs.writeFile("routelatlng.json", content, 'utf8', function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // });




