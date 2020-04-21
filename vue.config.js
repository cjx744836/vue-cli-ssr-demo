const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const mode = getArg('mode');
const NODE = mode === 'server';
function getArg(k) {
    var reg = new RegExp('--env\.' + k + '=(.*)');
    for(let it of process.argv) {
       var m = it.match(reg);
       if(m) return m[1];
    }
    return '';
}
var config = {
    publicPath: './'
};
if(mode === 'client') {
    config = Object.assign({}, config, {
        configureWebpack: {
            entry: './src/entry-client.js',
            plugins: [
                new VueSSRClientPlugin()
            ]
        }
    });
} else if(mode === 'server') {
    config = Object.assign({}, config, {
        configureWebpack: {
            entry: './src/entry-server.js',
            target: 'node',
            output: {
                libraryTarget: 'commonjs2'
            },
            externals: nodeExternals({
                whitelist: /\.css$/
            }),
            plugins: [
                new VueSSRServerPlugin()
            ],
        },
        chainWebpack: config => {
            config.optimization.splitChunks(undefined);
        }
    });
}
module.exports = config;