'use strict';

var Shortener = require(process.cwd() + '/app/controllers/shortener.js');

module.exports = function (app, db) {

    var shortener = new Shortener(db);

    app.route('/').get(function (req, res) {
        res.render('index', {appUrl: process.env.APP_URL});
    });

    app.route(/^\/new\/(.+)$/).get(shortener.new);
    app.route('/:shorten').get(shortener.redirect);

};