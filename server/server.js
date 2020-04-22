const express = require("express");
const server = express();
const path = require("path");
const fs = require("fs");
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf-8'),
    clientManifest
});
const port = 9527;

server.use(express.static(path.join(__dirname, '../dist')));
server.get('/', function(req, res) {
    renderHTML(req, res);
});
server.get('*', function(req, res) {
    renderHTML(req, res);
});

function renderHTML(req, res) {
    const context = {url: req.baseUrl || '/', title: 'vue-cli-ssr-demo'};
    renderer.renderToString(context, (err, html) => {
        if(err) {
            console.log(err);
            res.status(500).end('Internal Server Error');
        } else {
            res.end(html);
        }
    })
}

server.listen(port, () => {console.log('server is running at: http://localhost:' + port)});