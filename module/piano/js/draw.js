//# sourceURL=draw.js
var draw = {
	//鼠标是否处于按下状态
	isPressKey : false,
	//是否是88键
	isKey88 : true,
}, $draw = draw;
var keyDic = {}, $keyDic=keyDic;
var scoreDic = { "=":"0",".":"۰", "-":"-", "~":"~"}, $scoreDic=scoreDic;

/**
 * 改成88键 - 白键
 * @param {Object} keyNumName
 * @param {Object} keyName
 * @param {Object} keyOnName
 */
draw.dealWhiteKey88 = function(keyNumName, keyName, keyOnName){
	var keyNumNameTemp = [
		"6….",  "7….",
		"1…",  "2…",  "3…",  "4…",  "5…",  "6…",  "7…",
		"1..", "2..", "3..", "4..", "5..", "6..", "7..",
		"1.",  "2.",  "3.",  "4.",  "5.",  "6.",  "7.",
		"1",   "2",   "3",   "4",   "5",   "6",   "7",
		"1'",  "2'",  "3'",  "4'",  "5'",  "6'",  "7'",
		"1\"", "2\"", "3\"", "4\"", "5\"", "6\"", "7\"",
		"1\"'", "2\"'", "3\"'", "4\"'", "5\"'", "6\"'", "7\"'",
		"1\"\"",
	];
	var keyNameTemp = [
		"A0", "B0",
		"C1", "D1", "E1", "F1", "G1", "A1", "B1",
		"C2", "D2", "E2", "F2", "G2", "A2", "B2",
		"C3", "D3", "E3", "F3", "G3", "A3", "B3",
		"C4", "D4", "E4", "F4", "G4", "A4", "B4",
		"C5", "D5", "E5", "F5", "G5", "A5", "B5",
		"C6", "D6", "E6", "F6", "G6", "A6", "B6",
		"C7", "D7", "E7", "F7", "G7", "A7", "B7",
		"C8",
	];
	var keyOnNameTemp = [
		"#w", "#e",
		"#r","#t","#y","#u","#i","#o","#p",
		"1", "2", "3", "4", "5", "6", "7",
		"8", "9", "0", "q", "w", "e", "r",
		"t", "y", "u", "i", "o", "p", "a",
		"s", "d", "f", "g", "h", "j", "k",
		"l", 'z', "x", "c", "v", "b", "n",
		"m","#a","#s","#d","#f","#g","#h",
		"#j",
	];
	//添加数据
	for(var i=0; i<keyNumNameTemp.length; i++) {
		keyNumName.push(keyNumNameTemp[i]);
	}
	//添加数据
	for(var i=0; i<keyNameTemp.length; i++) {
		keyName.push(keyNameTemp[i]);
	}
	//添加数据
	for(var i=0; i<keyOnNameTemp.length; i++) {
		keyOnName.push(keyOnNameTemp[i]);
	}
	
};

/**
 * 画白色按钮-36个
 */
