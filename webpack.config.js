//引入一个包
const path = require('path') //作用是用来帮助拼接路径

//引入html插件，自动生成模板并引入相关文件
const HTMLWebpackPlugin=require('html-webpack-plugin')
//引入clean，自动清除旧文件并替换新文件
const {CleanWebpackPlugin}=require('clean-webpack-plugin')


//webpack中的所有的配置信息都应该写在module.exports中
module.exports={
    //指定入口文件
    entry: './src/index.ts',
    //指定打包文件所在的目录
    output:{
        //指定打包文件文件的目录
        path:path.resolve(__dirname,'dist'),
        //打包后文件的名字
        filename: 'bundle.js',
        //告诉webpack不使用箭头函数
        environment:{
            arrowFunction: false,
            const:false
        }
    },
    //指定webpack打包时要使用的模块
    module:{
        //指定要加载的规则
        rules:[
            {
                //test指定的是规则生效的文件
                test:/\.ts$/,
                //要使用的loader,从后向前执行
                use: 
                [
                    //配置babel
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //设置babel
                        options: {
                            //设置预定义的环境
                            presets:[
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        targets:{
                                            "chrome":'58',
                                            "ie":"11"
                                        },
                                        //指定corejs的版本, 例如：corejs能处理Promise这样ie中没有的东西，corejs会引入实现
                                        "corejs": "3",
                                        //使用corejs的方式，"useage"表示按需加载:用谁就加载谁
                                         "useBuiltIns":"usage",
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //要排除的文件
                exclude: /node-modules/,
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                use:[ //从后到前使用
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions",
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({//自动生成html文件并引入相关资源
            // title: '这是一个自定义的title',
            template: './src/index.html'
        }),
    ],
    //用来设置引用模块
    resolve:{
        //以这些扩展名结尾的文件都可以作为模块使用
        extensions:['.ts','.js']
    }
}