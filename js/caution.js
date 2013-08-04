	setTimeout
	(
		function()
		{		
			if(localStorage["srvStrIp"] != null)
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
					if(srvCheckStatus(srvArr.ip[i])=='Off')
					{
						var not = webkitNotifications.createNotification
						(
							'imgs/caution.png',// icon url - can be relative
							srvArr.nm[i]+' '+chrome.i18n.getMessage("DOWN"),// notification title
							srvArr.ip[i]//+varsent_msg  // notification body text
						);
						not.show();
					}
				}
			}
		}
		, 2000
	);

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