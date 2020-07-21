$(function(){
    // 全选按钮的状态发生改变时
    $(".checkall").change(function(){
        // 全选按钮与单选按钮联动
        $(".j-checkbox , .checkall").prop("checked",$(this).prop("checked"));
        //选中商品背景发生变化
        if($(this).prop("checked")){
            $(".cart-item").addClass("check-cart-item");
        }else {
            $(".cart-item").removeClass("check-cart-item");
        }

    });

    //单个商品选中状态发生改变时
    $(".j-checkbox").change(function(){
        if($(".j-checkbox:checked").length===$(".j-checkbox").length){
            $(".checkall").prop("checked",true)
        }else {
            $(".checkall").prop("checked",false)
        }
        //选中商品背景发生变化
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    
    // 减少商品数量
    $(".decrement").click(function(){
        var num=$(this).siblings(".itxt").val();
        if(num>1){
            num--;
            $(this).siblings(".itxt").val(num);
            // 单个商品价格
            var price=$(this).parents(".p-num").siblings(".p-price").text().substr(1);
            // 单个商品总价
            var sum=(price*num).toFixed(2);
            $(this).parents(".p-num").siblings(".p-sum").text("￥"+sum);
            getNumSum();
            getSum();
        }
    });
    //增加商品数量
    $(".increment").click(function(){
        var num=$(this).siblings(".itxt").val();
            num++;
            $(this).siblings(".itxt").val(num);
            $(this).siblings(".itxt").val(num);
            // 单个商品价格
            var price=$(this).parents(".p-num").siblings(".p-price").text().substr(1);
            // 单个商品总价
            var sum=(price*num).toFixed(2);
            $(this).parents(".p-num").siblings(".p-sum").text("￥"+sum);
            getNumSum();
            getSum();
    });
    //直接修改商品数量
    $(".itxt").change(function(){
        // 单个商品价格
        var price=$(this).parents(".p-num").siblings(".p-price").text().substr(1);
        // 单个商品总价
        var sum=(price*$(this).val()).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥"+sum);
        getNumSum();
        getSum();
    });
    // 删除商品
    $(".p-action").click(function(){
        $(this).parent().remove();
        getNumSum();
        getSum();
    });
    // 删除选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getNumSum();
        getSum();
    });
    //清空购物车
    $(".clear-all").click(function(){
        $(".cart-item-list").empty();
        getNumSum();
        getSum();
    });
    
    getNumSum();
    // 计算商品的总数
    function getNumSum() {
        var sum=0;
        $(".itxt").each(function(index,docEle){
            sum+=parseInt($(docEle).val());
        });
        $(".amount-sum em").text(sum);
    }
    getSum();
    //计算总价格
    function getSum() {
        var sum=0;
        $(".p-sum").each(function(index,docEle){
            sum+=parseFloat($(docEle).text().substr(1));
        });
        $(".price-sum em").text("￥"+sum.toFixed(2));
    }
});