var express = require('express');
var apiRouter = express.Router();
var alert = require('../alert');

apiRouter.get('/api/version', function (req, res) {
    res.json({
        'version': '1.0.0.0'
    });
});


apiRouter.post('/api/alert', function (req, res) {
    console.log(JSON.stringify(req.body));
    alert.trigger(req.body, function (msg) {
        res.json(msg);
    })
});


module.exports = apiRouter;