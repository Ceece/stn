'use strict';

var shortid = require('shortid');
var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {
    var clickHandler = new ClickHandler(db);

    app.route('/')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    app.route('/api/clicks')
    .get(clickHandler.getClicks)
    .post(clickHandler.addClick)
    .delete(clickHandler.resetClicks);

    app.route(/^\/new\/(.+)$/).get(function(req, res) {
        var original_url = req.originalUrl.replace(/^\/new\/(.+)$/, '$1');
        var shorten = shortid.generate();
        var url = {
            original_url: original_url,
            shorten: shorten
        }
        db.collection('urls').insert(url, function(err, data) {
            if (err) throw err
            res.json({
                original_url: url.original_url,
                shorten: app.set('app_url') + '/' + url.shorten
            });
        });
    });

    app.route('/:shorten').get(function(req, res) {
        db.collection('urls').findOne({
            shorten: req.params.shorten
        }, function(err, url) {
            if (err) throw err
            res.redirect(url.original_url)
        })
    });
};
