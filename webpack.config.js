const webpack = require("webpack");
const path = require("path");

var jF = path.resolve(__dirname, "js");
var bF = path.resolve(__dirname, "build");

var config = {
  entry: {
    "React":jF+"/index.jsx",
    "Script":jF+"/myjs.js"
  },
  output: {
    filename:"[name]bundle.js",
    path:bF
  },
  module : {
   loaders : [{
       test : /\.jsx?/,
       include : jF,
       loader : 'babel-loader'
     }]
 },
 plugins:[
  new webpack.ProvidePlugin({
    $:"jquery",
    jQuery:"jquery"
  })
]
};

module.exports = config;
