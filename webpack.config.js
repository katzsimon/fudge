const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
//
module.exports = (env, argv) => {

    const mode = argv.mode;
    let output = env.env;
    if (env.env === 'serve') {
        output = 'serve';
    }

    const common = {
        mode: 'production',
        devtool: false,
        entry: {
            main: path.resolve(__dirname, './src/index.js'),
        },
        output: {
            path: path.resolve(__dirname, './dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
            ],
        },
        plugins: [],
    };

    const serve = merge(common, {
        mode: 'development',
        output: {
            filename: '[name].bundle.js',
        },
        devServer: {
            historyApiFallback: true,
            writeToDisk: false,
            contentBase: path.resolve(__dirname, './dist'),
            open: true,
            compress: false,
            hot: true,
            port: 8080,
        },
        module: {
            rules: [
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: `Developing`,
                template: path.resolve(__dirname, './src/index.html'),
                filename: 'index.html',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
    });

    const build = merge(common, {
        plugins: [
            new HtmlWebpackPlugin({
                title: `Developing`,
                template: path.resolve(__dirname, './src/index.html'),
                filename: 'index.html',
            }),
        ],
    })

    if (output==='serve') return [serve];
    return [build]

}