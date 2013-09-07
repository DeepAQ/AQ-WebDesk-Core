var aqos_wn=0;
//打开窗口函数
function aqos_nw(u,i,w,h,t,r,f) {
	aqos_wn++;
	var idd = "#aqos_w"+aqos_wn;
	$("body").append('<div id="aqos_w'+aqos_wn+'" style="padding:0;"><iframe src="'+u+'" frameborder="0" scrolling="no"></iframe></div>');
	$(idd).dialog({ show:"blind",hide:"blind",resizable:r,title:t,width:w,height:h+30 }).attr("wn",aqos_wn)
	  .css("background","url(os/wait.jpg) top center no-repeat");
	$("iframe",idd).css({"width":w+"px","height":h+"px"});
	$("#tasks").append('<img src="app/icon/'+i+'" id="aqos_i'+aqos_wn+'" />');
	$("#aqos_i"+aqos_wn).attr("wn",aqos_wn);
	if (f==1){ $("iframe",idd).attr("class","fl"); }
	$(".ui-dialog-titlebar",document.getElementById("aqos_w"+aqos_wn).parentNode)
	  .append('<div class="wmenu"><img src="os/min.gif" wn="'+aqos_wn+'" class="min" /><img src="os/max.gif" wn="'+aqos_wn+'" class="max" /></div>');
}
//窗口、任务栏事件处理
function wResize(){
	if (self.innerHeight){
		x = self.innerWidth; y = self.innerHeight;
	} else if (document.documentElement && document.documentElement.cilentHeight){
		x = document.documentElement.cilentWidth;
		y = document.documentElement.cilentHeight;
	} else if (document.body){
		x = document.body.cilentWidth;
		y = document.body.cilentHeight;
	}
	$(".maxw").css({"height":y-33+"px","width":x-6+"px"});
	$(".ui-dialog-content",".maxw").css({"height":y-63+"px","width":x-6+"px"});
	$("iframe",".maxw").css({"width":x-6+"px","height":y-63+"px"});
	$("#body_bg").css({"width":x+"px","height":y+"px" });
}
function aqos_max(i){
	w = $("#aqos_w"+i).dialog("option","width");
	h = $("#aqos_w"+i).dialog("option","height");
	$("#aqos_w"+i).attr({"w":w,"h":h}).dialog("option","resizable",false)
	  .dialog("option","draggable",false).dialog("option","dialogClass","maxw");
	$(document.getElementById("aqos_w"+i).parentNode).css({"top":"0px","left":"0px"});
	wResize();
}
function aqos_min(i){
	var w = $("#aqos_w"+i).attr("w");
	var h = $("#aqos_w"+i).attr("h");
	$("#aqos_w"+i).dialog("option","width",w).dialog("option","height",h)
	  .dialog("option","dialogClass","").dialog("option","resizable",true)
	  .dialog("option","draggable",true).dialog("option","position","center");
	var dw = $("#aqos_w"+i).dialog("option","width");
	var dh = $("#aqos_w"+i).dialog("option","height");
	$("iframe","#aqos_w"+i).css({ "width":dw+"px","height":dh-30+"px" }).hide();
}
	var ifhide = function(e,ui){
		$("iframe",this).hide();$("#menu").hide();
	}
	var ifshow = function(e,ui){
		$("iframe",this).show();
	}
	var irs = function(e,ui){
		var dw = $(this).dialog("option","width");
		var dh = $(this).dialog("option","height");
		$("iframe",this).css({ "width":dw+"px","height":dh-30+"px" }).show();
	}
	var iclose = function(e,ui){
		$("#aqos_i"+$(this).attr("wn")).css({"width":"0","padding":"0"});
		$(this).dialog("destroy").html("");
	}
	var ifocus = function(e,ui){
		$(".fl").hide();$("#menu").hide();
		$("iframe",this).show();
	}
$(".ui-dialog-content")
	.live("dialogresizestop",irs)
	.live("dialogdragstart",ifhide)
	.live("dialogdragstop",ifshow)
	.live("dialogresizestart",ifhide)
	.live("dialogclose",iclose)
	.live("dialogfocus",ifocus);
$("#tasks img").live("click",function(){
		$(document.getElementById("aqos_w"+$(this).attr("wn")).parentNode).show();
		$("#aqos_w"+$(this).attr("wn")).dialog("moveToTop");
	});
$(".min").live("click",function(){
		$(document.getElementById("aqos_w"+$(this).attr("wn")).parentNode).hide();
	});
$(".max").live("click",function(){
		if ($("#aqos_w"+$(this).attr("wn")).dialog("option","dialogClass")=="maxw"){
			aqos_min($(this).attr("wn"));
		} else {
			aqos_max($(this).attr("wn"));
		}
	});
window.onresize = wResize;
//日期更新函数
function aqos_date() {
	var myDate = new Date();
	$("#time").html(myDate.toLocaleTimeString().substr(0,5));
}
//提示窗弹出
function p_show(a) {
	if ($(a).css("display")=="block") {
		$(a).hide("blind");
	} else {
		$(a).show("blind");
	}
}
aqos_date();
setInterval("aqos_date();",30000);
wResize();
/*//网络状态
function aqos_net() {
	$.ajax({
		url:"os/proxy.php?u=http://api.liqwei.com/security/?base64decode=YXFvcw==",
		type:"get",
		success:function(d,t){
			if (d=="aqos") {
				$("#net img").attr("src","os/network.gif");
				$("#ns").css("color","#090").html("已连通");
			} else {
				$("#net img").attr("src","os/network_h.gif");
				$("#ns").css("color","#999").html("断开");
	}}});
}
aqos_net();
setInterval("aqos_net();",60000);
//初始化网络弹窗
$("#net img").click(function(){ p_show('#pnet'); });
$("#pn_c").click(function() { $("#pnet").hide("blind"); });
$("#pn_btn").button().click(function(){ aqos_nw("app/netspeed/i.html","app/netspeed/i.gif",540,500,"网速测试",false,1); });  */
$("#body_bg").click(function(){ $("#menu").hide(); });
$("#start").click(function(){ $("#menu").show(); });
//$("#menu").blur(function(){ $(this).hide(); })
$("#desk").click(function(){ $(".ui-dialog").hide(); });
$("#time").click(function(){ aqos_nw("app/calendar/i.html","calendar.png",522,387,"时间与日期",false,1); });
$("#ime").click(function(){ (function(q){!!q?q.toggle():(function(d,j){j=d.createElement('script');j.src='//ime.qq.com/fcgi-bin/getjs';d.getElementsByTagName('head')[0].appendChild(j)})(document)})(window.QQWebIME) });
if (window.location.host=="127.0.0.1:741"){
	$("#ver").append("虚拟环境(正常)");
} else {
	$("#ver").append("未知环境(异常)");
}
window.onload = function(){ setTimeout('$("#starting").hide("explode");$("body").css("background","url(os/wall.jpg)");',1000); }

$("#accordion").accordion({ autoHeight:false }).css("height","400px");
$("#accordion div div").live("click",function(){ eval("aqos_nw("+$(this).attr("at")+")"); });