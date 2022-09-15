//# sorceURL=link.js
var link={}, $link=link;

/**
 * 获取链接的ip和端口
 */
link.getUrlIp = function() {
	var ip = window.location.origin;
	if(ip=="file://") {
		ip = 'file:///E:/lgwind/Myweb/Myweb';
	}
	return ip;
};

/**
 * 页面加载函数
 * @param {Object} event
 */
window.onload=function(event){
	for(var i=0; i<Link.length;i=i+2){
		$$('link'+i/2).innerHTML=Link[i];
		if(Link[i+1] == '{type}'){
			$$('link'+i/2).style.fontSize = '18px';
			$$('link'+i/2).style.color = '#9B30FF';
		}
		else{
			var href = Link[i+1];
			href = href.replace(/{ip}/ig, $link.getUrlIp());
			$$('link'+i/2).title = href;			
			$$('link'+i/2).href = href;
			$$('link'+i/2).target = "_blank";
			//重点链接加重点颜色
			if(Link[i].indexOf("#red#")!=-1) {
			    $$('link'+i/2).style.color = 'red';		
			    $$('link'+i/2).innerHTML=Link[i].replace(/#red#/ig,'');
			}
		}
	}
	//设置ip地址
//	getUserIP(function(ip) {
//		for(var i=0; i<Link.length;i=i+2){
//			if($$('link'+i/2).title.indexOf("localhost") !=-1){
//				$$('link'+i/2).title = $$('link'+i/2).title.replace(/localhost/ig,ip);
//			}
//		}
//	});
	//默认移动到顶部
    setTimeout(function(){
		goTop();
    },0);
}

/**
 * 根据id寻找元件函数
 * @param {Object} id
 */
function $$(id) {
	return document.getElementById(id);
}

/**
 * 移动到顶部
 */
function goTop() {
	scrollTo(0,0);
}
