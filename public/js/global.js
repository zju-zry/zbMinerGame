//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        // $(".loadingHtml").fadeOut(1000);
    }
}

setTimeout(()=>{
    $(".loadingHtml").fadeOut(1000);
    gameStart();
},2000);

var hookDeg = 0;            //钩子摆动角度
var hookState = false;      //钩子摆动状态 false 启动 true 停止
var hookController = 1;     //控制钩子左右摆动
var hookMoveNum = 1;        //钩子伸出长度控制变量
var hookMoveState = false;  //钩子伸出状态 false 启动 true 停止
var hookMoveStop = false;   //判断不能双击变量
var tabBoxWidth = 0;        //挖矿区域盒子宽度
var tabBoxHeight = 0;       //挖矿区域盒子高度
var tabBoxOffsetTop = 0;    //挖矿区域距顶部距离
var level = 1;              //关卡数
var remPx = 0;              //换算单位 1rem 等于多少px
var moveHeight = 0;         //钩子伸出距离
var speed = 20;              //钩子速度
var isAfterOre = true;     //碰到后关闭查找是否碰触元素方法
var userScore = 0;          //用户拿到的分数值
var objOre;                 //触碰到的矿石
var gameTime = 60;          //没关的游戏时间
var gameState = false;      //是否是否启动

/**
 * 共分5关 第一关1000 第二关1500 第三关2000 第四关2500 第五关3000
 */

var levelArray = [
    {
        gold: [
            {
                type: "gold",   //类型
                score: 100,     //分数
                speed: 8        //速度 不超过20 数值越大速度越慢
            },
            {type: "gold", score: 400, speed: 16},
            {type: "gold", score: 200, speed: 10},
            {type: "gold", score: 200, speed: 10},
        ],
        stone: [
            {type: "stone", score: 50, speed: 18},
            {type: "stone", score: 30, speed: 14},
            {type: "stone", score: 20, speed: 10},
        ]
    }
];

$(document).ready(function () {
    tabBoxWidth = $(".tabBox").width(); //挖矿区域盒子宽度
    tabBoxHeight = $(".tabBox").height(); //挖矿区域盒子高度
    tabBoxOffsetTop = $(".tabBox").offset().top; //挖矿区域盒子高度
    remPx = $(".hookLine")[0].getBoundingClientRect().height;        //remPx 赋值为 1rem 的 px值
    //钩子伸出距离初始赋值
    moveHeight = $(".main").height() - remPx * 9.2;
    //为钩子 线 重新赋值 位置大小等信息px
    $(".hookBox").css({"height": remPx * 4.5, "top": remPx * 9.2, "left": remPx * 9,});
    $(".hookLine").css({"height": remPx, "top": remPx * 9.2, "left": remPx * 9.9,});
    //点击弹出钩子
    $(".tabBox").on("click", function () {
        //判断钩子有没有收回
        if (hookMoveStop) {
            return
        }
        //触发弹出动作
        hookMoveState = false;
        hookMove(1);
    })
});

/**
 * 游戏结束
 */
function gameStop() {
    //钩子停止
    hookStop();
    gameState = false;
}

/**
 * 游戏开始
 */
function gameStart() {
    $(".oreImg").remove();
    //绘制金矿
    renderOre(levelArray[level - 1].gold);
    //绘制大石头
    renderOre(levelArray[level - 1].stone);
    gameTime = 60;
    $(".gameTime").text(gameTime);
    //钩子摆动
    hookStart();
    gameState = true;
    gameTimeStart();
}

// 定时器开始
function gameTimeStart() {
    if(!gameState){return}
    if(gameTime!=0){
        gameTime--;
        $(".gameTime").text(gameTime);
        setTimeout(function () {
            gameTimeStart();
        }, 1000);
    }else{
        gameStop();
    }
}

/**
 * 钩子摆动动画
 * @param smer
 */
function hookRotate() {
    $(".hookBox").css("transform", "rotate(" + hookDeg + "deg)");
    $(".hookLine").css("transform", "rotate(" + hookDeg + "deg)");
    if (hookController == 1) hookDeg++;
    else hookDeg--;
    if (hookDeg >= 70) {
        hookDeg = 70;
        hookController = -1;
    }
    if (hookDeg <= -70) {
        hookDeg = -70;
        hookController = 1;
    }
    //控制器 钩子停止摆动
    if (hookState) {
        return
    }
    setTimeout('hookRotate(' + hookController + ')', 30);
}

//钩子摆动启动
function hookStart() {
    //钩子摆动状态启动
    hookState = false;
    //钩子摆动动画执行
    hookRotate();
}

// 钩子摆动停止
function hookStop() {
    //钩子摆动状态停止
    hookState = true;
}

/**
 * 钩子伸出
 * @param moveSmer  钩子伸出还是收回 1伸出 -1收回
 */
