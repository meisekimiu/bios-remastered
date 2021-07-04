const path = require('path');
const UglifyJsPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        index: './src/main.ts',
        bio1: './src/bio1.ts',
        bio2: './src/bio2.ts',
        bio3: './src/bio3.ts',
    },
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
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};
