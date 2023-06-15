const { connect, connection } = require('mongoose');

const db = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';
connect(db);

module.exports = connection;