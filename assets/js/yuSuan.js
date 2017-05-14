//单价
//var _rent = 83;//默认每平租金++++++++++++++++++++++++++++++++++++++++++
//var _rentT = 12;//按压一付3算++++++++++++++++++++++++++++++++++++++++++
var _zx = 1200;//默认每平装修费=====
var _design = 80;//400平以上每平设计费=====
var _rj = 0.28;//容积率（每平米可容纳的人数）=====
var _ys = 5;//每桌椅子数=====
var _zz = 2600;//餐桌/菜架/餐柜单价=====
var _yz = 275;//每张椅子单价=====
var _gz = 700;//锅/锅圈/电磁炉 每套单价=====
var _bh = 1500;//每桌调味品备货费(火锅油、火锅底料、香油、鸡精)=====
var _bc = 1000;//每桌菜品备货费=====
var _ss = 2500;//每套员工宿舍租金=====
//var _fw = 2500;//每月服务费
var _cj = 150;//厨具每平米费用=====
var _caj = 70;//餐具每平米费用=====
var _zaj = 40;//杂件每平米费用=====
//计算后的值
var ggVal = 30000;//广告费(前3个月全方位营销)=====
var bzVal = 50000;//保证金=====
var xtVal = 14000;//营销系统费(1.2系统费+2000服务费)=====
var pxVal = 50000;//前期人员招聘及培训=====
var fwVal = 2500;//月服务费=====
var area;//面积
var city;//面积
var rentVal;//租金
var zxVal;//装修费
var sDesign;//设计费
var czVal;//餐桌椅费
var gzVal;//锅、锅圈、电磁炉
var cjVal;//厨具费=面积*每平米费用
var cajVal;//餐具
var zjVal;//杂件
var bhVal;//调味品备货
var bcVal;//菜品备货
var ssVal;//员工宿舍
var totalVal;//总投资
var zsVal;//桌数
var cwVal;//餐位数

var jmf1=250000;//北京、上海、广州、深圳、天津=====
var jmf2=200000;//二三线城市=====
var jmf3=180000;//县级城市=====
var jmVal; //加盟费
//预算总投资
function total(){
	sDesign = 45000;//400平米以内设计费
	area = getCookie("Area");//面积
	city = getCookie("City");//成市
	//rentVal =area * _rent * _rentT;//租金++++++++++++++++++++++++++++++++++++++++++
    rentVal = Number($("#rent").val())*10000;	
	zxVal = area * _zx;//装修费
	cjVal = area*_cj;//厨具费=面积*每平米费用

	/*加盟费*/
	 $("#jmTxt").html(function () {
		if(city.indexOf("北京")>=0 || city.indexOf("上海")>=0 || city.indexOf("广州")>=0 || city.indexOf("深圳")>=0 || city.indexOf("天津")>=0){
			jmVal = jmf1;
			return unit(jmVal) + "万";
		}else if(city.indexOf("县")>=0){
			jmVal = jmf3;
			return unit(jmVal) + "万";
		}else{    
			jmVal = jmf2;
			return unit(jmVal) + "万";
		}
	});
	/*保证金*/
	$("#bzTxt").html(unit(bzVal) + "万");
	/*宣传费*/
	$("#ggTxt").html(unit(ggVal) + "万");
	/*营销系统、收银系统*/
	$("#xtTxt").html(unit(xtVal) + "万");
	/*面积*/
	$("#areaTxt").html(area + "m<sup>2</sup>");
	/*设置地区*/
	$("#cityTxt").html(city);
	/*前期人员招聘及培训*/
	$("#pxTxt").html(unit(pxVal) + "万");
	/*租金*/
	$("#rentTxt").html(unit(rentVal) + "万");

	/*装修费*/
	$("#zxTxt").html(unit(zxVal) + "万");
	/*设计费*/
	$("#designTxt").html(function () {
		if (area > 400) {
			sDesign += (area - 400) * _design;
		}
		return unit(sDesign) + "万";
	});
	/*桌数*/
	$("#zsTxt").html(function () {
		cwVal = parseInt(area * _rj);//餐位=面积*容积率
		zsVal = Math.ceil(cwVal / _ys);//桌数=餐位除以每桌椅数
		return zsVal + "桌" + "(" + cwVal + ")个餐位";
	});
	/*餐桌/菜架/餐柜/餐椅*/
	$("#czTxt").html(function () {
		//桌单价*桌数+椅单价*餐位数
		czVal = _zz * zsVal + _yz * cwVal;
		return unit(czVal) + "万";
	});
	/*锅、锅圈、电磁炉*/
	$("#gzTxt").html(function () {
		gzVal = zsVal * _gz;
		return unit(gzVal) + "万";
	});
	/*厨具*/
	$("#cjTxt").html(unit(cjVal) + "万");
	//餐具=面积*每平米费用
	cajVal = area*_caj;
	$("#cajTxt").html(unit(cajVal) + "万");
	//杂件=面积*每平米费用
	zjVal = area*_zaj;
	$("#zajTxt").html(unit(zjVal) + "万");
	/*调味品和菜品备货*/
	$("#bhTxt").html(function () {
		bhVal = _bh * zsVal;
		return unit(bhVal) + "万";
	});
	$("#bcTxt").html(function () {
		bcVal = _bc * zsVal;
		return unit(bcVal) + "万";
	});
	/*员工宿舍费用*/
	$(".ssTxt").html(function () {
		if (area < 800) {
			ssVal = _ss * 2;
		} else if (area < 1000) {
			ssVal = _ss * 3;
		} else {
			ssVal = _ss * 4;
		}
		return "<a>" + unit(ssVal) + "万/月</a>";
	});
	//总投资
	$("#totalTxt").html(function () {
		//alert(rentVal);
		totalVal = rentVal + zxVal + sDesign + czVal + gzVal + cjVal + cajVal + zjVal + bhVal + bcVal + ssVal + pxVal + ggVal + bzVal + xtVal + jmVal;
		if (isNaN(totalVal)) {
			return 0;
		} else {
			return "<b>" + unit(totalVal) + "万</b>";
		}
	});
	totalHB();//营业额，回报期
}//预算总投资

