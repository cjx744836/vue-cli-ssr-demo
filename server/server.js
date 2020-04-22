const express = require("express");
const server = express();
const path = require("path");
const fs = require("fs");
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest');
const LRU = require('lru-cache');
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
const microCache = new LRU({
    max: 100,
    maxAge: 60 * 60 * 1000 //1 hours cache
});
let cacheUrl = ['/girls'];
const isCacheable = url => {
    return cacheUrl.indexOf(url) > -1;
};

function renderHTML(req, res) {
    let context = {
        url: req.url,
        title: 'vue-cli-ssr-demo',
        meta: `
            <meta name="referrer" content="never">
        `
    };
    const cacheable = isCacheable(req)
    if (cacheable) {
        const hit = microCache.get(req.url);
        if (hit) {
            return res.end(hit)
        }
    }
    renderer.renderToString(context, (err, html) => {
        if(err) {
            res.status(500).end('Internal Server Error');
        } else {
            res.end(html);
            if(cacheable) {
                microCache.set(req.url, html);
            }
        }
    })
}

server.listen(port, () => {console.log('server is running at: http://localhost:' + port)});