if ($("[appid='system/console']").dialog('moveToTop').parent().show().length<=0){
	aqNewwin('system/console','app/system/console/index.html','app/system/console/icon.png','AQOS 命令提示符',550,350,1);
}