const path = require('path');

module.exports = {

    entry: './src/Game.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack.bundle.js'
    },

    module: {
        rules: [
            {
                test:/\.ts$/,
                use: 'ts-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    }

}