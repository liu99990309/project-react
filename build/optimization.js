module.exports = {
    runtimeChunk: {
        name: 'runtime'
    },
    splitChunks: {
        cacheGroups: {
            util: {
                test: /[\\/]node_modules[\\/]/,
                reuseExistingChunk: true,
                name: 'util',
                priority: 2,
                chunks: 'all'
            },
            common: {
                reuseExistingChunk: true,
                minChunks: 2,
                name: 'common',
                priority: 1,
                chunks: 'all'
            }
        }
    }
}
