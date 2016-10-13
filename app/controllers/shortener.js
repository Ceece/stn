'use strict';

var validator = require('validator');
var shortid = require('shortid');

function shortener (db) {
   this.new = function(req, res) {
      var original_url = req.originalUrl.replace(/^\/new\/(.+)$/, '$1');

      var validatorOptions = {
         require_protocol: true,
         protocols: ['http','https']
      };

      if (validator.isURL(original_url, validatorOptions) == false) {
         res.json({
            error: "Wrong url format, make sure you have a valid protocol and real site."
         });
      } else {
         var shorten = shortid.generate();
         var url = {
            original_url: original_url,
            shorten: shorten
         }
         db.collection('urls').insert(url, function(err, data) {
            if (err) throw err
               res.json({
                  original_url: url.original_url,
                  short_url: process.env.APP_URL + '/' + url.shorten
               });
         });
      }
   };

   this.redirect = function(req, res) {
         db.collection('urls').findOne({
            shorten: req.params.shorten
         }, function(err, url) {
            if (err) throw err
            if (url)
               res.redirect(url.original_url)
            else
               res.json({
                  error: req.params.shorten + ' is not found.'
               });
         })
   };
}

module.exports = shortener;
