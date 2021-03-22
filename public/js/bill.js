// 生成 bill中收入部分的html结构
var billin = {
  divclass:"tx",
  imgclass:"inoutimg", imgsrc:"imgs/收入@3x.png",
  spanclass:"bold",
  name1:"矿工 ", name2:"张瑞元",
  salary1:"收入 ", salary2:"10zb",
  blocknum1:"所在区块 ", blocknum2:"89787675",
  id1:"唯一编码 ", id2:"ghon7fhkih286tifbkibf8gfs7",
};





window.onload = init;

function init() {
  buildItem(billin);
  buildItem(billin);
  buildItem(billin);
}

function buildItem(billin) {
  var div = document.createElement("div");
  div.className = billin.divclass

  var main = document.getElementById("main")
  main.appendChild(div);

  var img = document.createElement("img")
  img.className = billin.imgclass;
  img.src = billin.imgsrc;
  div.appendChild(img);

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.name1;
  div.appendChild(span1);

  var span2 = document.createElement("span");
  span2.innerHTML = billin.name2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"))

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.salary1;
  div.appendChild(span1);


  var span2 = document.createElement("span");
  span2.innerHTML = billin.salary2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"))

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.blocknum1;
  div.appendChild(span1);


  var span2 = document.createElement("span");
  span2.innerHTML = billin.blocknum2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"))

  var span1 = document.createElement("span");
  span1.className = billin.spanclass;
  span1.innerHTML = billin.id1;
  div.appendChild(span1);


  var span2 = document.createElement("span");
  span2.innerHTML = billin.id2;
  div.appendChild(span2);
  div.appendChild(document.createElement("br"));
}

