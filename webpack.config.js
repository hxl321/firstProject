const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

//1. 通过node中的模块操作, 向外暴露出这个配置对象,
module.exports = {
    //配置的打包模式是开发模式
    mode: 'development',
    //入口文件 : 要是用webpack打包哪个文件
    entry: path.join(__dirname, './src/index.js'),
    //把打包好的文件输出到哪个目录
    output:{
        path:path.join(__dirname, './dist'),//输出的目录
        filename:'main.js' //指定输出的文件名
    },
    //配置webpack的插件
    plugins:[
        //创建一个在内存中可以生成html的插件
        new htmlWebpackPlugin({
            //指定模板文件的路径
            template: path.join(__dirname, './src/index.html'),
            //设置生成在内存中页面的名称
            filename:'index.html'
        })
    ],
    //配置所有第三方loader模块
    module:{
        rules:[
            //匹配所有后缀名为.css的文件
            { test:/\.css$/, use: ['style-loader','css-loader'] },
            //配置所有后缀名为.less的文件
            {test:/\.less$/, use:['style-loader','css-loader','less-loader']},
            //配置所有后缀名为.scss的文件
            {test:/\.scss$/, use:['style-loader','css-loader','sass-loader']},
            //配置图片路径的loader
            //问题 : 图片都被转换成base64格式的了
            //解决: 只有小图片才适合转换. 通过问号传参设置图片大小的范围, 小于该范围则转化base64, 大于该范围则不转化
            // 问题: 但是不转换也不是自己的图片名, 主要是防止图片名重复
            //解决: 想要是用自己的图片名, 加第二个参数 &name=[name].[ext]
            //问题: 万一图片真的有重复的情况
            //解决: 在前面设置一个hash值,默认是32位 类似于身份证 [hash: 6] 设置6位hash值

            {test:/\.(jpg|png|gif|jpeg)$/,use:'url-loader?limit=109400&name=[hash:6][name].[ext]'},
            //配置字体文件的loader
            {test:/\.(ttf|woff|woff2|svg|eot)$/, use:'url-loader'},
            //处理js, 使用babel转换器来转换成能识别的语法
            //注意 : 一定要把node_modules排除掉
            {test:/\.js$/, use:'babel-loader', exclude: /node_modules/},
            //配置后缀名为vue
            { test:/\.vue$/, use: 'vue-loader'}

        ]
    },
    resolve:{
        //导入vue模块时, 修改导入时的路径
        alias:{
            'vue$': 'vue/dist/vue.js'
        }
    }



}