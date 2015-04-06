/**
 * CLI tool to get US city name, lat and long via zip code(s)
 * returns a obj of data
 * @TODO check if valid zipcode
 *
 * dependencies:
 * Request HTTP client (https://github.com/request/request, npm install request)

 */

var request = require('request');

//may enter more than one zipcode
var zipcode = process.argv.slice(2);

if (zipcode.length === 0) {
    console.log('Please enter a US zip code.')
}

zipcode.forEach(getCoordinates);

/**
 * getCoordinates
 * will use google maps api to return city/state, lat, lng if given a zip (US)
 * @param zipcode
 */
function getCoordinates(zipcode) {
    try {
        request.get('http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + zipcode,
            function(error, response, body) {

                if (!error && response.statusCode == 200) {
                    var coordResults = {};
                    var coord = JSON.parse(body);

                    var coordData = {
                        formattedAddress : coord.results[0].formatted_address,
                        lat : coord.results[0].geometry.location.lat,
                        lng : coord.results[0].geometry.location.lng
                    };

                    coordResults[zipcode] = coordData;

                    console.log(coordResults);

                } else {
                    printError(error);
                }
            }
        );

    } catch (e) {
        printError({ message : "Cannot get the request."});

    }

}

/**
 * Error handling function
 * @param error
 */
function printError(error) {
    try {
        console.error('Error: ' + error.message);

    } catch (parseError) {
        console.error(parseError);
    }
}
