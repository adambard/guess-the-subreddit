var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    static: ["./sass/style.scss"],
    app: ["./src/index.tsx"],
  },
  output: {
    path: __dirname + "/../build",
    filename: "js/[name].js",
    publicPath: "/"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  devtool: "source-map",

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.s[ca]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader?sourceMap"
        })
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader") },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(png|jpg|eot|woff2|woff|ttf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: { publicPath: '/' }
        }]
      },
    ],
  },
  /*
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  */
  plugins: [
    new ExtractTextPlugin("css/styles.css"),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ]
}

