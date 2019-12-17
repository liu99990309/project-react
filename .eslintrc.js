module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    globals: {},
    plugins: ['react-hooks'],
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
        'react/display-name': 0,
        'react/prop-types': 0,
        'no-console': ['off', 'all'],
        'no-var': 'error',
        'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
        'react-hooks/rules-of-hooks': 2,
        'react-hooks/exhaustive-deps': 1
    }
}
