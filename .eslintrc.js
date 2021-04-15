module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'indent': ['error', 4],
        'comma-dangle': ['error', 'only-multiline'],
        'newline-after-var': ['error', 'never'],
        'no-param-reassign': ['off'],
        'prefer-destructuring': ['error', { object: false, array: false }],
        'function-paren-newline': ['error', 'multiline'],
        'function-call-argument-newline': ['error', 'never'],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
        'operator-linebreak': ['error', 'before'],
        'quotes': ['error', 'single', { avoidEscape: true }],
        'quote-props': ['error', 'consistent'],
        'lines-between-class-members': [
            'error',
            'always',
            { exceptAfterSingleLine: true },
        ],
        'radix': ['error', 'as-needed'],
        'class-methods-use-this': 0,
        'import/no-extraneous-dependencies': 0,
        'object-shorthand': ['error', 'consistent-as-needed'],
    },
};
