const express = require("express");
const prod = express();
const path = require("path");
const fs = require("fs");
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest');
const LRU = require('lru-cache');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    clientManifest
});
const port = 9527;

prod.use(express.static(path.join(__dirname, '../dist')));
prod.get('*', function(req, res) {
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

function helper(v) {
    if(typeof v === 'function') {
        return v();
    }
    return '';
}

function renderHTML(req, res) {
    let context = {
        url: req.url,
    };
    const cacheable = isCacheable(req.url);
    if (cacheable) {
        const hit = microCache.get(req.url);
        if (hit) {
            return res.end(hit)
        }
    }
    renderer.renderToString(context, (err, html) => {
        if(err) return res.end(err.stack);
        const {title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta} = context.meta.inject();
        let temp = `
          <!doctype html>
            <html ${helper(htmlAttrs.text)}>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                ${helper(meta.text)}
                ${helper(title.text)}  
                ${context.renderStyles()}
                ${context.renderResourceHints()}
                ${helper(link.text)}
                ${helper(style.text)}
                ${helper(script.text)}
                ${helper(noscript.text)}
            </head>
            <body ${helper(bodyAttrs.text)}>
                ${html}
                ${context.renderState()}
                ${context.renderScripts()}
            </body>
          </html>`;
        res.end(temp);
        if(cacheable) {
            microCache.set(req.url, temp);
        }
    })
}

prod.listen(port, () => {console.log('server is running at: http://localhost:' + port)});