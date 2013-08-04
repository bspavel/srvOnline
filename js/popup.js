function onLoad()
{
	var source = $.trim($("#entry-template").html());
	var html='';
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
			html+=replaceDt(
				source,
				srvArr.nm[i],
				srvArr.ip[i],
				srvCheckStatus(srvArr.ip[i])
			);
		}
	}	
	$('#showsrv').append($('<ul></ul>').append(html));
}
function replaceDt(str, SRVNAME, SRVIP, STATUS)
{
	if(STATUS==null){STATUS='Off';}
	str=str.replace(/{{SRVNAME}}/ig, SRVNAME)
	.replace(/{{SRVIP}}/ig, SRVIP)
	.replace(/{{STATUS}}/ig, STATUS);	
	return str;
}
function srvCheckStatus(ip)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", ip, false);
	xhr.onreadystatechange = function()
	{
		try
		{
			if(xhr.status == 200)
			{
				localStorage["tmp_srv_status"]="On";
			}else
				{localStorage["tmp_srv_status"]="Off";}
		}
		catch (ex){localStorage["tmp_srv_status"]="Off";}
	}
	try{xhr.send();}
	catch(ex){localStorage["tmp_srv_status"]="Off";}

	return localStorage["tmp_srv_status"];
}
document.addEventListener('DOMContentLoaded', onLoad);