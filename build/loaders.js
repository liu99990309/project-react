const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const generateCssLoader = ({ type = 'css', env = 'development', options = {} } = {}) => {
    const styleLoaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: env !== 'production'
            }
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        }
    ]

    if (type !== 'css') {
        styleLoaders.push({
            loader: `${type}-loader`,
            options: {
                sourceMap: true,
                ...options
            }
        })
    }
    return styleLoaders
}

module.exports = ({
    style = ['css'],
    env = 'development'
} = {}) => {
    // css
    const styleRules = style.map(item => {
        let loaderName
        const options = {}
        if (typeof item === 'string') {
            loaderName = item
        } else if (item && item.loader) {
            loaderName = item.loader
            item.options && Object.assign(options, item.options)
        }
        let reg = new RegExp(`\.${loaderName}$`)

        return {
            test: reg,
            use: generateCssLoader({ type: item, env, options })
        }
    })

    // js
    const jsRules = [
        // eslint
        {
            enforce: 'pre',
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                emitError: true,
                emitWarning: true,
                fix: true
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }
    ]
    // font/images
    const fileRules = [
        {
            test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|mp4|webm|ogg|mp3|wav|flac|aac|ico)$/,
            loader: 'url-loader',
            options: {
                name: env === 'development' ? '[name].[ext]' : '[sha512:hash:base64:8].[ext]',
                limit: 2048
            }
        }
    ]
    return [...styleRules, ...jsRules, ...fileRules]
}
