/**
 * this will get a teamtreehouse user profile
 */
var profile = require('./profile');
var users = process.argv.slice(2);

if (users.length > 0) {
    users.forEach(profile.get);

} else {
    profile.printError({message : "Please enter a Team Treehouse member name."});

}




