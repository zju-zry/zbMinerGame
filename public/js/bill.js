// 生成 bill中收入部分的html结构
var bill = {
  divclass:"tx",
  imgclass:"inoutimg", imgsrc:"imgs/收入@3x.png",
  spanclass:"bold",
  name1:"矿工 ", name2:"张瑞元",
  salary1:"收入 ", salary2:"10zb",
  blocknum1:"所在区块 ", blocknum2:"89787675",
  id1:"唯一编码 ", id2:"ghon7fhkih286tifbkibf8gfs7",
};


window.onload = init;

/**
 * 产生初始化的交易内容
 */
function init() {
  // 获取区块链账本数据
  let ans = blockchain('mychannel','mineGame')
  ans.forEach(b=>{
    bs = b.miner.split('_')
    if (bs.length===2){
      // 创建交易实例
      buildItem({...bill,
        name2:bs[0]+' ',
        shop:bs[1]+' ',
        imgsrc:'imgs/支出@3x.png',
        name1:'买家 ',
        salary1:'花费 ',
        salary2:b.zbNumber+"zb",
        blocknum2:b.blockNum,
        id2:b.blockHash
      });
    }else{
      // 创建挖矿实例
      buildItem({...bill,
        name2:b.miner+' ',
        salary2:b.zbNumber+"zb",
        blocknum2:b.blockNum,
        id2:b.blockHash
      });
    }
  })
}

/**
 * 获取区块数据
 * @param {*} billin 
 */
function blockchain(channelId, chainCodeId) {
  // 创建请求的对象
  let req = {};
  req.channelId = channelId
  req.chainCodeId = chainCodeId
  let ans = []
  $.ajax({
      type:'post',
      url:'http://127.0.0.1:8000/api/blockchain',
      data:req,
      success:res=>{ 
        ans.push(res)
      },
      async:false,
  })
  return ans 
}

















/**
 * 创建一个收入的ui块（其实就是挖矿成功）
 * @param {*} billin 
 */
function buildItem(billin) {

  // 图片或其他处理

  var div = document.createElement("div");
  div.className = billin.divclass

  var main = document.getElementById("main")
  main.appendChild(div);

  var img = document.createElement("img")
  img.className = billin.imgclass;
  img.src = billin.imgsrc;
  div.appendChild(img);


  // 矿工或者买家

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.name1;
  div.appendChild(span1);

  var span2 = document.createElement("span");
  span2.innerHTML = billin.name2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"))

 // 收入或者支出

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.salary1;
  div.appendChild(span1);

  var span2 = document.createElement("span");
  span2.innerHTML = billin.salary2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"))

  // 购物时候的支出

  if (billin.shop){

    var span1 = document.createElement("span");
    span1.className = billin.spanclass;
    span1.innerHTML = '商家 ';
    div.appendChild(span1);
   
    var span2 = document.createElement("span");
    span2.innerHTML = billin.shop;
    div.appendChild(span2);
    div.appendChild(document.createElement("br"))

  }

  // 所在的区块

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.blocknum1;
  div.appendChild(span1);
 
  var span2 = document.createElement("span");
  span2.innerHTML = billin.blocknum2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"))

  // 区块的hash

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.id1;
  div.appendChild(span1);

  var span2 = document.createElement("span");
  span2.innerHTML = billin.id2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"));
}

