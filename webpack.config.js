var path = require('path');
var util = require('util');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var assetsDir = path.resolve('./assets');
var buildDir = path.resolve('./build');
var nodeModulesDir = path.resolve('./node_modules');

var port = 10011;

module.exports = {
    entry: {
        main: path.join(assetsDir, 'scripts/index.js'),
        styles: path.join(assetsDir, 'styles/index.less'),
        test: path.join(assetsDir, 'scripts/test/index.js'),
    },
    output: {
        path: buildDir,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: util.format('http://localhost:%s/', port),
    },
    devServer: {
        port: port,
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: nodeModulesDir,
                loader: 'react-hot!babel',
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!' +
//                    'autoprefixer?{browsers: "> 5%"}!' +
                    'less?sourceMap'
                ),
            },
            {
                test: /\.(png|jpe?g|gif)/,
                loader: 'url?limit=100000',
            },
            {
                test: /\.(eot|ttf|svg|woff2?)$/,
                loader: 'file?name=[name].[ext]',
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
};
