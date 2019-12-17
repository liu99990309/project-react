const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getLoaders = require('./loaders')
const optimization = require('./optimization')
const resolve = require('./resolve')
const config = require('../config')

module.exports = env => {
    const { contentBase, apiHost, apiBase, avatarBase } = config(env.NODE_ENV)
    return {
        entry: './src/pages/main.js',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, '../', contentBase)
        },
        mode: 'development',
        devtool: 'inline-source-map',
        optimization,
        resolve,
        module: {
            rules: getLoaders({ style: ['css', 'less'], env: 'development' })
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
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
        ],
        devServer: {
            historyApiFallback: true,
            hot: true,
            host: '0.0.0.0',
            proxy: {
                [`${apiBase}`]: { target: `${apiHost}`, changeOrigin: true }
            }
        }
    }
}
