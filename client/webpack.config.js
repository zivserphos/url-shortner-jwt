// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: {
    index: "./src/index.js",
    login: "./src/loginFront/index.js",
    signUp: "./src/signUpFront/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../server/dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
  },
  plugins: [
    new FaviconsWebpackPlugin("./src/download.png"),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "src/loginFront/login.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      filename: "signUp.html",
      template: "src/signUpFront/signUp.html",
      chunks: ["signUp"],
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
