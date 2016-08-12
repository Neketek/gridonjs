var path = require('path');

module.exports = {
    entry: {
      "/build/gridonjs":"./src/gridonjs.js",
      "/examples/gridonjs":"./src/gridonjs.js"
    },
    output: {
        path:__dirname,
        filename: "[name].min.js"
    },
    module: {
        loaders: [
            {
              loader:"babel-loader",
              exclude: [/(node_modules|dicomImageParser)/],
              query:{
                presets: ['es2015']
              }
            }
        ]
    }
};
