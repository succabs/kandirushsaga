const path = require('path');
 
// here we use the plugins to clear folders and copy folder content
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
    entry: {
 
        // this is our entry point, the main JavaScript file
        app: './src/main.js',
    },
    output: {
 
        // this is our output file, the one which bundles all libraries
        filename: 'main.js',
 
        // and this is the path of the output bundle, "dist" folder
        path: path.resolve(__dirname, 'dist'),
    },
 
    // we are in production mode
    mode: 'production',
    plugins: [
 
        // here we clean the destination folder
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
 
        // here we copy some files to destination folder.
        // which files?
        new CopyPlugin({
            patterns: [
                { 
                    // src/index.html
                    from: 'index.html',
                    context: 'src/'
                },
                { 
                    // src/index.html
                    from: 'styles.css',
                    context: 'src/'
                },
                {
                    // every file inside src/assets folder
                    from: 'assets/**/*',
                    context: 'src/'
                }
            ]
        })
    ]
};