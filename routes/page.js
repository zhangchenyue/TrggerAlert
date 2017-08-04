var express = require('express');
var pageRouter = express.Router();
var path = require('path');
/* GET home page. */
var pageRoutes = [
  '*',
];

pageRoutes.forEach(function (route) {
  pageRouter.get(route, function (req, res) {
    res.sendFile(path.join(__dirname, '../app/index.html'));
  });
});

module.exports = pageRouter;
