var mysql = require('mysql');

var knex = require('knex')({
  dialect: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mooovi_express',
    charset: 'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