draw.drawWhiteBtn = function() {
	var keyNumName = [
		"1..", "2..", "3..", "4..", "5..", "6..", "7..",
		"1.",  "2.",  "3.",  "4.",  "5.",  "6.",  "7.",
		"1",   "2",   "3",   "4",   "5",   "6",   "7",
		"1'",  "2'",  "3'",  "4'",  "5'",  "6'",  "7'",
		"1\"", "2\"", "3\"", "4\"", "5\"", "6\"", "7\"",
		"1\"'",
	];
	var keyName = [
		"C2", "D2", "E2", "F2", "G2", "A2", "B2",
		"C3", "D3", "E3", "F3", "G3", "A3", "B3",
		"C4", "D4", "E4", "F4", "G4", "A4", "B4",
		"C5", "D5", "E5", "F5", "G5", "A5", "B5",
		"C6", "D6", "E6", "F6", "G6", "A6", "B6",
		"C7",
	];
	var keyOnName = [
		"1", "2", "3", "4", "5", "6", "7",
		"8", "9", "0", "q", "w", "e", "r",
		"t", "y", "u", "i", "o", "p", "a",
		"s", "d", "f", "g", "h", "j", "k",
		"l", 'z', "x", "c", "v", "b", "n",
		"m",
	];
	if($draw.isKey88) {
		keyNumName=[]; keyName=[]; keyOnName=[];
		draw.dealWhiteKey88(keyNumName, keyName, keyOnName);
	}
	$("#main").html("");
	for(var i=0; i<keyName.length; i++) {
		var htmlStr = "<div id='key_"+keyName[i]
					+"' class='whiteBtn'></div>";
		//添加白色钢琴按钮
		$("#main").append(htmlStr);
		//保存字典
		$keyDic[keyName[i]] = keyOnName[i];
		$keyDic[keyOnName[i]] = keyName[i];
		$scoreDic[keyOnName[i]] = keyNumName[i];
		//添加按键提示
		var id = "key_"+keyName[i];
		$("#"+id).attr("key", keyName[i]);
		$("#"+id).attr("on", keyOnName[i]);
		$("#"+id).append("<span>"+keyOnName[i]+"</span>");
		$("#"+id).append("<span>"+keyName[i]+"</span>");
		$("#"+id).append("<span>"+keyNumName[i]+"</span>");
		//鼠标按下时，播放音乐，修改样式
		$("#"+id).on("mousedown", function(){
			var keyName = $(this).attr("key");
			$voice.playKeyVoice(keyName);
			$(this).css({
				"background": "#fbb957",
				"border-radius": "0 0 0px 0px",
				"border" : "1px solid #FFEBCD",				
			});
		});
		//鼠标移入时，若鼠标为按下状态，则视为按下鼠标
		$("#"+id).on("mouseenter", function(){
			//若鼠标处于按下状态，则视为按下按钮
			if($draw.isPressKey) {
				$(this).trigger("mousedown");
			}
		});
		//鼠标松开时，样式复原
		$("#"+id).on("mouseup", function(){					
			$(this).trigger("mouseleave");
		});
		//鼠标移出时，样式复原
		$("#"+id).on("mouseleave", function(){
			$(this).css({
				"background": "linear-gradient(-30deg,#f5f5f5,#fff)",
			    "border-radius": "0 0 5px 5px",
			    "border" : "1px solid #ccc",
			});
		});
	}
	if($draw.isKey88) {		
		$("#tMain").css({
			"width" : "calc(99.62% - 2px)",
			"left" : "calc(0% + 1px)",
		});
		$("#main").css({
			"width" : "99.73%",
			"left" : "0.3%",
		});
		$(".whiteBtn").css({
			"width" : "calc(1.916% - 2px)",
		});
	}else{
		$("#tMain").css({
			"width" : "calc(81.48% - 2px)",
			"left" : "calc(9% - 1px)",
		});
		$("#main").css({
			"width" : "82%",
			"left" : "9%",
		});
		$(".whiteBtn").css({
			"width" : "calc(2.76% - 2px)",
		});		
	}
}

/**
 * 改成88键 - 黑键
 * @param {Object} keyName
 * @param {Object} keyOnName
 */
draw.dealBlackKey88 = function(keyNumName, keyName, keyOnName){
	var keyNumNameTemp = [
		"6….", "",
		"1…",  "2…",  "", "4…",  "5…",  "6…",  "",
		"1..", "2..", "", "4..", "5..", "6..", "",
		"1.",  "2.",  "", "4.",  "5.",  "6.",  "",
		"1",   "2",   "", "4",   "5",   "6",   "",
		"1'",  "2'",  "", "4'",  "5'",  "6'",  "",
		"1\"", "2\"", "", "4\"", "5\"", "6\"", "",
		"1\"'","2\"'","", "4\"'","5\"'","6\"'", "",
	];
	var keyNameTemp = [
		"As0", "",
		"Cs1", "Ds1", "", "Fs1", "Gs1", "As1", "",
		"Cs2", "Ds2", "", "Fs2", "Gs2", "As2", "",
		"Cs3", "Ds3", "", "Fs3", "Gs3", "As3", "",
		"Cs4", "Ds4", "", "Fs4", "Gs4", "As4", "",
		"Cs5", "Ds5", "", "Fs5", "Gs5", "As5", "",
		"Cs6", "Ds6", "", "Fs6", "Gs6", "As6", "",
		"Cs7", "Ds7", "", "Fs7", "Gs7", "As7", "",
	];
	var keyOnNameTemp = [
		"#W", "",
		"#R","TT","","#U","#I","#O", "",
		"!", "@", "", "$", "%", "^", "",
		"*", "(", "", "Q", "W", "E", "",
		"T", "Y", "", "I", "O", "P", "",
		"S", "D", "", "G", "H", "J", "",
		"L", 'Z', "", "C", "V", "B", "",
		"M", "#A","", "#D","#F","#G", "",
	];
	//添加数据
	for(var i=0; i<keyNumNameTemp.length; i++) {
		keyNumName.push(keyNumNameTemp[i]);
	}
	//添加数据
	for(var i=0; i<keyNameTemp.length; i++) {
		keyName.push(keyNameTemp[i]);
	}
	//添加数据
	for(var i=0; i<keyOnNameTemp.length; i++) {
		keyOnName.push(keyOnNameTemp[i]);
	}
};

