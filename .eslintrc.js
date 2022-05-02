module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
  plugins: [
    'react',
    'import',
  ],
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {

    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    // '@typescript-eslint/rule-name': 'error',
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    // 'jsx-quotes': ['error', 'prefer-double'],
    'brace-style': ['error', '1tbs'],
    '@typescript-eslint/no-explicit-any': 0,
    'no-multi-spaces': 'warn',
    'comma-spacing': ['warn', { before: false, after: true }],
    'require-atomic-updates': 'error',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 1 }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['warn', 'always'],
    'no-console': 'off',
    // 'no-unused-vars': 'off',
    indent: ['error', 2, { SwitchCase: 1, ignoreComments: true }],
    'switch-colon-spacing': ['error', { after: true, before: false }],
    semi: ['error', 'never'],
    'space-in-parens': ['warn', 'never'],
    'new-cap': ['error', { capIsNewExceptions: ['Record', 'Router'] }],
    camelcase: ['warn'],
    'no-whitespace-before-property': 2,
    'arrow-spacing': 'error',
    // 'sort-imports': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // ['error', {
    //   'ignoreCase': false,
    //   'ignoreDeclarationSort': false,
    //   'ignoreMemberSort': false,
    //   'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
    //   'allowSeparatedGroups': false,
    // }],

    'no-empty-function':  ['error', { 'allow': ['methods', 'generatorFunctions', 'arrowFunctions'] }],
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['methods', 'generatorFunctions', 'arrowFunctions'] }],
  },
}