function hookMove(moveSmer) {
    if (!gameState) return;
    //判断不能双击变量
    hookMoveStop = true;
    //钩子摆动停止
    hookStop();
    if (moveSmer == -1) {
        //钩子收回后的判断
        if (hookMoveNum <= remPx + speed) {
            //将触碰矿石判断启动
            isAfterOre = true;
            //判断不能双击变量
            hookMoveStop = false;
            //钩子伸出控制器
            hookMoveState = true;
            //钩子伸出距离长度还原
            moveHeight = $(".main").height() - remPx * 9.2;
            $(".hook").attr("src", "public/image/hookOpen.png");
            speed = 20;
            //钩子摆动启动
            hookStart();
            //如果触碰到矿石 收回后将矿石数据删除
            if (objOre) {
                //矿石抓回后将分数加入
                userScore += Number(objOre.obj.attr("data-score"));
                $(".userScore").text(userScore);
                objOre.obj.remove();
                objOre = null;
                //如果矿石全部抓完 当前关卡结束
                if($(".oreImg").length==0){
                    gameStop();
                    level+=1;
                }
            }
        }
    }
    if (hookMoveState) return;
    //去除bug 有可能为负值
    if (speed == 0) speed = 1;
    if (speed < 0) speed = -speed;
    if (moveSmer == 1) hookMoveNum += speed;
    else hookMoveNum -= speed;
    if (hookMoveNum < remPx) {
        hookMoveNum = remPx;
        moveSmer = 1;
    }
    if (hookMoveNum >= moveHeight) {
        hookMoveNum = moveHeight;
        moveSmer = -1;
    }

    //是否能触碰矿石判断
    if (isAfterOre) {
        //循环所有矿石 判断钩子是否触碰到
        for (var i = 0; i < $(".oreImg").length; i++) {
            if (impact($(".hook"), $(".oreImg").eq(i))) {
                //将触碰矿石判断关闭
                isAfterOre = false;
                objOre = impact($(".hook"), $(".oreImg").eq(i));
                moveHeight = objOre.top - remPx * 9.2;
                $(".hook").attr("src", "public/image/hookClose.png");
                switch (objOre.obj.attr("data-type")) {
                    case "gold":
                        speed -= Number(objOre.obj.attr("data-speed"));
                        break;
                    case "stone":
                        speed -= Number(objOre.obj.attr("data-speed"));
                        break;
                }
            }
        }
    }
    //钩子 线 移动状态
    $(".hookBox").css("height", hookMoveNum + remPx * 3.5 + "px");
    $(".hookLine").css("height", hookMoveNum + "px");
    if (objOre) {
        objOre.obj.css({"top": $(".hookPoint").offset().top - 10, "left": $(".hookPoint").offset().left - 10})
    }
    setTimeout('hookMove(' + moveSmer + ')', 50);
}


/**
 * 生成随机数
 * @param lowerValue  开始
 * @param upperValue  结束
 * @returns {number}
 */
function getNum(lowerValue, upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

/**
 * 绘制矿石
 * @param arr 数组
 */
function renderOre(arr) {
    for (var i = 0; i < arr.length; i++) {
        // 通过getNum函数获取图片xy轴的坐标
        var top = getNum(tabBoxOffsetTop + 50, tabBoxHeight), left = getNum(0, tabBoxWidth) + $(".tabBox").offset().left;
        //随机旋转角度
        var rotate = getNum(0, 360);
        //根据分值绘制大小
        var scale = 1;
        if (arr[i].type == "gold") {
            scale = arr[i].score / 200;
        } else if (arr[i].type == "stone") {
            scale = arr[i].score / 20;
        }
        // 追加到div容器中
        $("<img/>", {
            "class": "oreImg",
            "src": "public/image/" + arr[i].type + ".png",
            "data-score": arr[i].score,
            "data-type": arr[i].type,
            "data-speed": arr[i].speed
        }).appendTo(".main")
            .css({
                "top": top,
                "left": left,
                "position": "fixed",
                "transform": "rotate(" + rotate + "deg) scale(" + scale + ")"
            });
    }
}

/** 判断是否碰撞
 * @param obj 原对象
 * @param dobj 目标对象
 */
function impact(obj, dobj) {
    var o = {
        x: obj.offset().left,
        y: obj.offset().top,
        w: obj.width(),
        h: obj.height()
    };
    var d = {
        x: dobj.offset().left,
        y: dobj.offset().top,
        w: dobj.width(),
        h: dobj.height()
    };
    var px, py;
    px = o.x <= d.x ? d.x : o.x;
    py = o.y <= d.y ? d.y : o.y;
    // 判断点是否都在两个对象中
    if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {
        return {obj: dobj, top: d.y};
    } else {
        return false;
    }
}