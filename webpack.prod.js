const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                        'babel-loader',
                    ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ]
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]

}

