//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        // $(".loadingHtml").fadeOut(10000);
        queryGoods();
        refeshView('1,2,3,4,5,6')
        
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
            alert('购买'+i)
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
    req.funAndParms = `{
        function: "QueryGoods",
        args:["${miner}"]
    }`
    $.ajax({
        type:'post',
        url:'http://127.0.0.1:8000/api/dochaincode',
        data:req,
        success:res=>{
            console.log(`查询成功，您当前用户的商品数量为${res}`)
            // todo
            // 将这个商品数量映射到界面中
        },
        async:false,
    })
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
    req.funAndParms = `{
        function: "QueryBalance",
        args:["${miner}"]
    }`
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
function shopping(miner,balance,otherPeer){
    // 创建请求的对象
    let req = {};
    req.channelId = 'mychannel'
    req.chainCodeId = 'mineGame'
    req.funAndParms = `{
        function: "Shopping",
        args:["${miner}","${balance}","${otherPeer}"]
    }`
    $.ajax({
        type:'post',
        url:'http://127.0.0.1:8000/api/dochaincode',
        data:req,
        success:res=>{
            console.log(`购物成功，您当前用户的余额为${res}`)
            // todo
        },
        async:false,
    })
}

