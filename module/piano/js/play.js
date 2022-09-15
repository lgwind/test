//# sourceURL=play.js
var play = {
	num : 0,
	//历史任务
	hTask : [],
	//任务
	task : [],
	//任务长度
	taskNum : 0,
	//是否播放
	isPlay : false,
	//自动播放下一首
	autoNext : true,
	//列表循环
	isLoop : true,
	//单曲循环
	isAutoNow : true,
	//正在播放的音乐
	playMusicName : "",
	//是否自动移动歌词
	isAutoMoveLyric : true,
	//音乐
	music : {},
}, $play=play;

/**
 * 根据字符串生成任务
 * @param {Object} str
 */
play.createTask = function(str) {
	if(!str) return;
	var name = str;
	str = $play.music[str];	
	str = str.replace(/<br>/ig, "");
	str = str.replace(/<div>/ig, "");
	str = str.replace(/<\/div>/ig, "");
	$play.task=[];
	$play.hTask = [];
	var isAdd = true;
	var task = "";
	for(var i=0; i<str.length; i++) {
		//去除中文
		if(/.*[\u4e00-\u9fa5]+.*$/.test(str[i])) {
			continue;
		}
		if(str[i]=="_" || str[i].trim()=="" || str[i]=="|"){
			continue;
		}
		task += str[i];
		if(str[i]=="#") {
			continue;
		}else if(str[i]=="[" || str[i]=="{"){
			isAdd = false;
		}else if(str[i]=="]" || str[i]=="}"){
			isAdd = true;
		}		
		if(isAdd) {
			if(task=="~" || task=="-") {//延音符		
				$play.task.push(task);
			}else if(task=="=") {//休止符 0 	
				$play.task.push(task);
			}else{
				$play.task.push(task);
			}			
			if(i>=0 && i<str.length-2) {
				if(str[i+1]=="_" && str[i+2]=="_") {//十六分分音符					
				}else if(str[i+1]=="_"||str[i]==".") {//八分音符、附点音符
					$play.task.push("");
				}else{//四分音符
					$play.task.push("");
					$play.task.push("");
					$play.task.push("");			
				}
			}else if(i<str.length-1){
				if(str[i+1]=="_"||str[i]==".") {//八分音符
					$play.task.push("");
				}else{//四分音符
					$play.task.push("");
					$play.task.push("");
					$play.task.push("");			
				}
			}else{
				$play.task.push("");
				$play.task.push("");
				$play.task.push("");
			}
			task = "";
		}
	}
	$play.taskNum = $play.task.length;
	$play.playMusicName = name;
};

/**
 * 执行任务
 */
