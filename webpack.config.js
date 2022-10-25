const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true
    },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
              test: /\.(c|sc)ss$/,
                use: [
                    // devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                          postcssOptions: {
                            plugins: [require('postcss-preset-env')],
                          },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.woff2?$/,
                type: 'asset/resource',
                generator: {
                    // emit: false,
                    filename: './fonts/[name][ext]'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                type: 'asset/resource',
                generator: {
                    // emit: false,
                    filename: './assets/[name][ext]'
                }
              },
        ],
    }

}