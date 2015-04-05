/*
to make a http GET call to my teamtreehouse account (set to public)
return the JSON
 */
var http = require('http');
var username = 'ithanhpham';

function printMessage(username, badgeCount, points) {
    var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in JavaScript.';
    console.log(message);
}

var request = http.get('http://teamtreehouse.com/' + username + '.json', function(response) {
    var body = "";

    console.log('Status: ' + response.statusCode)

    //read data, concat during the stream
    response.on('data', function(chunk) {
        body += chunk;
    });

    response.on('end', function() {
        var profile = JSON.parse(body);
        printMessage(username, profile.badges.length, profile.points.JavaScript);
    });

});


request.on('error', function(error) {
    console.error('Error: ' + error.message);
});