$("#sklTxt").change(function () {
		totalHB();//营业额，回报期
});

//回报分析*********************************************
//营业额，回报期
function totalHB() {
	//单价
	var _ml = 0.58;//毛利率=====
	var _xf = 80;//人均消费=====
	var _sj = 0.035;//营业税
	var _skl = $("#sklTxt").val();//上客率
	if(_skl == 2){
		var _sdq = 40;//每平米月水电费
		var _zf = 40;//每平米月杂费
		var _rg = 200;//每平米工资
	}else if(_skl == 1.5){
		var _sdq = 35;//每平米月水电费
		var _zf = 35;//每平米月杂费
		var _rg = 150;//每平米工资
	}
	//上客率与面积的关系
	if(area >= 800){
		_skl -= 0.35;
	}else if(area >= 700){
		_skl -= 0.25;
	}else if(area >= 600){
		_skl -= 0.15;
	}else if(area >= 500){
		_skl -= 0.1;
	}else if(area >= 400){
		_skl -= -0.03;
	}else if(area >= 300){
		_skl -= -0.06;
	}else{
		_skl -= -0.2;
	}
	//显示数据
	$("#popleTxt").html(_ys + "位/桌");//桌人数
	$("#mlTxt").html(Math.round(_ml * 100) + "%");//毛利
	$("#xfTxt").html(_xf + "元/人");//人均消费
	var rgVal;//员工工资
	$("#rgTxt").html(function () {
		rgVal = area * _rg;
		return "<a>" + unit(rgVal) + "万/月</a>";
	});
	var MoonYY = cwVal * _xf * _skl * 30;//月营业额=餐位数*平均消费*上客率*30天
	var MoonML = MoonYY * _ml; //月毛利=月营业额*毛利率
	//水电气费
	var sdqVal = area * _sdq;
	$("#sdqTxt").html("<a>" + unit(sdqVal) + "万/月</a>");
	//杂费
	var zfVal = area * _zf;
	$("#zfTxt").html("<a>" + unit(zfVal) + "万/月</a>");
	//服务费
    $("#fwTxt").html("<a>" + unit(fwVal) + "万/月</a>");
	//税金
	var sjVal = MoonYY * _sj;
	$("#sjTxt").html("<a>" + unit(sjVal) + "万/月</a>");
	//月开支=水电气+杂费+服务费+税金+工资+宿舍房租+//房租
	var MoonKZ = sdqVal + zfVal + fwVal + sjVal+ rgVal + ssVal;
	var MoonJL = MoonML - MoonKZ;
	var YearJL = MoonJL*12;
    $("#MoonYYTxt").html("<b>" + unit(MoonYY) + "万</b>");//月营业
	$("#MoonMLTxt").html("<b>" + unit(MoonML) + "万</b>");//月毛利
	$("#MoonJLTxt").html("<b>" + unit(MoonJL) + "万</b>");//月利润
    $("#YearJLTxt").html("<b>" + unit(YearJL) + "万</b>");//年利润
    $("#hbTxt").html("<b>" + Math.round(totalVal / (YearJL / 12)) + "个月</b>");
}
//转换为万
function unit(a) {
    return (a / 10000).toFixed(2);
}


/*内容数据*/
$(".bzj").html(unit(bzVal) + "万");
$(".jmf1").html(unit(jmf1) + "万");
$(".jmf2").html(unit(jmf2) + "万");
$(".jmf3").html(unit(jmf3) + "万");