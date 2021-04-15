const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
//
module.exports = (env, argv) => {
    let output = env.env;
    if (env.env === 'serve') {
        output = 'serve';
    } else if (env.env === 'bundle') {
        output = 'bundle';
    }

    const mode = argv.mode;
    const filename = 'fudge';
    const name = 'Fudge';

    const common = {
        mode: 'production',
        entry: {
            main: path.resolve(__dirname, `./src/${filename}.js`),
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
            library: {
                name: `${name}`,
                type: 'window',
            },
        },
        entry: {
            main: path.resolve(__dirname, './src/dev/dev.js'),
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
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: `Developing ${name}`,
                template: path.resolve(__dirname, './src/dev/dev.html'),
                filename: 'index.html',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
    });
    const bundle = merge(common, {
        devtool: 'nosources-source-map',
        mode: mode,
        entry: {
            main: path.resolve(__dirname, './src/index.js'),
        },
        output: {
            filename: 'fudge.bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [],
    });
    const minifiedJs = merge(common, {
        devtool: 'cheap-source-map',
        output: {
            filename: `${filename}.min.js`,
            library: {
                name: `${name}`,
                type: 'window',
            },
        },
        optimization: {
            minimize: true,
        },
        module: {
            rules: [],
        },
        plugins: [],
    });
    const unminifiedCss = merge(common, {
        mode: 'development',
        devtool: false,
        entry: {
            main: path.resolve(__dirname, './src/index.js'),
        },
        output: {
            filename: `${filename}.js`,
            library: {
                name: `${name}`,
                type: 'window',
            },
        },
        optimization: {
            minimize: false,
        },
        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${filename}.css`,
            }),
        ],
    });
    const minifiedCssAndUnminifiedJs = merge(common, {
        mode: 'production',
        devtool: false,
        entry: {
            main: path.resolve(__dirname, './src/index.js'),
        },
        output: {
            filename: `${filename}.js`,
            library: {
                name: `${name}`,
                type: 'window',
            },
        },
        optimization: {
            minimize: false,
        },
        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${filename}.min.css`,
            }),
        ],
    });
    const styles = merge(common, {
        devtool: false,
        entry: {
            main: path.resolve(__dirname, './src/styles.js'),
        },
        output: {
            filename: '_',
        },
        optimization: {
            minimize: false,
            minimizer: ['...', new CssMinimizerPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'themes.css',
            }),
        ],
    });
    //
    if (output === 'serve') {
        return [serve];
    }
    if (output === 'bundle') {
        return [bundle];
    }
    if (output === 'styles') {
        return [styles];
    }
    return [unminifiedCss, minifiedCssAndUnminifiedJs, minifiedJs];
};
