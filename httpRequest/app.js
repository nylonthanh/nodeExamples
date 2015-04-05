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

    //when finished log out full body
    //this is a string that will need to be parsed to an obj
    response.on('end', function() {
        console.log(typeof(body) + ' data: ' + body);
    });



});


request.on('error', function(error) {
    console.error('Error: ' + error.message);
});
