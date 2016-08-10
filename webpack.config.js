var path = require('path');

module.exports = {
    entry: {
      gridonjs:"./src/gridonjs.js"
    },
    output: {
        path: path.join(__dirname,"build"),
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
