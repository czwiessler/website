const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/proxy', (req, res) => {
    const options = {
        url: 'https://api.voiapp.io/v1/traffic-school-gateway/reward',
        headers: {
            'accept': '*/*',
            'accept-language': 'en-DE,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6,en-GB;q=0.5',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site'
        },
        referrer: 'https://ridesafe.voi.com/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(req.body),
        method: 'POST',
        mode: 'cors',
        credentials: 'omit'
    };

    request(options, (error, response, body) => {
        if (error) {
            res.status(500).send({error: 'Error in proxy request'});
        } else {
            res.status(response.statusCode).send(body);
        }
    });
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
