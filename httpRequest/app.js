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
    console.log('Status: ' + response.statusCode);
    });

request.on('error', function(error) {
    console.error('Error: ' + error.message);
});