/**
 * 画黑键
 */
draw.drawBlackBtn = function() {
	var keyNumName = [
		"1..", "2..", "", "4..", "5..", "6..", "",
		"1.",  "2.",  "", "4.",  "5.",  "6.",  "",
		"1",   "2",   "", "4",   "5",   "6",   "",
		"1'",  "2'",  "", "4'",  "5'",  "6'",  "",
		"1\"", "2\"", "", "4\"", "5\"", "6\"", "",
	];
	var keyName = [
		"Cs2", "Ds2", "", "Fs2", "Gs2", "As2", "",
		"Cs3", "Ds3", "", "Fs3", "Gs3", "As3", "",
		"Cs4", "Ds4", "", "Fs4", "Gs4", "As4", "",
		"Cs5", "Ds5", "", "Fs5", "Gs5", "As5", "",
		"Cs6", "Ds6", "", "Fs6", "Gs6", "As6", "",
	];
	var keyOnName = [
		"!", "@", "", "$", "%", "^", "",
		"*", "(", "", "Q", "W", "E", "",
		"T", "Y", "", "I", "O", "P", "",
		"S", "D", "", "G", "H", "J", "",
		"L", 'Z', "", "C", "V", "B", "",
	];
	if($draw.isKey88) {
		keyNumName=[]; keyName=[]; keyOnName=[];
		draw.dealBlackKey88(keyNumName, keyName, keyOnName);
	}
	$("#sMain").html("");
	for(var i=0; i<keyName.length; i++) {
		if(keyName[i]!="") {
			var htmlStr = "<div id='skey_"+keyName[i]
						+"' class='blackBtn'></div>";
			//添加黑色钢琴按钮
			$("#sMain").append(htmlStr);
			//保存字典
			$keyDic[keyName[i]] = keyOnName[i];
			$keyDic[keyOnName[i]] = keyName[i];
			$scoreDic[keyOnName[i]] = "##"+keyNumName[i];
			//添加按键提示
			var id = "skey_"+keyName[i];
			$("#"+id).attr("key", keyName[i]);
			$("#"+id).attr("on", keyOnName[i]);;
			$("#"+id).append("<span>"+keyOnName[i]+"</span>");
			$("#"+id).append("<span>"+keyName[i].replace(/s/ig,"")+"</span>");
			//当鼠标按下时，播放音乐，并修改样式
			$("#"+id).on("mousedown", function(){
				var keyName = $(this).attr("key");
				$voice.playKeyVoice(keyName);	
				$(this).css("background", "#a93030");
			});
			//当鼠标移入时，若处于按下状态，则视为按下鼠标
			$("#"+id).on("mouseenter", function(){
				if($draw.isPressKey) {
					$(this).trigger("mousedown");
//					var keyName = $(this).attr("key");
//					$voice.playKeyVoice(keyName);	
//					$(this).css("background", "#a93030");
				}
			});
			//当鼠标松开时，样式复原
			$("#"+id).on("mouseup", function(){
				$(this).trigger("mouseleave");	
			});
			//当鼠标移出时，样式复原
			$("#"+id).on("mouseleave", function(){
				$(this).css("background", "linear-gradient(-20deg,#333,#000,#333)");	
			});
			//调整位置
			var margin = $("#sMain").offset().left;
			var left = $("#key_"+keyName[i].replace(/s/ig,"")).offset().left-margin;
			var margin2 = $("#key_"+keyName[i].replace(/s/ig,"")).width();
			var margin3 = $("#skey_"+keyName[i]).width();
			$("#skey_"+keyName[i]).css("left", left+margin2-margin3/2+"px");
		}
	}
	//当鼠标按下时，保存鼠标的按下状态
	$("#tMain").unbind("dblclick");
	$("#tMain").on("dblclick", function(){
		$draw.isKey88 = !$draw.isKey88;
		if($draw.isKey88) {
			$voice.volume += 0.5;
		}else{
			$voice.volume -= 0.5;
		}
		$voice.data = {};
		$draw.drawWhiteBtn();
		$draw.drawBlackBtn();
		$draw.drawMusicList();
	});
	$(window).unbind("mousedown");
	$(window).unbind("mouseup");
	//当鼠标按下时，保存鼠标的按下状态
	$(window).on("mousedown", function(){
		$draw.isPressKey = true;
	});
	//当鼠标松开时，取消保存鼠标的按下状态
	$(window).on("mouseup", function(){
		$draw.isPressKey = false;
	});
}

