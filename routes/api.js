var express = require('express');
var apiRouter = express.Router();

apiRouter.get('/api/version', function (req, res) {
    res.json({
        'version': '1.0.0.0'
    });
});


apiRouter.post('/api/alert', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.json(req.body);
});


module.exports = apiRouter;