module.exports = function (api) {
    // 版本检测
    api.assertVersion('^7')
    api.cache(true)
    return {
        plugins: ['@babel/syntax-dynamic-import', ['@babel/plugin-proposal-decorators', { legacy: true }], ['@babel/plugin-proposal-class-properties', { loose: true }], '@babel/plugin-transform-react-jsx-source'],
        presets: [
            [
                '@babel/env',
                {
                    // corejs版本指定
                    corejs: 2,
                    // polyfill
                    useBuiltIns: 'usage',
                    modules: false
                }
            ],
            "@babel/preset-react"
        ]
    }
}
