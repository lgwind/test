//# sorceURL=web.js
var $$, web={}, $web=web;

/**
 * 快速获取id函数
 */
$$ = function(id) {
	return document.getElementById(id);
}

/**
 * 判断手机端和电脑端
 */
web.isPC = function() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

/**
 * 根据整形数据返回对应字符串 如 1->01 12->12
 */
web.getNumStr = function(num){
	if(num<10){
		return "0" + num;
	}else{
		return "" + num;
	}
};

/**
 * 获取按钮id数字
 * search00 转 0
 */
web.getBtnNum = function(id) {
//	console.log("点击id="+id+"的按钮");
	id=id.replace(/[^0-9]/ig,"");
	return parseInt(id, 10);
};

/**
 * 获取链接的ip和端口
 */
web.getUrlIp = function(isAdd) {
	var ip = window.location.origin+'/test';
	if(ip=="file://") {
		ip = 'file:///E:/lgwind/Myweb/Myweb';
		if(isAdd) {
			ip = 'http://127.0.0.1:8081'
		}
	}
	return ip;
};

/**
 * 生成页面内容
 */
web.createHtml = function() {
	//复制菜单
	{
		var copy_ui_li_HTML = "";
		for(var i=0; i<Copy.length; i+=2){
			copy_ui_li_HTML += "<li id='copy"+$web.getNumStr(i/2)+"'>" 
							+Copy[i]+"</li>";
		}
		if($web.isPC()) {	
			$("#copy ul").html(copy_ui_li_HTML);
		}else{
			Copy=[];
		}
	}
	//搜索框及其按钮
	{
		//内容输入框
		var line1Html = "<input id='search_input' class='search-input'  type='text' placeholder='这里输入内容哦~'/>";
		for(var i=0; i<2; i++){
			line1Html += "<input id='search"+ $web.getNumStr(i) +"' " +
			                   "class='search-button-big' type='button'/>"
		}
		$("#line1").html(line1Html);
		var line2Html = "";
		for(var i=4; i<Button.length; i+=2){
			line2Html += "<input id='search"+ $web.getNumStr(i/2) +"' " +
			                   "class='search-button-little' type='button'/>"
		}
		$("#line2").html(line2Html);
	}	
	
	//设置 标题提示文字
	$("h1").attr("title", titleHint);
	
	//设置 右上角copy按钮功能
	for(var i=0; i<Copy.length; i+=2){
		$$("copy"+$web.getNumStr(i/2)).onclick = function(){
			$web.copy(Copy[$web.getBtnNum(this.id)*2+1]);
		};
	}
	
	//设置 标题按钮
	$("h1").on("dblclick", function() {
		$web.copy(title_copy_text);		
		var url_is = title_copy_text;		
		$("#son").attr('src', url_is);
		$(".son").show();
		return false;
	});

	//搜索框获取焦点
	$$('search_input').focus();
	$("html").on("click", function(){
		$$('search_input').focus();
		$web.ALLOW_KEY = true;
	});
	
	//给所有搜索按钮添加名称
	for(var i = 0; i < Button.length; i+=2) {
		var names = Button[i].split("#");
		$$('search' + $web.getNumStr(i/2)).value = names[0];
		if(names.length>1) {
			//给按钮添加提示搜索字符
			$($$("search"+$web.getNumStr(i/2))).attr("title", names[1].replace(/\$/ig,''));			
		}
	}
	
	//给所有搜索按钮添加function
	for(var i=0; i<Button.length; i+=2){
		$("#search"+$web.getNumStr(i/2)).on('click', function(){
			//获取搜索框中的内容
			var str = $web.getSearchStr();
			//保存搜索框的内容
			localStorage.setItem("mywebData",str);
			//获取链接字符串
			var btnName = Button[$web.getBtnNum(this.id)*2];
			var linkStr = Button[$web.getBtnNum(this.id)*2+1];
			//生成链接
			str = $web.getUrl(str,linkStr);
			//判断是否打开子窗口
			if(btnName.indexOf("$")!=-1) {
				window.open(str, '_blank');
			}else{
				//若打开的链接不同，则更新链接
				if($("#son").attr('src') != str) {
					$("#son").attr('src', str);					
				}
				//显示子窗口
				$(".son").show();
			}
			return false;
		});
	}
	//背景图片轮换程序
	$web.bgImg();
	//按钮宽度样式调整
	$web.btnCssCovered();
	//隐藏子窗口
	$("html").on("click", function() {
		if(!$(".son").is(":hidden")) {
			$(".son").hide();
		}
		return false;
	});
	//显示子窗口
	$("html").bind("contextmenu", function () {
		if($(".son").is(":hidden")) {
			$(".son").show();
		}
		return false;
	});

	
	//记事本初始化
	$web.note();
	
	//按钮初始化
	$web.buttonImg();
	//页面双击事件
	$("#note").on("dblclick", function(){
		//$web.changeBodyImg();
		if($("html").attr("isShow")=="true") {
			$("#copy").show();
			$("#search").show();
			$("#noteMain").show();
			$("#btnMain").show();
			$(".friendLink").show();
			$("html").attr("isShow","false");
		}else{
			//$("#copy").hide();
			//$("#search").hide();
			//$("#noteMain").hide();
			//$("#btnMain").hide();	
			$(".friendLink").hide();
			$("html").attr("isShow","true");	
		}
	});
	$("#note").trigger("dblclick");
};

