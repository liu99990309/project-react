const path = require('path')

module.exports = {
    // 模块查找
    modules: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../src')
    ],
    alias: {
        // 别名配置
        '@src': path.resolve(__dirname, '../src'),
        '@components': path.resolve(__dirname, '../src/components')
    }
}
