/**
 * get user profile:
 * make a http GET call to my teamtreehouse account (set to public)
 */

var http = require('http');

//Main message
function printMessage(username, badgeCount, points) {
    var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in JavaScript.';
    console.log(message);
}

//Error handling function
function printError(error) {
    console.error('Error: ' + error.message);
}

//connect to API (http://teamtreehouse.com/ithanhpham.json)
function get(username) {
    var request = http.get('http://teamtreehouse.com/' + username + '.json', function (response) {
        var body = "";

        //read data, concat during the stream
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            if (response.statusCode == 200) {
                try {
                    var profile = JSON.parse(body);
                    printMessage(username, profile.badges.length, profile.points.JavaScript);

                } catch (error) {
                    //parse error
                    printError(error);
                }
            } else {
                printError({message: "There was an error trying to get the URL for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});

            }
        });
    });

    //connection error
    request.on('error', printError);

}

module.exports.get = get;