/**
 * 根据搜索框的内容和定义的链接字符串生成链接
 * @param {Object} search 搜索词
 * @param {Object} link 链接字符串
 */
web.getUrl = function(search, link){
	/**
	 * {replace_oldstr_newstr}表示将search中的str字符串替换newstr字符串
	 */
	//search中将oldstr字符串替换为newstr
	var oldstr_newstr = $web.getUrlBrace(link,"replace");
	for(var i=0; i<oldstr_newstr.length; i++){
		var oldstr = oldstr_newstr[i].split("_")[1];
		var newstr = oldstr_newstr[i].split("_")[2];
		//将/转为\，\实在用不了
		oldstr = oldstr.replace(/\//ig, "\\");
		search = search.replace(new RegExp(oldstr, "ig"),newstr);
	}
	//link中去除中括号及中括号中的内容
	link = link.replace(/\[.*?\]/g,'');
	//link中去除{replace_oldstr_newstr}本身
	for(var i=0; i<oldstr_newstr.length; i++){
		oldstr_newstr[i] = oldstr_newstr[i].replace(/\[.*?\]/g,'');
		link = link.replace(new RegExp("{"+oldstr_newstr[i]+"}",'ig'),"");
	}
	/**
	 * link中将{search}替换为搜索框中的内容
	 */
	link = link.replace(/{search}/ig,search);
	/**
	 * link中将{ip}替换为搜索框中的内容
	 */
	link = link.replace(/{ip}/ig, $web.getUrlIp());
	link = link.replace(/{ip_}/ig, $web.getUrlIp(true));
	/**
	 * link中将{search.first}替换为搜索框中的内容的第一个字符
	 */
	link = link.replace(/{search.first}/ig,search.charAt(0));
	return link;
};

/**
 * 获取{}直接的字符串(在字符串str中),且中括号中的值包含关键词key_
 * @param {Object} str
 */
web.getUrlBrace = function(str, key){
	if(str==null){
		alert("参数str不能为空！");
		return null;
	}
	var index = 0;
	var strs = [];
	//left不要第0个
	var left = str.split("{");
	for(var i=1; i<left.length; i++){
		//right只要第0个
		var right = left[i].split("}");
		if(right.length>1){
			if(key == null || right[0].indexOf(key+"_")==0){
				strs[index] = right[0];
				index++;
			}
		}
	}
	return strs;
};

/**
 * 获取搜索框中的内容
 */
web.getSearchStr = function() {
	var str = $$("search_input").value;
	$$("search_input").select();
	return str;
};

/**
 * 搜索 键盘确定键
 */
web.searchEnter = function() {
	//是否是子窗口，默认打开
	var isSon = true;
	//获得搜索框中的内容
	var str = $web.getSearchStr();
	//根据末尾判断词为 ' ' 进行有道搜索
	var url_is = $web.getUrl(str, Button[3]);
	if(str.charAt(str.length - 1) == ' ') {
		str = str.substring(0,str.length - 1);
		//获取第2个链接字符串
		//将{search}替换为搜索框中的内容
		url_is = $web.getUrl(str, Button[1]);
	}
	//根据末尾判断词为 ' '+字母 进行搜索
	else if(str.indexOf(" ")>=0) {
		var sIndex = str.lastIndexOf(" ");
		//字符串搜索后缀-字母转成编码
		var btnCode = str.substring(sIndex).trim().toLowerCase();
		//剔除字符后的搜索词
		var newStr = str.substring(0,sIndex);
		//根据关键词获取链接
		var keyName = $("input[title='"+btnCode+"']").attr("value");
		var buttonName = null;
		var buttonLink = null;
		for(var codeNum=0; codeNum<Button.length; codeNum++) {
			if(Button[codeNum].indexOf(keyName)==0) {
				buttonName = Button[codeNum];
				buttonLink = Button[codeNum+1];
				break;
			}
		}
		//没有匹配链接
		if(buttonName==null) {			
			buttonName = Button[2];
			buttonLink = Button[3];
			newStr = str;
		}
		//是否打开子窗口
		if(buttonName.indexOf("$")!=-1){
			//不打开子窗口
			isSon = false;			
		}
		//将{search}替换为搜索框中的内容
		url_is = $web.getUrl(newStr, buttonLink);
	}
	//根据开头判断词为 'http:'或者为 'https:' 则直接打开链接
	else if(str.charAt(0) == 'h' && str.charAt(1) == 't' && str.charAt(2) == 't' && str.charAt(3) == 'p' &&
		(str.charAt(4) == ':' || (str.charAt(4) == 's' && str.charAt(5) == ':'))) {
		url_is = str;
		isSon = false;
	}	
	//为百度搜索
	else{
		//默认不打开子窗口
		isSon = false;
	}	
	if(isSon) {
		$("#son").attr('src', url_is);
		$(".son").show();	
	}else{
		window.open(url_is, '_blank');
	}
};

/** 是否允许键盘事件,用于区分笔记本 */
web.ALLOW_KEY = true;
/*
 * 键盘事件
 */
document.onkeydown=function(event){
	if(!$web.ALLOW_KEY) {
		return;
	}
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==13){ // press Enter
		$web.searchEnter();
	}else if(e && e.ctrlKey && e.shiftKey && false) {
		var url_is = $("#son").attr("src");
		$("#son").attr("src", "");
		$(".son").hide();
		window.open(url_is, '_blank');
	}else if(e && e.ctrlKey && e.altKey && false) {
		$(".son").show();
	}else if(e && e.ctrlKey && e.keyCode==39) {
		web.changeBodyImg();
	}else if(e && e.ctrlKey && e.keyCode==37) {
		web.changeBodyImg(true);
	}
};

