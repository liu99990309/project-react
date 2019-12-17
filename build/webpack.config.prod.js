const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const getLoaders = require('./loaders')
const optimization = require('./optimization')
const resolve = require('./resolve')
const config = require('../config')

module.exports = env => {
    const { contentBase, apiHost, apiBase, avatarBase } = config(env.NODE_ENV)

    return {
        entry: './src/pages/main.js',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, '../', contentBase)
        },
        mode: 'production',
        devtool: '#source-map',
        optimization: {
            ...optimization,
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        },
        resolve,
        module: {
            rules: getLoaders({ style: ['css', 'less'], env: 'production' })
        },
        plugins: [
            new cleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                reloadAll: true
            }),
            new htmlWebpackPlugin({
                template: './index.html',
                favicon: './favicon.ico',
                filename: 'index.html'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    apiHost: JSON.stringify(apiHost),
                    apiBase: JSON.stringify(apiBase),
                    avatarBase: JSON.stringify(avatarBase),
                    env: JSON.stringify(env.NODE_ENV)
                }
            })
        ]
    }
}
