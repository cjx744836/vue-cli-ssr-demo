const webpackConfig = require('@vue/cli-service/webpack.config');
const webpack = require('webpack');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const {createBundleRenderer} = require('vue-server-renderer');
const axios = require('axios');
const express = require('express');
const server = express();
const MemoryFS = require('memory-fs');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const port = 9588;


webpackConfig.entry = path.join(__dirname, '../src/entry-server.js');
webpackConfig.target = 'node';
webpackConfig.output.libraryTarget = 'commonjs2';
webpackConfig.optimization.splitChunks = {};
webpackConfig.output.publicPath = 'http://127.0.0.1:8080/';
webpackConfig.plugins.push(new VueSSRServerPlugin());

const complier = webpack(webpackConfig);
const mfs = new MemoryFS();
complier.outputFileSystem = mfs;
let bundle, isRunning;
complier.watch({}, (err, states) => {
    if (err) {
        throw err
    }
    states = states.toJson();
    states.errors.forEach(error => console.error(error));
    states.warnings.forEach( warn => console.warn(warn));
    const bundlePath = path.join(webpackConfig.output.path, 'vue-ssr-server-bundle.json');
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    console.log('new bundle generated');
    if(!isRunning) {
        setUpServer();
        opn('http://localhost:' + port);
    }
});

function setUpServer() {
    isRunning = true;
    server.get('/', function(req, res) {
        renderHtml(req, res);
    });
    server.get('*', function(req, res) {
        renderHtml(req, res);
    });
    server.listen(port, () => console.log('Server is running at:http://localhost:' + port));
}

async function renderHtml(req, res,) {
    let data = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json');
    let clientManifest = data.data;
    let renderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        clientManifest,
        template: fs.readFileSync(path.join(__dirname, './index.template.html'), 'utf-8')
    });
    let context = {
        url: req.url,
        title: 'vue-cli-ssr-demo',
        meta: `
            <meta name="referrer" content="never">
        `
    };
    renderer.renderToString(context, function(err, html) {
        if(err) {
            res.status(500).end('Internal Server Error');
        } else {
            res.end(html);
        }
    });
}