play.exeTask = function() {
	//按钮样式复原计数
	for(var key in $play.clickKey) {
		var value = $play.clickKey[key];
		if(value>0) {
			$play.clickKey[key]--;
		}
	}
	//获取任务
	var task = $play.task.shift();
	$play.hTask.push(task);
	if(!task) {
		return;
	}
	var keyName = null;
	if(task.length==1) {
		keyName = task;
	}else if(task.length==2 && task[0]=="#") {
		keyName = task;
	}else if(task.length>1) {
		var left = task.indexOf("[");
		if(left==-1) {
			left = task.indexOf("{");
		}
		var right = task.indexOf("]");
		if(right==-1) {
			right = task.indexOf("}");
		}
		if(left<right) {
			keyName = task.substring(left+1, right);
		}
	}
	{
		//打印音符
		var dicStr = $scoreDic[keyName];
		var keyNameShow = keyName;
		if(keyName.length>1 && !(task.length==2 && task[0]=="#")) {
			dicStr = "";
			for(var i=0; i<keyName.length; i++) {
				var keyNameTemp = keyName[i];
				if(keyNameTemp=="[" || keyNameTemp=="]" 
					|| keyNameTemp=="{" || keyNameTemp=="}") {
					dicStr += keyNameTemp;
				}else{
					if(i>0&&keyName[i-1]=="#") {
						keyNameTemp = "#"+keyNameTemp;
					}
					var dicTemp = $scoreDic[keyNameTemp];
					dicStr += dicTemp?dicTemp:"";					
				}
			}
			keyNameShow = "["+keyNameShow+"]";
			dicStr = "["+dicStr+"]";			
		}else{
			dicStr = dicStr?dicStr:"";
		}
		var tKey = $("#tMain").attr("key");
		var tVoice = $("#tMain").attr("voice");
		if(!tKey) tKey=""; if(!tVoice) tVoice="";
		dicStr = dicStr.replace(/##/ig,"#");
		$("#tMain").html((tKey+"<span style='color:#fbb957'>"+keyNameShow)+"</span>"+"&nbsp;&nbsp;"+(tVoice+"<span style='color:#fbb957'>"+dicStr+"</span>"));
		//console.log(keyName+" "+dicStr);
		var maxLength = 20;
		if(tKey.length>maxLength) {
			tKey = tKey.substring(tKey.length-maxLength);
		}
		if(tVoice.length>maxLength) {			
			tVoice = tVoice.substring(tVoice.length-maxLength);
		}
		$("#tMain").attr("key", tKey+=keyNameShow);
		$("#tMain").attr("voice", tVoice+=dicStr);
	}
	$play.click(keyName);
}

/**
 * 播放钢琴
 * @param {Object} keyName  按键1
 * @param {Object} isOne 是否是单键
 * @param {Object} isWait 是否等待20毫秒执行
 * @param {Object} isNotRecover 是否不复原按键样式 
 */
play.click = function(keyName, isOne, isWait) {
	//按钮样式复原
	{
		if(isOne) {
			var tempKey = $keyDic[keyName];
			tempKey = toneChange(tempKey);
			if(tempKey) {	
				//复原将要按下的按钮
				$play.clickKey[tempKey] = 0;
			}
		}else{
			var tempKey = "";
			for(var i=0; i<keyName.length; i++) {
				tempKey += keyName[i];
				if(tempKey=="#") {
					continue;
				}
				tempKey = $keyDic[tempKey];
				tempKey = toneChange(tempKey);
				if(tempKey) {
					//复原将要按下的按钮
					$play.clickKey[tempKey] = 0;
				}
				tempKey = "";
			}
		}	
		for(var key in $play.clickKey) {
			var value = $play.clickKey[key];
			if(value<=0 && value>-9) {
				$play.clickKey[key]=-9;
				$(".blackBtn[key="+key+"]").trigger("mouseup");
				$(".whiteBtn[key="+key+"]").trigger("mouseup");		
			}
		}
	}
	if(!keyName || keyName=="-" || keyName=="~") return;	
	if(!isWait) {
		//按键样式复原
		//$(".blackBtn").css("background", "linear-gradient(-20deg,#333,#000,#333)");
		//$(".whiteBtn").css("background", "linear-gradient(-30deg,#f5f5f5,#fff)");
		setTimeout(function() {
			play.click(keyName, isOne, true);
		}, 20);
		return;
	}
	if(isOne) {
		var tempKey = $keyDic[keyName];
		tempKey = toneChange(tempKey);
		if(tempKey) {
			$(".blackBtn[key="+tempKey+"]").trigger("mousedown");
			$(".whiteBtn[key="+tempKey+"]").trigger("mousedown");	
			//记录按下的按钮
			$play.clickKey[tempKey] = 2;
			if($play.task.length>3) {
				var taskNum = $play.task.length;
				if($play.task[0]=="" 
					&& play.task[1]=="" 
					&& play.task[2]=="" ) {
					$play.clickKey[tempKey] = 4;					
				}
			}
		}
	}else{
		var tempKey = "";
		for(var i=0; i<keyName.length; i++) {
			tempKey += keyName[i];
			if(tempKey=="#") {
				continue;
			}
			tempKey = $keyDic[tempKey];
			tempKey = toneChange(tempKey);
			if(tempKey) {
				$(".blackBtn[key="+tempKey+"]").trigger("mousedown");
				$(".whiteBtn[key="+tempKey+"]").trigger("mousedown");
				//记录按下的按钮
				$play.clickKey[tempKey] = 2;
				if($play.task.length>3) {
					var taskNum = $play.task.length;
					if($play.task[0]=="" 
						&& play.task[1]=="" 
						&& play.task[2]=="" ) {
						$play.clickKey[tempKey] = 4;					
					}
				}
			}
			tempKey = "";
		}
	}	
	//防触碰
	$draw.isPressKey = false;
	/**
	 * 升降调
	 * @param {Object} keyName
	 */
	function toneChange(keyName) {
		if(!keyName) return keyName;
		//升降调
		var tone = 0;
		var nameNum = parseInt(keyName.replace(/[^\d]/g, ''))+tone;
		keyName = keyName.replace(/\d+/g,'')+nameNum;	
		return keyName;
	}
};
play.clickKey={};

/**
 * 获取乐谱
 */
play.getScore = function(name) {
	var music = $music[name];
	var score = [];
	for(var mNum=0; mNum<music.length; mNum++) {
		var word = music[mNum];
		if(mNum>0) {
			if(music[mNum-1]=="#") {
				word = "#"+word;
			}
		}
		//去除中文
		if(/.*[\u4e00-\u9fa5]+.*$/.test(word)) {
			continue;
		}		
		var sWord = scoreDic[word];
		if(sWord) {
			score.push(sWord);
		}else if(score.length>0) {
			if(word==".") {
				score.push("۰");
			}else if(word=="_") {
				if(score.length>1) {
					if(score[score.length-1]=="]") {
						score[score.length-2] += word;
					}else{
						score[score.length-1] += word;
					}
				}else{
					score[score.length-1] += word;
				}
			}else if(word=="|") {
				if(score[score.length-1]=="|") {
					score[score.length-1] += word;					
				}else{
					score.push(word);
				}
			}
		}
		if(word=="["||word=="]" ||word=="{"||word=="}"
			||word=="="||word=="-") {
			if(!sWord) {
				score.push(word);
			}
		}
	}
	//生成HTML文件
	var scoreHtml = "";
	var lastLittle = false;
	var keyNum=0, lastKeyNum=0;
	var isAddKeyNum=true;
	var waitAddKey = 4;
	for(var sNum=0; sNum<score.length; sNum++) {
		var sWord = score[sNum];
		var isLittle = false;
		if(sWord.indexOf("_")!=-1) {
			isLittle = true;
		}
		if(isLittle&&!lastLittle) {
			lastLittle = true;
		}else if(sWord!="["&&sWord!="]"
			&&sWord!="{"&&sWord!="}"&&sWord!="۰"){
			lastLittle = false;			
		}
		//判断键音长
		if(sWord=="[" || sWord=="{"){
			isAddKeyNum = false;
			waitAddKey = 4;
		}else if(sWord=="]" || sWord=="}"){
			isAddKeyNum = true;
			keyNum+=waitAddKey;
		}else if(sWord=="|" || sWord=="||" || !sWord.trim()){
			//小节线和空格不计算音符
		}else if(isAddKeyNum){
			if(sWord.indexOf("__")!=-1) {
				//十六分音符
				keyNum+=1;
			}else if(sWord.indexOf("_")!=-1 || sWord=="۰") {
				//八分音符和附点音符
				keyNum+=2;
			}else{
				//四分音符
				keyNum+=4;
			}
		}else{//判断括号里的音符长度	
			if(sWord.indexOf("__")!=-1) {
				//十六分音符
				waitAddKey = 1;
			}else if(sWord.indexOf("_")!=-1 || sWord=="۰") {
				//八分音符
				waitAddKey = 2;
			}
		}
		//是否有黑键
		var isHasBlace = false;
		if(sWord.indexOf("##")!=-1) {
			isHasBlace = true;
		}		
		//
		sWord = sWord.replace(/<br>/ig, "||");
		sWord = sWord.replace(/=/ig, "0");
		//高音
		sWord = sWord.replace(/""/ig, "一一一");
		sWord = sWord.replace(/"'/ig, "一一");
		sWord = sWord.replace(/"/ig, "一");
		sWord = sWord.replace(/'/ig, "<span class='scoreAdd'></span>");
		sWord = sWord.replace(/一一一/ig, "<span class='scoreAdd4'></span>");
		sWord = sWord.replace(/一一/ig, "<span class='scoreAdd3'></span>");
		sWord = sWord.replace(/一/ig, "<span class='scoreAdd2'></span>");
		//低音
		sWord = sWord.replace(/…/ig, "<span class='scoreSub3'></span>");
		sWord = sWord.replace(/\.\./ig, "<span class='scoreSub2'></span>");
		sWord = sWord.replace(/\./ig, "<span class='scoreSub'></span>");
		//十六分音符
		sWord = sWord.replace(/__/ig, "<span class='scoreBottom2'></span>");
		//八分音符
		sWord = sWord.replace(/_/ig, "<span class='scoreBottom'></span>");
		//特殊按键
		sWord = sWord.replace(/##/ig, "<span class='scoreLeftTop'>#</span>");
		//特殊符号
		sWord = sWord.replace(/\|\|/ig, "<br>");
		sWord = sWord.replace(/\|/ig, "<span class='scoreSpilt'>|</span>");	
//		sWord = sWord.replace(/\۰/ig, "<span class='scoreSpot'>۰</span>");			
		//音阶
		var keyClass = " key='"+(lastKeyNum==0?"1":lastKeyNum+1)+"'";		
		lastKeyNum = keyNum;
		var wordClass = "";
		if(sWord=="<br>") {
			scoreHtml+=sWord;
		}else if(!isAddKeyNum || sWord=="۰"||sWord=="["||sWord=="]" 
				  || sWord=="{"||sWord=="}") {
			wordClass += "scoreWord2";
		}else if(isLittle&&!lastLittle) {
			wordClass += "scoreWordR";
		}else if(isLittle) {
			wordClass += "scoreWordL";
		}else{
			wordClass += "scoreWord";
		}
		if(isHasBlace) {
			wordClass += " hasBlace";
		}
		scoreHtml+="<span class='"+wordClass+" keyShow'"+keyClass+">" + sWord +"</span>";
	}
	return scoreHtml;
};

/**
 * 保存播放状态
 */
play.saveState = function() {
	var playTemp = {
		task : $play.task,
		hTask : $play.hTask,
		//任务长度
		taskNum : $play.taskNum,
		//是否播放
		isPlay : $play.isPlay,
		//自动播放下一首
		autoNext : $play.autoNext,
		//列表循环
		isLoop : $play.isLoop,
		//单曲循环
		isAutoNow : $play.isAutoNow,
		//正在播放的音乐
		playMusicName : $play.playMusicName,
		//自定义
		doBySelf : $("#create").html(),	
		//音量
		volume : $voice.volume,
		//是否是88键
		isKey88 : $draw.isKey88,
	};
	//保存$play对象
	var tempPlay = JSON.stringify(playTemp);
	var lastPlay = localStorage.getItem("$play");
	if(tempPlay!=lastPlay) {
		localStorage.setItem("$play", tempPlay);
		result = true;
	}
	//console.log("save:"+playTemp.isPlay);
};

/**
 * 加载播放状态
 */
play.loadState = function() {
	var nowPlayTemp = {
		task : $play.task,
		hTask : $play.hTask,
		//任务长度
		taskNum : $play.taskNum,
		//是否播放
		isPlay : $play.isPlay,
		//自动播放下一首
		autoNext : $play.autoNext,
		//列表循环
		isLoop : $play.isLoop,
		//单曲循环
		isAutoNow : $play.isAutoNow,
		//正在播放的音乐
		playMusicName : $play.playMusicName,	
		//自定义
		doBySelf : $("#create").html(),		
		//音量
		volume : $voice.volume,
		//是否是88键
		isKey88 : $draw.isKey88,
	};
	//加载$play对象
	var tempPlay = localStorage.getItem("$play");
	var nowPlay = JSON.stringify(nowPlayTemp);
	if(!tempPlay || tempPlay==nowPlay) {
	}else{
		var oldPlayTemp = JSON.parse(tempPlay);
//		console.log("load:"+oldPlayTemp.isPlay);
//		if(oldPlayTemp.isPlay==false) {
//			debugger;
//		}
		//加载数据
		for(var key in oldPlayTemp) {
			$play[key] = oldPlayTemp[key];
		}	
		//自定义
		$("#create").html(oldPlayTemp["doBySelf"]),
		$music["自定义"] = oldPlayTemp["doBySelf"],
		//音量
		$voice.volume = oldPlayTemp.volume;
		//是否是88键
		$draw.isKey88 = oldPlayTemp.isKey88;
	}
	//加载完成
	$play.isLoad = true;
};

/**
 * 循环动画
 */
window.requestAnimFrame = (function(){
    return  function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 55);
            } || window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame;
})();
function animate() {
    requestAnimFrame(animate);
    //未加载完成不执行
    if(!$play.isLoad) return;
    play.num++;
    if(play.num==500) {
    	play.num==0;
    }
    if(play.num%5==0 && $play.isPlay) {
    	play.exeTask();
    	//自动移动歌词
    	var moveData = $play.taskNum-$play.task.length;
    	var moveObj = $(".keyShow[key="+moveData+"]");
    	if(moveObj.length>0 && $play.isAutoMoveLyric) {
    		var moveTop = moveObj.offset().top;
    		var lyricTop = $("#lyric").offset().top;
    		var lyricHeight = $("#lyric").height();
    		var nowTop = $("#lyric").scrollTop();
    		if(moveTop<lyricTop || moveTop>lyricTop+lyricHeight-8.8) {
    			$("#lyric").scrollTop(nowTop+(moveTop-lyricTop-4.8));
    		}
    	} 
    }
    //乐谱变红
    var moveData = $play.taskNum-$play.task.length;
	$(".keyShow[key="+(moveData)+"]").css("color", "red");
	//进度条
    var value = 100;
    if($play.taskNum>0) {
    	var data = $play.taskNum-$play.task.length;
		value = data/$play.taskNum*100; 
    	if($("#musicTime").attr("data")!=data){
		    $("#musicTime").attr("data", data); 
		    $("#musicTime").attr("value", value); 
		    $("#mBtn #time").text(($play.taskNum-$play.task.length)+"/"+$play.taskNum);	
    	}
    	if($play.playMusicName!=$("#mBtn #mName").text()) {
		    $("#mBtn #mName").text($play.playMusicName);
		    $(".music").css("color", "#000000");
		    $("#m_"+$play.playMusicName).css("color", "cornflowerblue");
    	}
    }
    //播放完毕 
    if(value==100) {
    	//暂停
    	if($play.isPlay) {
    		$("#play").click();
    	}
		//单曲循环
		if($play.isAutoNow) {
    		$("#play").click();			
		}
    	//自动下一首 $play。autoNext
    	else if($play.autoNext) {
    		$("#next").click();
    	}
    }
    if(play.num>30 && play.num%30==5) {
    	play.saveState();
    }
}
animate();
