let path = require("path"),
    process = require("process"),
    webpack = require("webpack"),
    glob = require("glob"),
    yargs = require("yargs"),
	autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


// 获取所有入口文件
let getEntry = function(globPath) {
    let entries = {
        common: ['jquery','react','react-dom','react-router'],
    };
    glob.sync(globPath).forEach((entry) => {
        //let pathname = entry.split("/").splice(-2).join("/").split(".")[0];
        let pathName = entry.split("/").splice(-1).join().split(".")[0];
        entries[pathName] = [entry];
    });
    return entries;
};

// 参数
let options = yargs.option("o", {
        boolean: true,
        alias: "onLine",
        describe: "是否是生产环境"
    }).argv;

const ROOT_PATH = process.cwd(),
    NODE_PATH = path.join(__dirname, "./node_modules/"),
    OUTPUT_PATH = "/dist/boundles/",
    SOURCE_PATH = "./src/pages";

let  config = {
        entry: getEntry(path.join(__dirname, SOURCE_PATH, "index")),
        output: {
            path: path.join(__dirname, OUTPUT_PATH),
            filename: "[name].min.js",
            publicPath: OUTPUT_PATH,
            chunkFilename: "[name].min.js"
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel",
                    query: {
                        presets: ["es2015", "react"]
                    }
                },
	            {
	                test: /\.(png|jp(e)?g)$/,
		            loader: "url?limit=8192&name=../img/[name].[hash:5].[ext]"
	            },
	            {
	            	test: /\.css$/,
		            loader: ExtractTextPlugin.extract("style", ["css", "postcss"])
	            },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract("style", ["css", "postcss","less"])
                }
            ],
            preLoaders: [
                {
                    test: /\.js$/,
                    exclude: NODE_PATH,
                    loader: "source-map"
                }
            ]
        },
        resolve: {
            extensions: ["", ".jsx", ".js", ".less"],  // 自动扩展文件后缀名，require模块时可省略后缀名
            root: [ // 模块的目录（绝对路径），通常是一个目录数组
                path.join(ROOT_PATH, "")
            ],
            alias:{ // 模块别名定义，方便后续直接引用别名，无须多写长长的地址

            }
        },
		postcss: () => {
			return {
				defaults: [
					autoprefixer()
				]
			}
		},
        plugins: [
	        new webpack.DefinePlugin({
		        "_o_": options.o
	        }),
	        // UglifyJsPlugin 插件非常消耗构建性能,不建议在开发环境开启
	        // new UglifyJsPlugin({
		     //    compress: {
			 //        warnings: false
		     //    }
	        // }),
            new ExtractTextPlugin(
                "style/style.css",  // 相对于 output.path 路径
                 {
                     allChunks: true
                 }
            ),
            new CommonsChunkPlugin({
                name: "common",
                fileName: "common.js"
            })
        ],
		// 配置 externals 来将依赖的库指向全局变量，从而不再打包这个库
		externals: {
            "react": "React"
		},
		devTool: options.o || "source-map",
        devServer: {
            publicPath: OUTPUT_PATH
        }
    };
module.exports = config;