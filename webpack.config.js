const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/app.js"],

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist/assets"),
  },

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    publicPath: "/assets/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        exclude: /node_modules/,

        use: {
          loader: "babel-loader",

          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
