/**
 * Created by zhanghexuan on 17/1/9.
 *
 * webpack --config webpack.ddl.config.js
 */
let path = require("path"),
	webpack = require("webpack"),
	dllPlugin = webpack.DllPlugin;

module.exports = {
	output: {
		path: path.join(__dirname, "/dist/dll"),
		filename: "[name].js",
		libary: "[name]"
	},
	entry: {
		lib: [
			"react",
			"jquery",
			"react-dom",
			"react-router"
		]
	},
	plugins: [
		new dllPlugin({
			path: path.join(__dirname, "/dist/dll/manifest.json"),
			name: "[name]",
			context: __dirname
		})
	]
};