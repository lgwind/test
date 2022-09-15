//# sorceURL=lgwind.js
/**
 * 功能说明：主要提供一些常用有效的方法
 * 主变量 lg/$lg
 */
var lg={
	obj : {},
}, $lg=lg, lgwind=lg;

/**
 * 字符串转数字
 * @param str 字符串
 */
lg.int = (str) => {
	return parseInt(str);
};

/**
 * 字符转数字
 * @param str 字符串
 * @param p   保留的小数点位数
 */
lg.float = (str, p) => {
	//字符串转浮点数
	var result = parseFloat(str);
	if(p || p==0) {
		if(p>=0) {
			//保留p位小数
			result = result.toFixed(p);
		}
	}
	return result;
};

/**
 * 获取日期
 */
lg.date = () => {
	var myDate = new Date();
	return new lg.obj.Date(myDate);
};

/**
 * 时间对象
 * @param {Object} myDate
 */
lg.obj.Date = function(myDate) {
	//数据源
	this.date = myDate;
	//获取当前年份(2位)
	this.year = myDate.getYear();
	//获取完整的年份(4位,1970-????)
	this.fullYear = myDate.getFullYear();
	this.month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
	this.day = myDate.getDate();    //获取当前日(1-31)
	this.weekDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
	this.time = myDate.getTime();   //获取当前时间(从1970.1.1开始的毫秒数)
	this.h = myDate.getHours();       //获取当前小时数(0-23)
	this.min = myDate.getMinutes();     //获取当前分钟数(0-59)
	this.s = myDate.getSeconds();     //获取当前秒数(0-59)
	this.ms = myDate.getMilliseconds();    //获取当前毫秒数(0-999)
	//myDate.toLocaleDateString();     //获取当前日期 '2022/1/22'
	//myDate.toLocaleTimeString();     //获取当前时间 '上午5:56:35'
	//myDate.toLocaleString( );        //获取日期与时间
	this.toString = (fmt) => {
		//返回当前时间
		return this.format(fmt);
	};
	/**
	 * 格式化
	 */
	this.format = (fmt) => {
		var o = {         
		    "M+" : this.month, //月份         
		    "d+" : this.day, //日         
		    "h+" : this.h%12 == 0 ? 12 : this.h%12, //小时         
		    "H+" : this.h, //小时         
		    "m+" : this.min, //分         
		    "s+" : this.s, //秒         
		    "q+" : Math.floor((this.month+3)/3), //季度         
		    "S" : this.ms //毫秒         
	   };	    
	    if (fmt == undefined) {
	    	fmt = "yyyy-MM-dd hh:mm:ss";
	    }
	    if(/(y+)/.test(fmt)){
	        fmt=fmt.replace(RegExp.$1, (this.fullYear+"").substr(4 - RegExp.$1.length));     
	    }
	    if(/(E+)/.test(fmt)){
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "") + "日一二三四五六".charAt(this.day));         
	    }         
	    for(var k in o){
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }
		return fmt;
	};
};

/**
 * 保存数据
 */
lg.set = (key, value) => {
	localStorage.setItem(key,value);	
};

/**
 * 获取数据
 */
lg.get = (key) => {
	return localStorage.getItem(key);
};

/**
 * 数字转中文
 */
lg.chineseNum = (num) => {
    //字符串转数字    	
	num = ""+num;
    //转数字方法
    let toNum = (sIndex, uIndex) => {
    	if(sIndex<0 || sIndex>10 || uIndex<0) {
    		return "";
    	}
    	//区分万/亿
    	let judge=uIndex;
    	uIndex=uIndex%4;
		//整数
	    let sym = ['零', '一', '二', '三', '四', 
	    			'五', '六', '七', '八', '九'];
    	//位数
    	let unit = ["", "十", "百", "千", "万","亿","兆","京","垓","秭","壤","沟","涧","正","载"];
    	//返回值
    	let result = sym[sIndex]+unit[uIndex]
    	//若符号数为零
    	if(sIndex==0) {
    		result = sym[sIndex];
    	}
    	if(judge%8==4) {//万
    		result+=unit[4];
    	}else if(judge%16==8) { //亿
    		result+=unit[5];
    	}else if(judge%32==16) {//兆
    		result+=unit[6];
    	}else if(judge%64==32) {//京
    		result+=unit[7];
    	}else if(judge%128==64) {//
    		result+=unit[8];
    	}else if(judge%256==128) {//
    		result+=unit[8];
    	}else if(judge%512==256) {//
    		result+=unit[8];
    	}else if(judge%1024==512) {//
    		result+=unit[8];
    	}
    	return result;
    };
    //转为字符串遍历
    let numStr = num.toString().split("").reverse();
    let result = "";
    for(let i=numStr.length-1; i>=0; i--) {
    	let rTemp = toNum(numStr[i], i);
    	result+=rTemp;
    }
    /**
     * 结果微调
     */
    //转数组
    result=result.split("");
    //去除重复的零
    for(var i=1; i<result.length; i++) {
    	//去除重复的零
    	if(result[i-1]=="零"&&result[i]=="零") {
    		result[i-1]='';
    	}
    	//去掉最后的0
    	if(result[i]=="零"&&i==result.length-1) {
    		result[i]='';    		
    	}
    	//去除零万
    	if(result[i-1]=="零"&&result[i]=="万") {
    		result[i-1]='万';
    		result[i]='零';
    	}
    	//去除零亿
    	if(result[i-1]=="零"&&result[i]=="亿") {
    		result[i-1]='亿';
    		result[i]='零';
    	}
    	//去除零兆
    	if(result[i-1]=="零"&&result[i]=="兆") {
    		result[i-1]='兆';
    		result[i]='零';
    	}
    	//一十不能是开头
    	if(result[i-1]=="一"&&result[i]=="十"&&i==1) {
    		result[i-1]="";
    	}
    }
    return result.join("");
};

/**
 * 下载txt文件
 */
lg.download = (content) => {
	
};

//末尾标记
lg.end = () => {};
