'use strict';

function shortener (db) {
   this.new = function(req, res) {
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
               short_url: app.set('app_url') + '/' + url.shorten
            });
      });
   };

   this.redirect = function(req, res) {
      db.collection('urls').findOne({
         shorten: req.params.shorten
      }, function(err, url) {
         if (err) throw err
            res.redirect(url.original_url)
      })
   };
}

module.exports = shortener;
