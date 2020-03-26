const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
//读取文件
module.exports = {
    entry: './index.js',
    
    // 输出
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: 'simpleScreenCut.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets:['@babel/preset-env'] //转码规则
                    }
                }]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};