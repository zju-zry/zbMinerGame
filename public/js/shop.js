const Goods = [
    {
        seller: "peer0",
        money : 10
    },
    {
        seller: "peer2",
        money : 30
    },
    {
        seller: "peer3",
        money : 150
    },
    {
        seller: "peer0",
        money : 10
    },
    {
        seller: "peer2",
        money : 30
    },
    {
        seller: "peer3",
        money : 150
    },
]

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        // $(".loadingHtml").fadeOut(10000);
        // 假定当前用户是peer1
        let goods = queryGoods("peer1");
        console.log(goods)
        refeshView(goods)
        
    }
}

/**
 * 对界面的信息进行刷新，填充已拥有的数据量
 * @param {*} miner 
 */
function refeshView(str){
    let arr = str.split(',')
    
    for (let i=0;i<arr.length;i++){
        $($('.smaller')[i]).html("已拥有："+arr[i])
        $($('.downloadimg')[i]).click(()=>{
            console.log('购买'+Goods[i].seller+"-"+Goods[i].money)
            let b = queryBalance("peer1")
            b = JSON.parse(b.message).balance
            console.log('当前账户的余额为'+b)
            if (b<Goods[i].money){
                alert("对不起，您的余额为"+b+"，你买不起，要先去挖矿")
            }else{
                shopping("peer1",Goods[i].money,Goods[i].seller,i)
                alert('恭喜您购物成功，您当前的余额为'+(b-Goods[i].money))
            }
        })
    }
}   

/**
 * 查询当前用户的商品数量
 * @param {*} miner 
 */
function queryGoods(miner){
    // 创建请求的对象
    let req = {};
    req.channelId = 'mychannel'
    req.chainCodeId = 'mineGame'
    req.funAndParms = `["QueryGoods","${miner}"]`
    let goods = ""
    $.ajax({
        type:'post',
        url:'http://127.0.0.1:8000/api/dochaincode',
        data:req,
        success:res=>{
            console.log(`查询成功，您当前用户的商品数量为${res}`)
            goods = res.message
        },
        async:false,
    })
    return goods
}

/**
 * 返回当前账户的余额
 * @param {*} miner 
 */
function queryBalance(miner){
    // 创建请求的对象
    let req = {};
    req.channelId = 'mychannel'
    req.chainCodeId = 'mineGame'
    req.funAndParms = `["QueryBalance","${miner}"]`
    let balance = -1
    $.ajax({
        type:'post',
        url:'http://127.0.0.1:8000/api/dochaincode',
        data:req,
        success:res=>{
            console.log(`查询成功，您当前用户的余额为${res}`)
            // todo
            balance = res
        },
        async:false,
    })
    return balance
}

/**
 * 完成转账操作
 * @param {*} miner 
 * @param {*} balance 
 * @param {*} otherPeer 
 */
function shopping(miner,balance,otherPeer,index){
    // 创建请求的对象
    let req = {};
    req.channelId = 'mychannel'
    req.chainCodeId = 'mineGame'
    req.funAndParms = `["Shopping","${miner}","${balance}","${otherPeer}_${index}"]`
    $.ajax({
        type:'post',
        url:'http://127.0.0.1:8000/api/dochaincode',
        data:req,
        success:res=>{
            console.log(res)
        },
        async:false,
    })
}

