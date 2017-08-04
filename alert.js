const https = require('https');
const querystring = require('querystring');

const STS_HOST = 'dc2-cloud.slbcloud.com';
const STS_HOST_PORT = '57799';
const UPN = 'administrator';
const ENV = 'rointcore';
const WELL_ID = '28ee46ba-712d-4e94-a0fc-09e77f984aef';

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function triggerAlert(jwtToken) {
    const ALERT_API_HOST = 'engdmzprism.azure-api.net';
    const ALERT_API_PATH = '/' + ENV + '/Alert/v1/alerts/' + guid();
    var put_data = JSON.stringify({
        'type': 'Daily Footage',
        'source': 'Rhapsody',
        'severity': 'Low',
        'state': 'string',
        'emitTimeUtc': new Date(Date.now()).toISOString(),
        'notifyDevice': true,
        'contentType': 'string',
        'contentEncoding': '',
        'content': 'Footage alert',
        'wellId': WELL_ID
    });
    const OPTIONS = {
        hostname: ALERT_API_HOST, port: 443, path: ALERT_API_PATH, method: 'PUT', rejectUnauthorized: false, headers: {
            'Authorization': 'Bearer ' + jwtToken,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(put_data)
        }
    };
    var alertreq = https.request(OPTIONS, (alertres) => {
        let body = '';
        alertres.on('data', d => body += d);
        alertres.on('end', function () {
            alertreq.end();
            console.log(body);
        });
    });

    alertreq.on('error', (e) => {
        console.error(e);
    });

    alertreq.write(put_data);
    alertreq.end();
}

function main() {
    var req = https.request({ hostname: STS_HOST, port: STS_HOST_PORT, path: '/SvcSts/Token', method: 'POST', rejectUnauthorized: false, }, (res) => {
        let body = '';
        res.on('data', d => body += d)
            .on('end', () => {
                req.end();
                triggerAlert(JSON.parse(body)['access_token'])
            });
    }).on('error', e => console.error(e))
    req.write(querystring.stringify({ 'grant_type': 'password', 'NameIdentifier': UPN, 'unique_name': UPN }));
    req.end();
}

main();