module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": 0,
        "comma-dangle": 0,
        "array-bracket-spacing": 0,
        "arrow-parens": 0,
        "space-in-parens": 0,
        "no-unused-expressions": 0,
        "no-plusplus": 0,
        "react/jsx-curly-spacing": 0,
        "react/jsx-wrap-multilines": 0,
        "no-confusing-arrow": 0
    }
};