/**
 * 画音乐列表
 */
draw.drawMusicList = function() {
	$("#music").html("");
	$("#music").append("<div id='listTitle'><span>乐曲</span></div>");
	$("#music").append("<div id='list' class='scrollBar'></div>");
	var num = 1;
	for(var key in $play.music) {
		var id = "m_"+key;
		var htmlStr = "<div id='"+id+"' class='music'></div>";
		$("#music #list").append(htmlStr);
		$("#"+id).append("<span class='num'>"+(num++)+"</span");
		$("#"+id).append("<span class='name'>"+key+"</span");
		$("#"+id).attr("music", key);
		$("#"+id).on("click", function() {
			var music = $(this).attr("music");
			if(music!=$play.playMusicName) {
				$draw.playNewMusic(music);
			}else{
				$("#play").click();				
			}
		});
	}
	$("#music").append("<div id='mBtn'></div>");
	//播放按钮
	$("#music #mBtn").append("<div id='play' class='mBtn'>播放</div>");
	$("#music #mBtn").append("<div id='last' class='mBtn'>上一首</div>");
	$("#music #mBtn").append("<div id='next' class='mBtn'>下一首</div>");
	//播放次级按钮
	$("#music #mBtn").append("<div class='mLBtn'></div>");
	$("#music #mBtn .mLBtn").append("<span class='loop'>☑ 列表循环</span>");
	$("#music #mBtn .mLBtn").append("<span class='autoNext'>☑ 自动下一首</span>");
	$("#music #mBtn .mLBtn").append("<span class='autoNow'>☑ 单曲循环</span>");
	$("#music #mBtn .mLBtn").append("<span class='volume'>音量</span>");
	$("#music #mBtn .mLBtn").append("<meter value='5' min='0' max='100'></meter>");
	//播放进度条
	$("#music #mBtn").append("<meter id='musicTime' value='5' min='0' max='100'></meter>");
	$("#music #mBtn").append("<div id='time'>0/0</div>");
	$("#music #mBtn").append("<div id='mName'></div>");
	//显示按钮状态
	$draw.showBtnState();
	//音量控制
	$(".mLBtn meter").on("click", function(e){
		var x = e.offsetX;
		var left = $(".mLBtn meter").offset().left;
		var width = $(".mLBtn meter").outerWidth();
		var value = (x)/width*100;
		//console.log(e.offsetX);
		$(".mLBtn meter").attr("value", value);
		$voice.volume = parseInt($(".mLBtn meter").attr("value"))/100;
	});
	//音乐进度条控制
	$("#musicTime").on("click", function(e){
		var x = e.offsetX;
		var left = $("#musicTime").offset().left;
		var width = $("#musicTime").outerWidth();
		var value = (x)/width*100;
		$("#musicTime").attr("value", value);
		var data = parseInt(parseInt($("#musicTime").attr("value"))/100*$play.taskNum);
		var taskNum = $play.hTask.length;
		if(data>taskNum) {
			for(var i=0; i<data-taskNum && $play.task.length>0; i++) {
				var task = $play.task.shift();
				$play.hTask.push(task);
			}
		}else{
			for(var i=0; i<taskNum-data && $play.hTask.length>0; i++) {
				var task = $play.hTask.pop();
				$play.task.unshift(task);
			}
			$(".keyShow").css("color", "#000");
		}
	});
	//乐谱
	$("#listTitle").on("dblclick", function(){
		var url_is = "https://www.autopiano.cn/";
		window.open(url_is, '_blank');
	});
	//歌词
	$("#lyric").on("dblclick", function() {
		$play.isAutoMoveLyric = !$play.isAutoMoveLyric;
	});
	//播放
	$("#play").on("click", function(){
		$play.isPlay = !$play.isPlay;
		if($play.isPlay && $play.task.length==0) {
			if($play.playMusicName=="") {
				$("#next").click();
			}
			$draw.playNewMusic($play.playMusicName, true);
		}
		//显示按钮状态
		$draw.showBtnState();
	});
	//上一首
	$("#last").on("click", function(){
    	var lastKey = null;
    	for(var key in $play.music) {
    		if(key == $play.playMusicName) {
				$draw.playNewMusic(lastKey);
    			break;
    		}
    		lastKey = key;
    	}
	});
	//下一首
	$("#next").on("click", function(){
		var isPlay = false;
    	if($play.playMusicName=="") {
    		isPlay = true;
    	}
    	for(var key in $play.music) {
    		if(isPlay) {
				$draw.playNewMusic(key);
    			isPlay = false;
    			break;
    		}
    		if(key == $play.playMusicName) {
    			isPlay = true;
    		}
    	}
    	//循环播放 $play.isLoop
    	if(isPlay && $play.isLoop) {
	    	$play.playMusicName="";
	    	$(this).click();
	    }
	});
	//列表循环
	$("#mBtn .loop").on("click", function(){
		$play.isLoop = !$play.isLoop;
		//显示按钮状态
		$draw.showBtnState();
	});
	//自动播放
	$("#mBtn .autoNext").on("click", function(){
		$play.autoNext = !$play.autoNext;
		//显示按钮状态
		$draw.showBtnState();	
	});
	//列表循环
	$("#mBtn .autoNow").on("click", function(){
		$play.isAutoNow = !$play.isAutoNow;
		//显示按钮状态 
		$draw.showBtnState();
	});
	//执行自创作
	$("#exeCreate").on("click", function() {
		var music = "自定义";
		$play.music[music] = $("#create").text();
		$draw.playNewMusic(music);
	});
};

