/**
 * CLI tool to get weather via zip code
 * returns a JSON of data
 * @todo validate zip code for US
 *
 * dependencies:
 * Request HTTP client (https://github.com/request/request, npm install request)
 * weather api: http://api.openweathermap.org/data/2.5/weather?q=95110
 */
var request = require('request');

WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

var zipcode = process.argv.slice(2);

if (zipcode.length === 0) {
    console.log('Please enter a US zip code.')
}

zipcode.forEach(getForecast);


/**
 * getForecast()
 *
 * gets coordinates, sunrise/set, today's weather, temp, wind, clouds, name
 *
 * @param lat
 * @param lng
 * @returns JSON
 */
function getForecast(zipcode) {

    console.log(WEATHER_API_URL + '?q=' + zipcode + '&satellites&raw');
    try {
        request.get(WEATHER_API_URL + '?q=' + zipcode + '&satellites&raw',
            function(error, response, body) {

                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    printError({ message : error });
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
 */function printError(error) {
    try {
        console.error('Error: ' + error.message);

    } catch (parseError) {
        console.error(parseError);
    }
}
