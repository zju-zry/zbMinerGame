// 启动的代码
// node public/server/http2grpc.js

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const ipaddr = 'localhost:7051'
const channelId = 'mychannel'
const chainCodeId = 'mineGame'

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next()
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); //data参数以字典格式传输

/**
 * 这里我打算实现了两个请求：dochaincode、blockchain
 */
// 127.0.0.1:8000/api/dochaincode?channelId=1&chainCodeId=2&funAndParms={name:"zhangruiyuan"}
app.post('/api/dochaincode', (reqe, res) => {

    // 处理前端的请求
    let r = reqe.body

    // 向后端提交请求
    // 初始化配置
    let massages = require('../grpc/zcschain-sdk-js/client_pb')
    let services = require('../grpc/zcschain-sdk-js/client_grpc_pb')
    let grpc = require('grpc')

    // 创建客户端工具
    let client = new services.ChainServerClient(ipaddr, grpc.credentials.createInsecure());

    // 创建请求的对象
    let req = new massages.ChaincodeRequest();
    req.setChannelid(r.channelId)
    req.setChaincodeid(r.chainCodeId)
    req.setFunandprams(r.funAndParms)

    // 发送请求
    client.doChainCode(req, function (err, resp) {
        // 对处理结果进行相应
        let jsonObj = JSON.parse(resp.getResult())
        // console.log(resp)
        // 对前端进行返回
        res.send(jsonObj);
    })
});

/**
 * blockchain接口的实现
 */
app.post('/api/blockchain', (reqe, resp) => {
    // 初始化配置
    let massages = require('../grpc/zcschain-sdk-js/client_pb')
    let services = require('../grpc/zcschain-sdk-js/client_grpc_pb')
    let grpc = require('grpc')

    // 创建客户端工具
    let client = new services.ChainServerClient(ipaddr, grpc.credentials.createInsecure());

    // 创建请求的对象
    let req = new massages.BlockChainRequest();
    req.setChannelid('mychannel')
    req.setChaincodeid('mineGame')

    // 发送请求获得回调函数
    let call = client.blockChain(req);
    // 绑定接收到数据的接口
    let res = []
    call.on('data',function (block){
        // 对收到的数据进行处理
        console.log(block.getMiner())
        console.log(block.getZbnumber())
        console.log(block.getBlocknum())
        console.log(block.getBlockhash())
        res.push(block.array)
    })
    // 绑定接收到的数据结束接口
    call.on('end',function (){
        // 收到了所有的数据，进行合并显示或其他操作
        console.log("结束")
        resp.send(res)
    })
})


/**
 * 执行init函数
 */
function ccInit(){

    // 向后端提交请求
    // 初始化配置
    let massages = require('../grpc/zcschain-sdk-js/client_pb')
    let services = require('../grpc/zcschain-sdk-js/client_grpc_pb')
    let grpc = require('grpc')

    // 创建客户端工具
    let client = new services.ChainServerClient(ipaddr, grpc.credentials.createInsecure());

    // 创建请求的对象
    let req = new massages.ChaincodeRequest();
    req.setChannelid(channelId)
    req.setChaincodeid(chainCodeId)
    req.setFunandprams('["init"]')

    // 发送请求
    client.doChainCode(req, function (err, resp) {
        console.log("初始化链码成功")
    })
}



//配置服务端口
let server = app.listen(8000, () => {
    console.log("node接口服务正常运行");
    console.log('正在初始化链码')
    // 启动链码的初始化
    ccInit()
});
