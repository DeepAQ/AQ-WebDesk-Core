var remote_ip_info;
function windowCaption(str){
	//document.title=str;
	window.parent.$("#geci").html(str);
}
function windowResizeTo(width, height){
	window.resizeTo(width, height);
	window.resizeTo(width * 2 - ((typeof window.innerWidth == 'undefined') ? document.body.clientWidth : window.innerWidth),
    height * 2 - ((typeof window.innerHeight == 'undefined') ? document.body.clientHeight : window.innerHeight));
}
function saveUser(email, passwd) {
	//document.cookie = escape("ezsong_email") + "=" + escape(email);
	//document.cookie = escape("ezsong_password") + "=" + escape(passwd);
}
function trace(content) {
	var tf = parent.traceframe;
	if (tf != null) {
	tf.trace(content);
	}
}
function checkAnchor(str){
	return str == null ? null : str.replace(/\\/g, " ").replace(/\(/g, " ").replace(/\)/g, " ").replace(/=/g, " ").replace(/;/g, " ").substr(0,255);
}
function getQuery(str){
	var index;
	str = str.toLowerCase();	
	if(str.indexOf("#")>-1){
		index = str.indexOf("#");
		str = str.substr(index);
	}else if(str.indexOf(".com/")>-1){
		index = str.indexOf(".com/");
		str = str.substr(index+5);
	}else{
		str = "";
	}
	index = str.indexOf("?");
	if(index>-1){
		str = str.substr(0,index);
	}
	if(str.indexOf(".html")>-1 || str == "#"){
		str = "";
	}
	return str
}
function getSourceSite(str){

	queryArray = str.match(/1g1g\.com\/(.*)\/index\.html/i);
	if(queryArray){
		return queryArray[1];
	}else{
		return null
	}
}



function sendNotification(funcName,params){
	get1g1gPlayer().sendNotification(funcName,params);
}


function writeContent() {
	if(document.getElementById("p1")){
	document.getElementById("p1").innerHTML = "<a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg' alt='Get Adobe Flash player' /></a><h2>欢迎来到亦歌</h2><p>亦歌初始化失败，非常抱歉！</p><p>这可能是由于您的Flash版本过低，亦歌需要Flash版本为10.0或以上。系统检测到您当前的版本为<span class='hightlignt'>“"+getFlashplayerVersion()+"”</span>。</p>	<ul><li>如果您的版本低于10.0.0，您可以在<a href='http://www.adobe.com/go/getflashplayer' target='_blank'>http://www.adobe.com/go/getflashplayer</a>下载安装最新版本的Flash，欢迎您安装后再次光临<a href='http://www.1g1g.com' target='_self'>亦歌</a>。</li><li>如果您的版本高于10.0.0，但亦歌仍无法初始化，并且您的操作系统是ubuntu, 可能是默认flash播放器不正确的原因，解决方法请看<a href='http://blog.1g1g.com/2009/03/30/ubuntu-gnash-swf-player/' target='_blank'>这里</a>。</li><li>如果还是无法初始化，诚挚地邀请您到<a href='http://tieba.baidu.com/f?kw=%D2%E0%B8%E8' target='_blank'>亦歌吧</a>报告这一问题，或者写信到<a href='mailto:1g1g.service@gmail.com'>1g1g.service@gmail.com</a>，帮助我们解决这一问题。我们将第一时间联系您，感谢您对亦歌的支持！</li></ul>"
	}
}

