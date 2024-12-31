import TerserPlugin from "terser-webpack-plugin";
import { Configuration, BannerPlugin, IgnorePlugin } from "webpack";
import { generateHeader } from "../plugins/userscript.plugin";
import path from 'node:path';

const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const config: Configuration = {
    entry: "./src/index.ts",
    target: "web",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.m?ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                resourceQuery: /raw/,
                type: 'asset/source',
            }
        ],
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin({
            // minify: TerserPlugin.swcMinify,
            terserOptions: {
                format: {
                    comments: false,
                },
                compress: false,
                mangle: false,
            },
            extractComments: false,
        })],
    },
    plugins: [
        new BannerPlugin({
            banner: generateHeader,
            raw: true,
        }),
        new IgnorePlugin({
            resourceRegExp: /leaflet/
        }),
        new ReplaceInFileWebpackPlugin([{
            dir: path.resolve(".", "userscripts"),
            test: /\.js/,
            rules: [{
                search: /^const L = .*$/igm,
                //search: /.*./g,
                replace: ''
            }]
        }]),
    ],
    cache: false
};

export default config;