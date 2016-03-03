
function deleteAstroCookie(){
	var astroDomain = "log.planesense.com";
	
	chrome.cookies.getAll({domain: astroDomain}, function(cookies){
		for(var i = 0; i < cookies.length; i++ ){
			chrome.cookies.remove({url: "https://" + astroDomain + cookies[i].path, name: cookies[i].name});
		}
		
	});
}

chrome.pageAction.onClicked.addListener(function(tab) {
	deleteAstroCookie();
	var code = "window.location.assign('https://log.planesense.com');";
  	chrome.tabs.executeScript(tab.id, {code: code});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(tab.url.indexOf("log.planesense.com") > 0){
		chrome.pageAction.show(tabId);
	}
});
