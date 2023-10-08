const fs = require('fs');

function lireDb() {
    return JSON.parse(fs.readFileSync('./base/users.json', 'utf8')).users;
}

function ecrireDb(users) {
    fs.writeFileSync('./base/users.json', JSON.stringify({ users }), 'utf8');
}

module.exports = {
    lireDb,
    ecrireDb
};
