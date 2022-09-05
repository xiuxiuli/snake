//import a package
const path = require('path');

//import the html-webpack plugin
const HTMLWebpackPlugin = require('html-webpack-plugin');

//import clean plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//all about webpack config
module.exports = {
    mode: 'development',

    //which file is the entry of this project
    entry: "./src/index.ts",

    //where to save the packed files?
    output: {
        path: path.resolve(__dirname, 'dist'),

        //give a name to this package
        filename: "bundle.js",

        environment: {
            arrowFunction: false
        }
    },

    //which module to use while packing?
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    //set babel config
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            "chrome": "88"
                                        },
                                        "corejs": "3",
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node-modules/
            },

            //set less config
            {
                test: /\.less$/, //applied to these files
                use: [
                    "style-loader",
                    "css-loader",
                    //import postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }

                    },
                    "less-loader"
                ]
            }
        ]
    },

    //set config for webpack plugin
    plugins: [
        new HTMLWebpackPlugin({
            // title: 'SNAKE'
            template: "./src/index.html"
        }),

        new CleanWebpackPlugin(),
    ],

    // tell webpack what files can be compiled
    resolve: {
        extensions: [ '.ts', '.js']
    }
};