# 项目介绍

实现 黄金矿工游戏中的首页，账单，商店及游戏页面。

本项目的假设如下：
假定本项目的用户总数为4，第`X`个用户的名称为`peerX`。
假定本项目的商品数量总数为6，第`X`个商品的名称为`peerX`。


## 接口实现

本章将介绍接口sdk的使用样例，其官方的测试用例在`public/grpc/zcschain-sdk-js/main.js`中，需要配合相应的服务使用。

如下图所示，sdk主要提供以下方法。本章所有需要的接口皆使用下述方法。
![](https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20210323155828.png)

1. 完成挖矿接口

用户在黄金矿工中进行挖矿，挖矿超时或者主动退出挖矿时，需要将用户挖到的金币上传到区块链上。

使用接口`DoChainCode`

```js
// 请求的对象举例
var req = new massages.ChaincodeRequest();
req.setChannelid('mychannel')
req.setChaincodeid('mineGame')
req.setFunandprams( `{
    function: "Mine",
    args:["peer0",100]
}`)

// 返回值使用举例
// var jsonObj = JSON.parse(resp.getResult())
// console.log(jsonObj.balance)   
console.log(resp.getResult())  // 样例输出 1300 表示挖矿之后的账户余额
```

2. 完成查询用户拥有的商品数量接口
用户进入到商店界面中，虽然商品的信息是写死的，但是用户在购买商品的数量是动态变化的。 这时候就需要查询用户拥有商品的数量。

使用接口`DoChainCode`

```js
// 请求的对象举例
var req = new massages.ChaincodeRequest();
req.setChannelid('mychannel')
req.setChaincodeid('mineGame')
req.setFunandprams( `{
    function: "QueryGoods",
    args:["peer0"]
}`)

// 返回值使用举例
console.log(resp.getResult())  // 样例输出为 0,2,33,34,12,44
```



3. 完成查询用户余额接口


用户进入到商店界面中，可以购买商品。而在购买商品前需要检查一下用户的余额是否充足。 购买完成或失败后，需要提示相关信息，并提示账户余额。

使用接口`DoChainCode`

```js
// 请求的对象举例
var req = new massages.ChaincodeRequest();
req.setChannelid('mychannel')
req.setChaincodeid('mineGame')
req.setFunandprams( `{
    function: "QueryBalance",
    args:["peer0"]
}`)

// 返回值使用举例
console.log(resp.getResult()) // 输出样例 100
```



4. 完成购物的接口

用户在购买商品的时候，需要执行购买商品的智能合约方法来将记录存储在区块链上。

使用接口`DoChainCode`

```js
// 请求的对象举例
var req = new massages.ChaincodeRequest();
req.setChannelid('mychannel')
req.setChaincodeid('mineGame')
req.setFunandprams( `{
    function: "Shopping",
    args:["peer0",100,"peer1"]
}`)

// 返回值使用举例
console.log(resp.getState())
```

