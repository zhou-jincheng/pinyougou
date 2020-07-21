// 主页js代码
$(function () {

    var flag = true;
    // 当前楼层被选中
    $(".fixtool li").click(function () {
        flag = false;
        $(this).addClass("current").siblings().removeClass("current");
        var index = $(this).index();
        $("body,html").stop().animate({
            scrollTop: $(".floor>div").eq(index).offset().top
        }, function () {
            flag = true;
        });

    });
    // 页面滚动到特定位置显示电梯导航栏
    $(window).scroll(function () {
        showFixTool();
    });
    //页面刷新是需判断是否显示电梯导航栏
    showFixTool();
    function showFixTool() {
        if ($(document).scrollTop() >= $(".recom").offset().top) {
            $(".fixtool").fadeIn();
        } else {
            $(".fixtool").fadeOut();
        }
        if (flag) {
            $(".floor>div").each(function (index, docEle) {
                if ($(document).scrollTop() >= $(docEle).offset().top) {
                    $(".fixtool li").eq(index).addClass("current").siblings().removeClass("current");
                }
            });
        }
    }


    // 使用原生js制作首页轮播图
    // 获取元素
    var focus = document.querySelector(".focus");
    var arrow_l = document.querySelector(".arrow-l");
    var arrow_r = document.querySelector(".arrow-r");
    var focusWidth = focus.offsetWidth;

    focus.addEventListener("mouseenter", function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
    })
    focus.addEventListener("mouseleave", function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
    })

    //生成小圆圈
    var ul = focus.querySelector("ul");
    var ol = focus.querySelector(".circle");
    
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("index",i);
        ol.appendChild(li);

        //点击小圆圈，跳到相对于的图片
        li.addEventListener("click", function () {
            // 选中的小圆圈变色
            circle = num = this.getAttribute("index");
            changeCircle();
            //定位到对应的图片
            console.log(focusWidth);
            console.log(circle);
            
            animate(ul, -focusWidth * circle);
        })
    }
    //第一个默认为选中状态
    ol.children[0].className = "current";
    // clone第一张图片(li)并添加到最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //点击右侧按钮，图片滚动一张
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    arrow_r.addEventListener("click", function () {
        if (num == ul.children.length-1) {
            ul.style.left = 0 + "px";
            num = 0;
        }
        num++;
        animate(ul, -focusWidth * num);
        circle++;
        if(circle == 4) {
            circle = 0;
        }
        changeCircle();
    })

    //左侧按钮
    arrow_l.addEventListener("click", function () {
        animate(ul,-50);
    })
    //选中的小圆圈变色
    function changeCircle(){
        // 清除选中的小圆圈
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        // 选中的小圆圈变色
        ol.children[circle].className = "current";
    }

})