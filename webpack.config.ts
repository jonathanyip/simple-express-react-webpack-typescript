/**
 * webpack.config.ts
 * Webpack 5 Configuration file in TypeScript
 */
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from "eslint-webpack-plugin";

const resolve: (relativePath: string) => string = path.resolve.bind(path, __dirname);

export default (env: any): webpack.Configuration => {
    const isProduction: boolean = env.production;

    const baseConfig: webpack.Configuration = {
        entry: "./src/frontend/app.tsx",
        module: {
            rules: [{
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]"
                    }
                }]
            }]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        }
    };

    const config: webpack.Configuration = (isProduction) ? Object.assign({
        mode: "production",

        output: {
            path: resolve("./build/prod/frontend"),
            filename: "[name].[chunkhash].js"
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: "App",
                minify: true,
                template: "src/frontend/index.html",
            }),
            new ForkTsCheckerWebpackPlugin({
                async: false
            }),
            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
            }),
        ]
    }, baseConfig) : Object.assign({
        mode: "development",
        devtool: "inline-source-map",

        output: {
            path: resolve("./build/dev/frontend"),
            filename: "[name].js"
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: "App",
                minify: false,
                template: "src/frontend/index.html",
            }),
            new ForkTsCheckerWebpackPlugin({
                async: true
            }),
            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
                failOnError: false
            }),
            new webpack.HotModuleReplacementPlugin()
        ],

        devServer: {
            contentBase: path.join(__dirname, "build/dev"),
            historyApiFallback: true,
            port: 4000,
            hot: true,
            proxy: {
                "/api": "http://localhost:9000"
            }
        },
    }, baseConfig);

    return config;
};
