module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],

    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    plugins: [
        'import',
        'react',
        'react-hooks',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['node_modules/'],
    rules: {
        'no-prototype-builtins': 'warn',
        'react/prop-types': 'off',
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'eol-last': ['error', 'always'],
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'always-multiline',
        }],
        'comma-spacing': 'error',
        'no-unused-vars': ['error', {'ignoreRestSiblings': true, 'argsIgnorePattern': '^_'}],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'never'],
        'object-curly-newline': ['error', {
            'ObjectPattern': {'multiline': true},
            'ExportDeclaration': {'multiline': true, 'consistent': true, 'minProperties': 3},
        }],
        'key-spacing': ['error', {'beforeColon': false, 'afterColon': true}],
        'no-multi-spaces': 'error',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 0, 'maxBOF': 1}],
        'curly': 'error',
        'camelcase': ['off', {'properties': 'never'}],
        'keyword-spacing': 'error',
        'arrow-spacing': 'error',
        'space-in-parens': ['error', 'never'],
        'space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}],
        'space-before-blocks': 'error',
        'func-call-spacing': ['error', 'never'],
        'brace-style': ['error', '1tbs'],
        'space-infix-ops': 'error',
        'space-unary-ops': ['error', {'words': true, 'nonwords': false}],
        'semi-spacing': 'error',
        'import/order': ['error', {
            'groups': [['external', 'builtin'], ['parent', 'internal'], ['index', 'sibling']],
            'newlines-between': 'always',
        }],
        'import/no-cycle': 'warn',
        'indent': ['error', 4],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-indent': ['error', 4, {indentLogicalExpressions: true}],
        'react/jsx-curly-spacing': ['error', {'when': 'never', 'children': true}],
        'react/jsx-tag-spacing': ['error', {'closingSlash': 'never', 'beforeSelfClosing': 'always', 'afterOpening': 'never', 'beforeClosing': 'never'}],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
};
