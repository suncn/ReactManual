module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        host: "localhost",
        port: "8000",
        proxy: {
            "/api/*": {
                target: {
                    host: "localhost",
                    port: "9000",
                    pathRewrite: {
                        '^/api/bbc': '/api/aac'
                    },
                }
            }
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]　
    }
};
