window.top.$aqos = 'AQOS 2.5(Swift Hare)<br />内部版本 0927 - Preview1<br />';
// JavaScript Document
$tid = 0; $nid = 0;
function getWidth(){
	if (self.innerWidth){
		return self.innerWidth;
	} else if (document.documentElement && document.documentElement.cilentWidth){
		return document.documentElement.cilentWidth;
	} else if (document.body){
		return document.body.cilentWidth;
	} else { return false; }
}
function getHeight(){
	if (self.innerHeight){
		return self.innerHeight;
	} else if (document.documentElement && document.documentElement.cilentHeight){
		return document.documentElement.cilentHeight;
	} else if (document.body){
		return document.body.cilentHeight;
	} else { return false; }
}
function aqNewwin(a,u,i,t,w,h,r){
	$tid++;
	$('body').append('<div aqwin wid="'+$tid+'" appid="'+a+'"><iframe src="'+u+'" frameborder="0"></iframe></div>');
	$("[wid='"+$tid+"']").dialog({resizable:r,title:t,width:w,height:h}).parent().css({top:Math.random()*(getHeight()-h),left:Math.random()*(getWidth()-w)});
	$('.ui-dialog-titlebar',$("[wid='"+$tid+"']").parent()).append('<img src="'+i+'" /><div btnmin></div>');
	if(r){$('.ui-dialog-titlebar',$("[wid='"+$tid+"']").parent()).append('<div btnmax></div>');}
	else {
		$("[wid='"+$tid+"']").parent().append('<div class="ui-resizable-handle ui-resizable-n" style="z-index: 1000; "></div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 1000; "></div><div class="ui-resizable-handle ui-resizable-s" style="z-index: 1000; "></div><div class="ui-resizable-handle ui-resizable-w" style="z-index: 1000; "></div>');
	};
	$("[active]").removeAttr('active');
	$('[taskbar]').append('<div task tid="'+$tid+'" active><img src="'+i+'" /></div>');
};
function aqMinw(w){
	if ($("[wid='"+w+"']").parent().css('display')=='block'){
		$("[wid='"+w+"']").parent().hide();
		$("[tid='"+w+"']").removeAttr('active');
	} else {
		$("[wid='"+w+"']").dialog('moveToTop').parent().show();
		$("[active]").removeAttr('active');
		$("[tid='"+w+"']").attr('active','');
	}
}
function aqMaxw(w){
	if ($("[wid='"+w+"']").attr('maxw')==null){
		$w = $("[wid='"+w+"']").dialog("option","width");
		$h = $("[wid='"+w+"']").dialog("option","height");
		$("[wid='"+w+"']").dialog("option","resizable",false).dialog("option","draggable",false)
		  .dialog('moveToTop').attr({aq_w:$w,aq_h:$h,maxw:''}).dialog("option","width",'100%').css('padding','0');
		$("[wid='"+w+"']").parent().css({top:'0',left:'0'});
		aqResize();
	} else {
		$("[wid='"+w+"']").dialog("option","resizable",true).dialog("option","draggable",true).removeAttr('maxw')
		  .dialog("option","width",$("[wid='"+w+"']").attr('aq_w')).css({'padding':'7px','padding-top':'0'})
		  .dialog("option","height",$("[wid='"+w+"']").attr('aq_h')).parent().css({top:Math.random()*(getHeight()-h),left:Math.random()*(getWidth()-w)});
	}
};
function aqOpenapp(n){
	$.getScript('app/'+n+'/init.js');
}
function aqNoticeHide(n){
	$("[nid='"+n+"']").animate({'margin-left':'380px'},'fast').animate({'height':'0','margin-bottom':'0'},'fast').html('');
}
function aqNotice(a,i,m,b){
	$nid++;
	$('[notifications]').append('<div notice appn="'+a+'" nid="'+$nid+'"><img src="'+i+'" /><div>'+m+'</div></div>');
	$("[nid='"+$nid+"']").css({background:b}).animate({'margin-left':'0'},'fast');
	setTimeout('aqNoticeHide('+$nid+')',10000);
};
function aqResize(){
	$('[maxw]').dialog('option','height',getHeight()-40);
};
function aqTime(){
	var cDate = new Date();
	if (cDate.getMinutes()<10){
		mm = '0' + cDate.getMinutes();
	} else { mm = cDate.getMinutes(); };
	$('[datetime]').html(cDate.getHours()+":"+mm+'<br />'+cDate.getFullYear()+'/'+(cDate.getMonth()+1)+'/'+cDate.getDate());
	setTimeout(aqTime,30000);
};
function aqInit(){
	$('[about]').html($aqos);
	function btnchange(){
		$(this).css('background-image','url(os/images/ui-icons_217bc0_256x240.png)');
	};
	function btnchange2(){
		$(this).css('background-image','url(os/images/ui-icons_d8e7f3_256x240.png)');
	};
	$('[btnmin],[btnmax]').live('mouseenter',btnchange);
	$('[btnmin],[btnmax]').live('mouseleave',btnchange2);
	$('[btnmax]').live('click',function(){
		aqMaxw($('[aqwin]',$(this).parent().parent()).attr('wid'));
	});
	$('.ui-dialog-titlebar').live('dblclick',function(){
		aqMaxw($('[aqwin]',$(this).parent().parent()).attr('wid'));
	});
	$('[btnmin]').live('click',function(){
		aqMinw($('[aqwin]',$(this).parent().parent()).attr('wid'));
	});
	$('[task]').live('click',function(){
		if ($("[wid='"+$(this).attr('tid')+"']").parent().css('display')=='block' && $(this).attr('active')==null){
			$("[wid='"+$(this).attr('tid')+"']").dialog('moveToTop');
		} else {
			aqMinw($(this).attr('tid'));
		}
	});
	$('[aqwin]').live('dialogfocus',function(){
		$("[active]").removeAttr('active');
		$("[tid='"+$(this).attr('wid')+"']").attr('active','');
	}).live("dialogclose",function(){
		$("[tid='"+$(this).attr('wid')+"']").hide();
		$(this).dialog("destroy").html("");
	});
	$('[notice]').click(function(){ aqOpenapp($(this).attr('appn')); });
	aqTime();
	$(window).resize(aqResize);
}
$(function(){
	aqInit();
	aqNewwin('baidu','http://www.baidu.com','http://www.baidu.com/favicon.ico','baidu_test 测试',400,300,1);
	aqOpenapp('system/console');
});