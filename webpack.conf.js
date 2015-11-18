var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: '',
    output: {
        path: '',
        filename: ''
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'raw'},
            {test: /\.js$/, loader: 'babel?optional[]=runtime', exclude: /node_modules|vendor|templates.js|_spec.js/},
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules|vendor|templates.js/}

        ]
    },
    eslint: {
        configFile: '.eslintrc'
    },
    plugins: [
        new WebpackNotifierPlugin()
    ]
};
