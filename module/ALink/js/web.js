//# sourceURL=web.js
var web={
	//数据结构
	data : {},
	//选择菜单
	menuKey : null,
}, $web=web;

$(function(){
	//数据处理
	$web.dealData(Link);
	//读取数据
	$web.menuKey=localStorage.getItem("menuKey");
	//根据数据生成页面
	$web.createHtml();
});

/**
 * 数据处理
 * @param {Object} Link
 */
web.dealData = function(Link) {
	var tempData={};
	var menuNum=0;
	var cNum=100;
	for(var i=0; i<Link.length; i+=2) {
		var name = Link[i];
		var value = Link[i+1];
		if(value=="{type}") {
			name = menuNum+"_"+name;
			menuNum++;
			$web.data[name] = {};
			tempData = $web.data[name];
		}else{
			name = cNum+"_"+name;
			cNum++;
			tempData[name] = value;
		}
	}
};

/**
 * 获取菜单名称
 * @param {Object} name
 */
web.getMenuName = function(name) {
	return name.substring(2);
};

/**
 * 获取内容名称
 * @param {Object} name
 */
web.getCName = function(name) {
	return name.substring(4);
}

/**
 * 根据数据生成页面
 */
web.createHtml = function() {
	//获取页面数据
	var data = $web.data;
	//添加人物头像
	$("#menu").append("<div class='menu menu0'></span>LgwindLink</div>");
	//生成菜单数据
	var dataNum=1;
	for(var key in data) {
		var name = $web.getMenuName(key);
		$("#menu").append("<div class='menu menu"+dataNum+"' name='"+key+"'>"+name+"</div>")
		dataNum++;
		if(!$web.menuKey) {
			$web.menuKey=key;
		}
	}
	//选择菜单
	$(".menu").on("click", function(){	
		if(!$(this).hasClass("menu0")) {
			$web.menuKey = $(this).attr("name");
			//保存搜索框的内容
			localStorage.setItem("menuKey",$web.menuKey);
			//生成菜单数据
			$web.createMainHtml();
			//搜索内容
			$(".search-btn").click();
		}
	});
	//移入菜单时样式
	$(".menu").on("mouseover", function(){
		$(".menu").removeClass("menu-hover");
		$(this).addClass("menu-hover");
	});
	//移出菜单时样式
	$(".menu").on("mouseout", function(){
		$(".menu").removeClass("menu-hover");
		$(".menu[name='"+$web.menuKey+"'").addClass("menu-hover");
	});
	$(".menu[name='"+$web.menuKey+"'").addClass("menu-hover");
	//生成搜索框
	$("#menu").append("<input class='sou' type='text' placeholder='搜索内容' /><span class='search-btn'></span>");
	$(".search-btn").on("click", function() {
		var word = $(".sou").val();
		$web.search(word);
	});
	//键盘事件
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){ // press Enter
			$(".sou").focus();
			$(".search-btn").click();
		}
	};
	//生成菜单数据
	$web.createMainHtml();
	/**
	 * 移动到顶部
	 */
	$(".func").on("click", function(){
		scrollTo(0,0);
	});
};

/**
 * 生成主页面内容
 */
web.createMainHtml = function() {
	$("#main").html("");
	var data = $web.data[$web.menuKey];
	for(var key in data) {
		var name = $web.getCName(key);
		var value = data[key];
		$("#main").append("<div class='link' name='"+key+"' value='"+value+"'><span>"+name+"</span></div>");
	}
	$(".link").on("click", function(){
		var url_is = $(this).attr("value");
		url_is = url_is.replace(/{ip}/ig, $web.getUrlIp());
		url_is = url_is.replace(/{ip_}/ig, $web.getUrlIp(true));
		window.open(url_is, '_blank');
	});
};

/**
 * 搜索内容
 */
web.search = function(word) {
	var links = $(".link");
	for(var i=0; i<links.length; i++) {
		var obj = $(links[i]);
		var name = $web.getCName(obj.attr("name"));
		var result = $web.find(name, word);
		//是否包含搜索内容
		if(result!=-1) {
			obj.show();
			if(word) {
				var name1 = name.substring(0, result);
				var name2 = name.substring(result, result+word.length);
				var name3 = name.substring(result+word.length);
				name = name1+"<span style='color:red'>"+name2+"</span>"+name3;
			}
			obj.find("span").html(name);
		}else{
			obj.hide();
		}
	}
};

/**
 * 查询字符串
 * @param {Object} word
 * @param {Object} find
 */
web.find = function(word, find) {
	var find = find.toLowerCase();
	var word = word.toLowerCase();
	return word.indexOf(find);
};

/**
 * 获取链接的ip和端口
 */
web.getUrlIp = function(isAdd) {
	var ip = window.location.origin;
	if(ip=="file://") {
		ip = 'file:///E:/lgwind/Myweb/Myweb';
		if(isAdd) {
			ip = 'http://127.0.0.1:8081'
		}
	}
	return ip;
};
