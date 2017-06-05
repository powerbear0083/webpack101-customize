const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
	// entry: './src/app.js',
	entry: {
		app: './src/app.js',
		contact: './src/contact.js'
	},
	output: {
		// path: '/Users/eu-team/eu-work/self-practice/09_webpack101-customize/dist',
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(sass|scss)$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: path.resolve(__dirname, 'dist')
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: ['html-loader', 'pug-html-loader']
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
  		compress: true,
  		port: 9000,
  		stats: 'errors-only',
  		open: true
	},
	plugins: [
	    new HtmlWebpackPlugin({
	        title: 'Project demo',
	        // minify: {
	        // 	collapseWhitespace: true
	        // },
	        hash: true,
	        excludeChunks: ['contact'],
	        template: './src/index.pug'
	    }),
	    new HtmlWebpackPlugin({
	        title: 'Contact Page',
	        hash: true,
	        chunks: ['contact'],
	        filename: 'contact.html',
	        template: './src/contact.html'
	    }),
	    new ExtractTextPlugin({
	    	filename: 'app.css',
	    	disable: false,
	    	allChunks: true
	    })
	]
}