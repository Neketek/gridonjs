var path = require('path');

module.exports = {
    entry: {
      "/build/gridonjs":"./index.js",
      "/examples/gridonjs":"./index.js"
    },
    output: {
        path:__dirname,
        filename: "[name].min.js"
    },
    module: {
        loaders: [
            {
              loader:"babel-loader",
              exclude: [/(node_modules)/],
              query:{
                presets: ['es2015']
              }
            }
        ]
    }
};
