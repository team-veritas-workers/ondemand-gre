var Datastore = require('nedb')
var db = new Datastore({ filename: 'path/to/datafile', autoload: true });

module.exports = db;