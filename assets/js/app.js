/**
 * Created by Laiyang on 2017/5/11.
 */
$(function () {
    var mySwiper1 = new Swiper('.myswiper1', {
        autoplay: 3000,//可选选项，自动滑动
        effect : 'fade',
        fade: {
            crossFade: true
        },
        pagination : '.swiper-pagination',
        paginationClickable :true
    });
    var mySwiper2 = new Swiper('.myswiper2', {
        loop:true,
        effect : 'fade',
        fade: {
            crossFade: true,
        },
        nextButton: '.arrow2',
        prevButton: '.arrow1'
    });
    var swiperEat = new Swiper('.swiper-eat', {
        loop:true,
        slidesPerView : 4,
        nextButton: '.arrow2',
        prevButton: '.arrow1'
    });
    var swiperEat = new Swiper('.swiper-shop', {
        loop:true,
        slidesPerView : 1,
        nextButton: '.arrow2',
        prevButton: '.arrow1'
    });
});

//留言================================
function check(n){
    var info = "";
    if(n==1){//留言
        document.myform.KS_Url.value=getCookie("Url");
        //document.myform.KS_IP.value=getCookie("comeIp");
        document.myform.KS_Keyword.value=getCookie("KeyWord");
        var nameStr = document.myform.KS_Name.value;
        var TelStr = document.myform.KS_Tel.value;
        //var cityStr = document.myform.KS_City.value;
        var contentStr = document.myform.KS_Content.value;
        if (!TelStr.match(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/) || TelStr.length!=11) {
            info = "请输入正确的电话号码！以便及时联系您！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (nameStr == "") {
            info = "请输入您的名字！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (contentStr == "") {
            info = "请输入您想咨询的问题！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (info == "") {
            $.post("/plus/form/form.asp", $("#myform").serialize(),function(){total()});//表单提交
            alert("留言成功，我们将尽快与您联系！");
            document.myform.KS_Name.value="";
            document.myform.KS_Tel.value="";
            //document.myform.KS_City.value="";
            document.myform.KS_Content.value="";
            setCookie("isJm", "y");//看加盟费
        }
    }else if(n==2){//加盟费
        document.myform.KS_Url.value=getCookie("Url");
        //document.myform.KS_IP.value=getCookie("comeIp");
        document.myform.KS_Keyword.value=getCookie("KeyWord");
        //document.myform.KS_Content.value="【加盟费】";
        var TelStr = document.myform.KS_Tel.value;
        var cityStr = document.myform.KS_City.value;
        var nameStr = document.myform.KS_Name.value;
        if (cityStr == "") {
            info = "请输入您准备加盟的城市！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (!TelStr.match(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/) || TelStr.length!=11) {
            info = "请输入正确的电话号码！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (nameStr == "") {
            info = "请输入您的名字！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (info == "") {
            $.post("/plus/form/form.asp", $("#myform").serialize(),function(){total();});//表单提交
            $(".jmfTable").show();
            setCookie("isJm", "y");//看加盟费
            document.myform.KS_Name.value="";
            document.myform.KS_Tel.value="";
            document.myform.KS_City.value="";
        }
    }else if(n==3){//预算
        document.myform.KS_Url.value=getCookie("Url");
        //document.myform.KS_IP.value=getCookie("comeIp");
        document.myform.KS_Keyword.value=getCookie("KeyWord");
        //document.myform.KS_Content.value="【预算】";
        var CityStr = document.myform.KS_City.value;
        var AreaStr = document.myform.KS_Area.value;
        var TelStr = document.myform.KS_Tel.value;
        var nameStr = document.myform.KS_Name.value;
        if (CityStr == "") {
            info = "请输入准备加盟的城市！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (isNaN(AreaStr) || AreaStr < 190) {
            info = "请输入200平米以上的店铺面积！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (!TelStr.match(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/) || TelStr.length!=11) {
            info = "请输入正确的电话号码！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (nameStr == "") {
            info = "请输入您的名字！";
            document.getElementById("info").innerHTML = info;
            return false;
        }
        if (info == "") {
            $.post("/plus/form/form.asp", $("#myform").serialize(),function(){total()});//表单提交
            setCookie("isJm", "y");//看加盟费
            setCookie("City", CityStr);//计算用
            setCookie("Area", AreaStr);//计算用
            document.myform.KS_Name.value="";
            document.myform.KS_Tel.value="";
            document.myform.KS_City.value="";
            document.myform.KS_Area.value="";
            document.getElementById("info").innerHTML = "";
        }
    }
}
//设置来源URL
if(getCookie("Url")==null){
    var ref = "";//来源网址
    if (document.referrer.length > 0) {
        ref = document.referrer;
    }else if(opener.location.href.length > 0) {
        ref = opener.location.href;
    }
    var domain=getDomain(ref);//域名
    setCookie("Url", domain);//写入Cookies
    //找关键词
    var st=0;//开始位置
    if(ref.indexOf('query=',1)>0){//sogou
        st=ref.indexOf('query=',1)+6;
    }else if(ref.indexOf('search=',1)>0){//gougou
        st=ref.indexOf('search=',1)+7;
    }else if(ref.indexOf('w=',1)>0){//soso
        st=ref.indexOf('w=',1)+2;
    }else if(ref.indexOf('q=',1)>0){//google、yodao、bing、yahoo、360
        st=ref.indexOf('q=',1)+2;
    }else if(ref.indexOf('word=',1)>0){//百度手机
        st=ref.indexOf('word=',1)+5;
    }else if(ref.indexOf('keyword=',1)>0){//m.sogou.com
        st=ref.indexOf('keyword=',1)+8;
    }else{
        st=0;
    }
    if(st>0){
        setCookie("KeyWord", getKeyWord(ref,st));//写入Cookies
    }
}//设置来源URL
//获取关键词
function getKeyWord(url,st){
    var en =  url.indexOf('&', st);
    var keyWord = url.substring(st,en);
    return decodeURI(keyWord);
}
//获取域名
function getDomain(url){
    var st = url.indexOf('//', 1);
    var en =  url.indexOf('/', st + 2);
    var domain = url.substring(st + 2,en);
    return domain;
}
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//读cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}