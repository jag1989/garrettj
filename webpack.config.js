const path = require("path");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylelint = require('stylelint-webpack-plugin');
const imagemin = require('imagemin-webpack-plugin').default;
const copywebpack = require('copy-webpack-plugin');

module.exports = {
	entry: "./main.js",
	output: {
		path: path.join(__dirname, "assets"),
		publicPath: 'assets',
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' }, 
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
				]
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' }
				]
			}
		],
	},
	plugins: [
		new stylelint(),
		new copywebpack([{
			from: 'src/images',
			to: 'images'
		}]),
		new imagemin({
			test: /\.(jpe?g|png|gif|svg)$/i
		})
	]
};