/**
 * 复制文字
 * @param {Object} copyContent
 */
web.copy = function(copyContent) {
	//console.log("复制内容："+copyContent);
	var str_nos = $$("search_input").value;
	$$("search_input").value = copyContent;
	$$("search_input").select();
	document.execCommand("copy", false, null);
	$$("search_input").value = str_nos;
};

/**
 * 背景图片
 */
web.bgImg = function() {
	web.img = ['img-myweb','img-myweb13','img-myweb3','img-myweb4','img-myweb5',
				'img-myweb6','img-myweb7','img-myweb8','img-myweb9','img-myweb10',
				'img-myweb11','img-myweb12','img-myweb13'];
	web.imgNum = 0;
	setInterval(function(){
		$web.changeBodyImg();
	},'30000')//每隔30秒轮换一次
	
	//var video = '<video id="video" width="1600" height="900" autoplay="" loop="" muted="true"><source src="https://web.sanguosha.com/login/img/bg20210918.mp4?v=20210918" type="video/mp4"><div class="no_video"></div></video>';
	//$('body').prepend(video)
};

/**
 * 更改背景图片
 */
web.changeBodyImg = function(isSub) {
	if(!web.imgNum) {
		web.imgNum=0;
	}
	if(isSub) {
		web.imgNum--;			
	}else{
		web.imgNum++;
	}
	if(web.imgNum<0) {
		web.imgNum = web.img.length-1;
	}else if(web.imgNum>web.img.length-1) {
		web.imgNum = 0;
	}
	var imgName = web.img[web.imgNum];
	$('body').css('background-image', 'url(./img/'+imgName+'.jpg)');
};

/**
 * 按钮宽度样式调整
 */
web.btnCssCovered = function() {
	//首行拉伸
	if($web.isPC()) {
		equal('line1',['search_input', 'search00', 'search01']);
	}else {		
		equal('line1',['search_input']);
		equal('line1',['search00', 'search01']);
	}
	//其余行拉伸
	var others = [];
	var left = $('.search-button-little')[0].offsetLeft;
	for(var i=0; i<$('.search-button-little').length; i++) {
		//换行则拉伸
		if(i!=0 && left ==  $('.search-button-little')[i].offsetLeft) {
			equal('line2',others);
			others = [];
		}
		others[others.length] = $('.search-button-little')[i].id;
	}
	/**
	 * 平衡拉伸
	 * @param {Object} id1
	 * @param {Object} id2
	 */
	function equal(id1, id2) {
		if(!id1 || !id2) return;
		var width1 = $('#'+id1).outerWidth();
		var width2 = 0;
		for(var i=0; i<id2.length; i++) {
			width2 += $('#'+id2[i]).outerWidth();
		}
		var d_value = (width1-width2)/id2.length;
		for(var i=0; i<id2.length; i++) {
			var before = $('#'+id2[i]).width();
			$('#'+id2[i]).width(before+d_value);
		}
	}
};

/**
 * 记事本
 */
