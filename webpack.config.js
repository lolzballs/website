var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, "resources/assets");
var PUBLIC_DIR = path.resolve(__dirname, "public");

module.exports = {
    entry: SRC_DIR + '/index.js',
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    output: {
        path: PUBLIC_DIR,
        filename: 'bundle.js'
	},
    module: {
        loaders: [
            {
                test: /(.scss|.css)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};
