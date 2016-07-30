var path = require('path');

module.exports = {
    entry: {
      main:"./src/main.js"
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
