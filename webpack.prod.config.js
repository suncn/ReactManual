var webpack = require('webpack');
module.exports = {
    entry: './main-saga.js',
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
    },
    // Minify the code.
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true, //这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
