module.exports = {
    "src/**/*.{js,ts,tsx,jsx}": "eslint --fix",
    "src/**/*.vue": [
        "stylelint --fix",
        "eslint --fix"
    ],
    "src/**/*.{less,scss,sass,css}": [
        "stylelint --fix"
    ]
}