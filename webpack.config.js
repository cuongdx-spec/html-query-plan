var path = require('path');
var webpack = require('webpack');
var crypto = require('crypto');

var development = process.env.NODE_ENV !== 'production';

// Workaround for Node.js 17+ OpenSSL 3.0 compatibility
var createHashOriginal = crypto.createHash;
crypto.createHash = function(algorithm) {
    if (algorithm === 'md4') {
        return createHashOriginal('md5');
    }
    return createHashOriginal(algorithm);
};

module.exports = {
    context: __dirname,
    entry: './src/index.ts',
    output: {
        library: "QP",
        libraryTarget: "umd",
        filename: development ? 'qp.js' : 'qp.min.js',
        path: path.join(__dirname, 'dist'),
        hashFunction: 'sha256'
    },
    optimization: {
      minimize: !development
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
}
