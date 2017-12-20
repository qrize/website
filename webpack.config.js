const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDir = path.resolve(__dirname, "build");

const config = {
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: buildDir
  },
  devtool: "source-map",
  devServer: {
    contentBase: buildDir,
    open: false,
    inline: true,
    port: 8888
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: path.resolve(__dirname, "./node_modules/feather-icons/dist/"),
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Qrize | Tiny QR codes for your web pages",
      hash: true,
      showErrors: true,
      template: "src/index.html"
    })
  ]
};

module.exports = config;
