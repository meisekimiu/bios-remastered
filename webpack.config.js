const path = require('path');
const UglifyJsPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    optimization: {
        minimizer: [new UglifyJsPlugin({
            terserOptions: {
                mangle: true
            }
        })],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|mp3|ogg|wav)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: "assets",
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3001
    },
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
