const Datastore = require('nedb');

const db = new Datastore({ filename: './datafile', autoload: true });

module.exports = db;