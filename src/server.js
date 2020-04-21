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
server.use(express.static(path.join(__dirname, '../dist')));
server.use('*', function(req, res) {
    const context = {url: req.baseUrl || '/', title: 'demo'};
    console.log(context.url);
    renderer.renderToString(context, (err, html) => {
       if(err) {
           res.status(500).end('Internal Server Error');
       } else {
           res.end(html);
       }
    })
});

server.listen(9527, () => {console.log('server is running')});