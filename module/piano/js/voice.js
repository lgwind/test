//# sourceURL=voice.js
var voice = {
	volume : 1,
	data : {},
}, $voice=voice;

/** 音频缓存上限 */
voice.saveMax = 400;

/**
 * 寻找一个音频
 * @param {Object} voiceName 声音文件名
 */
voice.findAudioElement = function(voiceName) {
	var result =false;
	for(var i=0; i<$voice.saveMax; i++) {
		var voiceNameTemp = voiceName + (i?("_"+i):"");
		var voiceObj = voice.data[voiceNameTemp];
		if(voiceObj && voiceObj.paused) {
			voiceObj.volume = voice.volume;
			voiceObj.play();
			result = true;
			break;
			//break;
		}else if(!voiceObj) {
			//break;
		}
	}
	return result;
};

/**
 * 添加一个音频并缓存
 * @param {Object} voiceName 声音文件名
 * @param {Object} voicePath 声音文件路径
 */
voice.addAudioElement = function(voiceName, voicePath) {
	for(var i=0; i<$voice.saveMax; i++) {
		var voiceNameTemp = voiceName + (i?("_"+i):"");
		var voiceObj = voice.data[voiceNameTemp];
		if(!voiceObj) {
			//创造并播放新的音频
			var audioElement = $voice.createAudioElement(voiceName, voicePath);
			voice.data[voiceNameTemp] = audioElement;
			break;
		}
	}
};

/**
 * 新建一个音频
 * @param {Object} voicePath 声音文件名
 * @param {Object} voicePath 声音文件路径
 */
voice.createAudioElement = function(voiceName, voicePath) {
	var audioElement = document.createElement('audio');
	//若是声音字符串
	if($voice.isVoiceStr) {
		//将声音字符串转为声音文件
		voicePath = voice.getVoiceByStr(voiceName);
	}
   	audioElement.setAttribute('src', voicePath);
    audioElement.setAttribute('autoplay', 'autoplay'); //打开自动播放
	//$.get();
	audioElement.addEventListener("load", function() {
		//第一次加载时会自动播放，所有不需要继续播放
		//audioElement.play();
	}, true);
	//音量调整
	if(audioElement.volume!=voice.volume) {
		audioElement.volume = voice.volume;
	}
	return audioElement;
};

/**
 * 声音字符串转声音文件
 * @param {Object} key 声音字符串文件名
 */
voice.getVoiceByStr = function(key) {
	if(key.indexOf("s")!=-1) {
		key = key.replace(/Cs/ig, "Db");
		key = key.replace(/Ds/ig, "Eb");
		key = key.replace(/Fs/ig, "Gb");
		key = key.replace(/Gs/ig, "Ab");
		key = key.replace(/As/ig, "Bb");
		
	}
	var data = piano[key];
	//var data = MIDI.Soundfont.acoustic_grand_piano[key];
	if(!data) {
		//出现异常
		debugger;
		return key;
	}
	var index = data.indexOf(",")+1;
	data=data.substring(index);
	var bufs = base64toBlob(data);
	var sblod = new Blob([bufs]);//bufs为二进制
    var voicePath = window.URL.createObjectURL(sblod);
    return voicePath; 
    /**
     * 字符串转二进制码
     * @param {Object} base64
     */
    function base64toBlob(base64) {
	    var bstr = atob(base64); // 获得base64解码后的字符串
	    var bstrAdd = "";
	    for(var i=0; i<bstr.length; i++) {
	    	bstrAdd+=bstr[i];
	    }
	    var n = bstrAdd.length;
	    var u8arr = new Uint8Array(n); // 新建一个8位的整数类型数组，用来存放ASCII编码的字符串
	    while (n--) {
	    	var code = bstrAdd.charCodeAt(n)
	    	if(code!=0) {
	    		//debugger;
	    	}
	    	u8arr[n] = code; // 转换编码后才使用charCodeAt 找到Unicode编码
	    }
	    return u8arr;
	}
};

/**
 * 播放声音
 * @param {Object} voiceName 声音缓存名字
 * @param {Object} voicePath 声音文件路径
 */
voice.playVoice = function(voiceName, voicePath) {
	//音量控制范围
	if(voice.volume<0) {
		voice.volume=0;
	}else if(voice.volume>1){
		voice.volume=1;
	}
	try{
		//寻找缓存的音频并播放
		var canFind = $voice.findAudioElement(voiceName);
		if(!canFind) {
			//找不到缓存则新增缓存
			$voice.addAudioElement(voiceName, voicePath);
		}	
	}catch(e) {
		console.error("voiceName:"+voiceName);
		console.error(e);
	}	
};

/**
 * 播放系统声音
 * @param {Object} name
 */
voice.playKeyVoice = function(name) {
	var vName = name;
	if(name.length==1) {
		vName = $keyDic[name];
	}
	var path = "voice"
	//使用88键钢琴
	if($draw.isKey88) {
		//使用声音字符串文件
		$voice.isVoiceStr = true;
		if(!$voice.isVoiceStr) {
			//调整键名
			var nameNum = parseInt(vName.replace(/[^\d]/g, ''))-1;
			vName = vName.replace(/\d+/g,'')+nameNum;
			//使用小写
			vName = vName.toLocaleLowerCase();
			path =  "voice88";
		}
	}
	var voicePath =  "resource/"+path+"/" + vName+".mp3";
	voice.playVoice(vName, voicePath);
}