web.note = function() {
	//记事本主标签
	var noteMainHtml = "<div id='noteMain'></div>";
	$("body").append(noteMainHtml);	
	//创建记事本图标，用于打开和关闭记事本
	var noteHtml = "<div id='note'></div>";
	$("#noteMain").append(noteHtml);
	//记事本获得光标
	$("#note").on("click", function(){
		if($("#noteText").is(":hidden")) {
			var noteObj = $("#noteText");
			noteObj.show();
			noteObj.focus();
			$web.ALLOW_KEY = false;
			return false;
		}else{
			$("#noteText").hide();
		}
	});
	//创建文本框
	var textHtml = "<div id='noteText' contenteditable='true'></div>";
	$("#noteMain").append(textHtml);
	$("#noteText").hide();
	$("#noteText").on("click", function(){
		$web.ALLOW_KEY = false;
		return false;
	});
	//文本框获得光标
	$("#noteText").on("click", function(){
		return false;
	});
	//保存文本 
	$("html").on("click", function(){
		var noteData = $("#noteText").html();
		localStorage.setItem("noteData",noteData);		
	});
	//读取历史数据
	var hData = localStorage.getItem("noteData");
	if(hData) {
		$("#noteText").html(hData);
	}
	
};

/**
 * 图片按钮功能
 */
web.buttonImg = function() {
	//按钮主对象
	var btnHtml = "<div id='btnMain'></div>";
	$("body").append(btnHtml);	
	//创建子窗口显示图标，用于打开子窗口
//	var sonShowHtml = "<div id='sonShow' class='btnImg' title='显示子窗口(ctrl+alt)'></div>";
//	$("#btnMain").append(sonShowHtml);
//	$("#sonShow").on("click", function(){	
//		if(!$(".son").is(":hidden")) {
//			$(".son").hide();
//		}else{
//			$(".son").show();
//		}
//		return false;
//	});
	//创建子窗口标签打开网页图标，用于打开子窗口
	var sonWebHtml = "<div id='sonWeb' class='btnImg' title='标签打开子窗口(ctrl+shift)'></div>";
	$("#btnMain").append(sonWebHtml);
	$("#sonWeb").on("click", function(){	
		var url_is = $("#son").attr("src");
		$("#son").attr("src", "");
		$(".son").hide();
		window.open(url_is, '_blank');
		return false;
	});
	/**
	 * 友情链接
	 */
	for(var i=0; i<friendLink.length-1; i+=2) {
		var f_id = friendLink[i];
		var f_link = $web.getUrl("", friendLink[i+1]);
		var isOpen = "";
		if(f_id.indexOf("#")!=-1) {
			isOpen=f_id.substring(f_id.indexOf("#"));
			f_id = f_id.substring(0, f_id.indexOf("#"));
		}
		//友情链接html
		var friendLinkHtml = "<div id='"+f_id+"' class='friendLink' link='"+f_link+"' title='"+f_id+"' isOpen='"+isOpen+"'></div>";
		$("#btnMain").append(friendLinkHtml);
		//友情链接背景图片
		{
			var img = new Image();
			img.id = f_id;
			img.src = "../Myweb/img/"+f_id+".jpg";
			img.onload = function(e){
				var imgId=$(this).attr("id");
				//友情链接背景图片
				$("#"+imgId+"").css({
					"background-image":"url(../Myweb/img/"+imgId+".jpg)"
				});
			};
			img.onerror = function(e){
				var imgId=$(this).attr("id");
				//友情链接背景图片
				$("#"+imgId+"").css({
					"border" : "0.4px solid #eee",
					"padding-top": "7px",
					"width" : "37px",
					"height" : "31px",
				});	
				//背景文字
				var bgText = imgId.substring(0,3).toLocaleUpperCase(); 
				var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
				if(reg.test(bgText)){
					bgText = bgText.substring(0,2);
				}
				$("#"+imgId+"").html(bgText);
			};
			//友情链接位置
			$("#"+f_id+"").css({
				"left": (48+(40*i/2))+"px",
			});
		}
		//友情链接点击事件
		$("#"+f_id+"").on("click", function(){	
			var url_is = $(this).attr("link");
			var isOpen = $(this).attr("isOpen");
			if(isOpen) {
				window.open(url_is, '_blank');
			}else{
				$("#son").attr('src', url_is);
				$(".son").show();		
			}
			return false;
		});
	}
};



$(function(){
	//画页面内容
	web.createHtml();
	
	window.onresize = function () {
    	bodyScale();
   	};
   	bodyScale();
   	/**
	 * 页面大小固定
	 */
	function bodyScale() {
	    var devicewidth = document.documentElement.clientWidth;
	    var scale = devicewidth / 1520;  // 分母——设计稿的尺寸
	    document.body.style.zoom = scale;
	}
});