/**
 * 展示按钮状态
 */
draw.showBtnState = function() {
	if(!$play.isPlay) {
		$("#play").text("播放");
		$("#play").css("color", "#666")
	}else{
		$("#play").text("暂停");		
		$("#play").css("color", "#c14e4e")	
	}
	if($play.isLoop) {
		$(".loop").text("☑ 列表循环");
		$(".loop").css("color", "#c14e4e");
	}else{
		$(".loop").text("☐ 列表循环");	
		$(".loop").css("color", "#000");		
	}		
	if($play.autoNext) {
		$(".autoNext").text("☑  自动下一首");
		$(".autoNext").css("color", "#c14e4e");
	}else{
		$(".autoNext").text("☐  自动下一首");	
		$(".autoNext").css("color", "#000");		
	}		
	if($play.isAutoNow) {
		$(".autoNow").text("☑  单曲循环");
		$(".autoNow").css("color", "#c14e4e");
	}else{
		$(".autoNow").text("☐  单曲循环");	
		$(".autoNow").css("color", "#000");		
	}
	
	if($("#lyric").text()=="") {		
		//展示歌词
		$draw.showLyric($play.playMusicName);
	}
	//音量显示
	$(".mLBtn meter").attr("value", $voice.volume*100);			
}

/**
 * 播放音乐
 * @param {Object} music
 */
draw.playNewMusic = function(music, canNow) {
	if(music!=$play.playMusicName || music=="自定义" || canNow) {
		$play.createTask(music);
		if(!$play.isPlay) {
			console.log("test");
			$("#play").click();
		}
		//展示歌词
		$draw.showLyric(music);
	}	
}

draw.showLyric = function(music) {
	if(!music) return;
	var score = "<br>乐谱：<br>"+$play.getScore(music);
	var lyric = "<br>音谱：<br>" +$play.music[music];
	lyric = lyric.replace(/\|\|/ig, "<br>");
	//展示歌词
	$("#lyric").html(music+score+lyric);
	$("#lyric").scrollTop(0);	
	//自动移动歌曲位置
	var moveObj = $("#m_"+music);
	if(moveObj.length>0) {
		var moveTop = moveObj.offset().top-8;
		var listTop = $("#list").offset().top;
		var listHeight = $("#list").height();
		var nowTop = $("#list").scrollTop();
		if(moveTop<listTop || moveTop> listTop+listHeight) {
			$("#list").scrollTop(nowTop+(moveTop-listTop));
		}
	} 
}

/*
 * 键盘事件
 */
document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(!e) return;
	var keyEnter = e.key;
	if(e.keyCode==13 && e.ctrlKey){ // ctrl+Enter
		$("#exeCreate").click();
	}else if(e.altKey) {
		if(e.key!="Alt") {
			$play.click("#"+e.key, true, true);
		}
	}else if(keyEnter.length==1) {
		$play.click(e.key, false, true);
	}
	//按钮控制
	if(e.ctrlKey) {
		if(e.keyCode == 32) { //空格
			$("#play").click();
		}else if(e.keyCode == 37) {//←
			//上一首
			$("#last").click();			
		}else if(e.keyCode == 39) {//→
			//下一首
			$("#next").click();			
		}
	}
	if(e.altKey) {
		return false;
	}
}

document.onkeyup=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(!e) return;
	var keyEnter = e.key;
	if(keyEnter.length==1) {
		//按键样式复原
		$(".blackBtn").css("background", "linear-gradient(-20deg,#333,#000,#333)");
		$(".whiteBtn").css("background", "linear-gradient(-30deg,#f5f5f5,#fff)");
	}
}