function createPlayer(params) {
	var isChangeUrl = true; 
	var wmode = "";
	var wmodeStr = "";
	paramsStr ="";
	if(params && params.paramsStr){
		paramsStr = params.paramsStr
	}
	var swf = "/player/loader.swf"
	if(params && params.swf){
		swf = params.swf;
	}
	
	if(window.location.href.indexOf("?")>0){
		paramsStr = paramsStr + "&"+window.location.href.substring(window.location.href.indexOf("?")+1);
		isChangeUrl = false;		
		if(paramsStr.indexOf("ffsidebar")>-1 || paramsStr.indexOf("transparent"))
		{
			wmode = "wmode='transparent'";
			wmodeStr = "<param name='wmode' value='transparent'>";
		}
		if(paramsStr.indexOf("desktop.air/1.3")>-1 || paramsStr.indexOf("desktop.air/1.22")>-1)
		{
			notice = "<u><a href=\"http://www.ruochi.com/main/1g1g-air/\" target=\"_blank\">请更新亦歌AIR最新版本(1.4)</a></u>";
		}
	}
	if(typeof notice == "string" && notice.length > 0){
		paramsStr = paramsStr +"&notice="+notice;
	}
	
	if(remote_ip_info)
	{
		paramsStr = paramsStr + "&location=" + remote_ip_info.city;
	}
	var url=window.location.href;
	var query = getQuery(url);
	if(query){
		paramsStr = paramsStr + "&play="+query;
		if(query.indexOf("#")==-1)
		{
			isChangeUrl = false;
		}
	}
	if(getSourceSite(url)){
		paramsStr = paramsStr + "&sourcesite="+getSourceSite(url);
	}
	if(!isChangeUrl){
		paramsStr = paramsStr + "&isChangeUrl=false";
	}
	
	document.body.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='100%' height='100%' id='1g1gPlayer'>"
	+"<param name='bgcolor' value='#333333'>"
	+wmodeStr
	+"<param name='movie' value='"+swf+"?uid="+ Math.random() + paramsStr + "'/>"
	+"<param name='allowFullScreen' value='true' />"
	+"<param name='menu' value='false' />"
	+"<param name='allowScriptAccess' value ='always' />"
	+"<EMBED src='"+swf+"?uid="+ Math.random() + paramsStr +"' "+ wmode +" allowFullScreen='true' allowScriptAccess='always' menu='false' bgcolor='#FFFFFF' width='100%' height='100%' name='1g1gPlayer'  type='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/go/getflashplayer'></EMBED>"
	+"</object>"
			
}

function drawStartBtn()
{
	document.write("<table id='myContent' width='100%' height='100%' bgColor='#333' border='0'><tr><td valign='middle' align='center'><input type='button' value='开始亦歌' onclick='createPlayer()' /></td></tr></table>");

}


function onFlashInit(){
	contentNode = document.getElementById("myContent");
	if(contentNode){
		//document.getElementById("myContent").style.display="none";
		contentNode.parentNode.removeChild(contentNode)
		//document.getElementById("myContent").innerHTML = "";
	}
}

function setCookie(name,value)
{
  var Days = 99999; 
  var exp  = new Date();  
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
}
function getCookie(name)
{
  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  if(arr != null) return unescape(arr[2]); return null;
}


function isFrequent(){
	
	var visitTime = getCookie("visitTime");
	if(visitTime == null)
	{
		visitTime = new Date().getTime()+"";
	}
	else
	{
		visitTime = visitTime+";"+new Date().getTime();
	}
	var timeArray = visitTime.split(";");
	while(timeArray.length>3)
	{
		timeArray.shift()
	}
	setCookie("visitTime",timeArray.join(";"))
	if(timeArray.length<2)
	{
		return false;
	}
	else
	{
		for(var i=0; i<timeArray.length;i++)
		{
			if((timeArray[i+1] - timeArray[i])>10000)
			{
				return false
			}
		}
	}
	return true
}
	

function getFlashplayerVersion() {
	var f="",n=navigator; 
	if (n.plugins && n.plugins.length) {
		for (var ii=0;ii<n.plugins.length;ii++) {
			if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {
				f=n.plugins[ii].description.split('Shockwave Flash ')[1];
				break;
			}
		}
	} else if (window.ActiveXObject) {
		for (var ii=10;ii>=2;ii--) {
			try {   
			var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
			if (fl) {f=ii + '.0'; break; }
			}
			catch(e) {}
		}
	}
	return f;
}

function get1g1gPlayer(){
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window["1g1gPlayer"];
	} else {
		return document["1g1gPlayer"];
	}
}

if (window.parent.$("#geci").css("bottom")!="40px"){
window.parent.$("body").append('<div id="geci" style="width:100%; height:40px; font:bold 40px 微软雅黑,黑体,Tahoma; position:absolute; bottom:40px; text-align:center;"></div>');
}
window.onunload = function(){
	window.parent.$("#geci").html("");
}