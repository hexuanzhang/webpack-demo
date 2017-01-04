/**
 * Created by zhanghexuan on 16/12/27.
 */
const webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    WebpackBrowserPlugin = require('webpack-browser-plugin');

// 配置服务地址,端口
const domain = "localhost",
    port = "8001";
    url = `http://${domain}:${port}/`;

let config = require('./webpack.config.js');

for (let prop in config.entry) {
    // 每个入口文件加入 client websocket 热加载脚本
    config.entry[prop].unshift(
        `webpack-dev-server/client?${url}`,
        'webpack/hot/dev-server'
    );
}

//加入热更新插件,无错误插件,全局变量定义插件,服务启动后自动在浏览器中打开连接的插件
config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
    new WebpackBrowserPlugin(
        {
            port: port,
            url: `http://${domain}`
        }
    )
);

// debug
config.debug = true;
// 生成source-map, 用于调试, 效果如: webpack -d
// config.devtool = 'cheap-module-eval-source-map';
config.devtool = 'source-map';

new WebpackDevServer(webpack(config), {
    hot: true, // 热更新
    inline: true, // 自动刷新
    historyApiFallback: true,
    noInfo: false,
    publicPath: config.devServer.publicPath,
    progress: true,
    stats: { colors: true } // 颜色标识
}).listen(port, domain, (err) => {
    if (err) {
        console.log(err);
    }
});