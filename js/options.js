function onLoad()
{
	document.title=chrome.i18n.getMessage("OPTIONWINDOW");

	$("#save").text(chrome.i18n.getMessage("SAVEBUTTON"));
	$("#cancel").text(chrome.i18n.getMessage("CANCELBUTTON"));

	var source = $.trim($("#entry-template").html());
	if (localStorage["srvStrIp"] != null)
	{		
		var srvStrIp = localStorage["srvStrIp"];
		var srvStrNm = localStorage["srvStrNm"];
		var srvArr =
		{
			ip: JSON.parse(srvStrIp),
			nm: JSON.parse(srvStrNm)
		};

		for(i=0;i<srvArr.ip.length;i++)
		{
			var html=replaceDt(source,"SRV"+i,"SRVNM"+i,srvArr.nm[i],srvArr.ip[i]);
			$("#srvList").append($('<li></li>').append(html));
		}
	}else
	{
		var html=replaceDt(source);
		$("#srvList").append($('<li></li>').append(html));
		$("#minus").css('display','none');
	}
}

function saveOptions()
{
	var arrIp = [];
	var arrNm = [];
	for(i=0;i<$('.srvip').length;i++)
		{arrIp[i]=$('.srvip')[i].value;}

	for(i=0;i<$('.srvnm').length;i++)
		{arrNm[i]=$('.srvnm')[i].value;}
		
	localStorage["srvStrNm"] = JSON.stringify(arrNm);
	localStorage["srvStrIp"] = JSON.stringify(arrIp);
}

function add_input()
{	
	var source = $.trim($("#entry-template").html());
	v_Len = $("li").length+1;
	$("#minus").css('display','');
	
	var context =
	{
		SRVID: "SRV"+v_Len,
		SRVNMID: "SRVNM"+v_Len
	};
	var html=replaceDt(source, context.SRVNMID, context.SRVNMID);
	$("#srvList").append($('<li></li>').append(html));
}
//-------------------------------------------------------------

function replaceDt(str, SRVID, SRVNMID, SRVNAME, SRVIP)
{
	if(SRVID==null){SRVID='srv0';}
	if(SRVNMID==null){SRVNMID='srvnm0';}
	if(SRVNAME==null){SRVNAME='';}
	if(SRVIP==null){SRVIP='';}
	var lang =
	{
		LANGSRVNAME: chrome.i18n.getMessage("SRVNM"),
		LANGIPADDR: chrome.i18n.getMessage("IP")	
	};
	str=str.replace(/{{SRVID}}/ig, SRVID)
	.replace(/{{SRVNMID}}/ig, SRVNMID)
	.replace(/{{SRVNAME}}/ig, SRVNAME)
	.replace(/{{SRVIP}}/ig, SRVIP)
	.replace(/{{LANGIPADDR}}/ig, lang.LANGIPADDR)
	.replace(/{{LANGSRVNAME}}/ig, lang.LANGSRVNAME);
	
	return str;
}


function del_input()
{
	var v_El="li";
	var v_Div="srvList";
	v_Len = $("li").length;
	
	if((v_Len<2)||(v_Len==2))
		{$("#minus").css('display','none');}

	if(v_Len>1)
	{
		$("#srvList li:last").remove();
	}
}

document.querySelector('#minus').addEventListener('click', del_input);
document.querySelector('#plus').addEventListener('click', add_input);
document.querySelector('#save').addEventListener('click', saveOptions);
document.querySelector('#cancel').addEventListener('click', function(){window.close();});
document.addEventListener('DOMContentLoaded', onLoad);