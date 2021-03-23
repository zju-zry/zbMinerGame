/**
 * @Description: 实现返回链码调用结果的接口，该接口由peer实现
 * @author zhangruiyuan
 * @date 2021/3/21 3:13 下午
 */
function testDoChainCode(){
    // 初始化配置
    var massages = require('./client_pb')
    var services = require('./client_grpc_pb')
    var grpc = require('grpc')

    // 创建客户端工具
    var client = new services.ChainServerClient('localhost:8080', grpc.credentials.createInsecure());

    // 创建请求的对象
    var req = new massages.ChaincodeRequest();
    req.setChannelid('mychannel')
    req.setChaincodeid('mineGame')
    req.setFunandprams( `{
        function: "Mine",
        args:["peer0",100]
    }`)

    // 发送请求
    client.doChainCode(req,function (err,resp){

        // 获取返回值
        // console.log(resp.getResult())
        // console.log(resp.getStatus())
        // console.log(resp.getBlockhash())

        // 对处理结果进行相应
        var jsonObj = JSON.parse(resp.getResult())
        console.log(jsonObj.balance)
    })
}

/**
 * @Description: 实现返回区块链账本的数据
 * @author zhangruiyuan
 * @date 2021/3/21 3:13 下午
 */
function testBlockChain(){
    // 初始化配置
    var massages = require('./client_pb')
    var services = require('./client_grpc_pb')
    var grpc = require('grpc')

    // 创建客户端工具
    var client = new services.ChainServerClient('localhost:8080', grpc.credentials.createInsecure());

    // 创建请求的对象
    var req = new massages.BlockChainRequest();
    req.setChannelid('mychannel')
    req.setChaincodeid('mineGame')

    // 发送请求获得回调函数
    var call = client.blockChain(req);
    // 绑定接收到数据的接口
    call.on('data',function (block){
        // 对收到的数据进行处理
        console.log(block.getMiner())
        console.log(block.getZbnumber())
        console.log(block.getBlocknum())
        console.log(block.getBlockhash())
    })
    // 绑定接收到的数据结束接口
    call.on('end',function (){
        // 收到了所有的数据，进行合并显示或其他操作
        console.log("结束")
    })
}


 /**
  * @Description: 启动测试
  * @author zhangruiyuan
  * @date 2021/3/23 11:45 上午
  */
testDoChainCode()
testBlockChain()



