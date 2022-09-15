/**
 * copy 复制值
 *//*lgwind*/
var Copy = [
	'引入jquery',"function addScript(url){ var script = document.createElement('script'); script.setAttribute('type','text/javascript'); script.setAttribute('src',url); document.getElementsByTagName('head')[0].appendChild(script);} addScript('https://code.jquery.com/jquery-3.0.0.min.js');",
];
/*lgwind*/

/**
 * ☆ link ☆链接变量
 *//*lgwind*/
var Link = [
    
    /*标题类型*/
	'个人办公',"{type}",
    /*
     * 个人办公
     */
    
    
    /*标题类型*/
	'常用网页',"{type}",
    /**
     * 常用网页
     */
    
    
    /*标题类型*/
	'前端',"{type}",
    /**
     * 前端
     */
    
    
    /*标题类型*/
	'后台',"{type}",
    /**
     * 后台
     */
    
    
	/*标题类型*/
	'学习',"{type}",
    /**
     * 动漫导航
     */
	
	
    /*标题类型*/
	'书籍',"{type}",
    /**
     * 书籍
     */
    
    
    /*标题类型*/
	'Lgwind',"{type}",
    /**
     * Lgwind
     */
    
];
/*lgwind*/

/**
 * 搜索按钮变量
 *//*lgwind*/
var Button = [
    'Translation', 'http://dict.youdao.com/w/{search}/#keyfrom=dict.top',
	'Baidu#ba$', 'https://www.baidu.com/s?wd={search}',
    '360搜索#360','https://www.so.com/s?q={search}',
    'Bing搜索#bi','https://cn.bing.com/search?q={search}',
    '搜狗搜索#sg','http://www.sogou.com/sogou?query={search}',
    '中国搜索#zg','http://www.chinaso.com/search/pagesearch.htm?q={search}',
	'OALib图书馆','http://www.oalib.com/search?kw={search}',
	'玩加竞技#w','http://www.wanplus.com/lol/search?k={search}',
	'七麦数据','https://www.qimai.cn/search/android/market/6/search/{search}',
	'国家统计局#g','http://www.stats.gov.cn/was5/web/search?channelid=288041&andsen={search}',
	'樱花动漫','https://www.295k.com/search/-------------.html?wd={search}',
	'去广告解析#qgg','https://z1.m1907.cn?jx={search}',
	'视频解析1','https://jx.parwix.com:4433/player/?url={search}',
	'布丁动漫','https://dm.budingcy.com/',
	'风之动漫','https://www.fzdm.org/',
	'人人影视','http://www.ldssz.com/',
    'PanSou搜索#pan', 'http://www.pansou.com/?q={search}',
    'Bilibili搜索#b', 'https://search.bilibili.com/all?keyword={search}',
	'Bv#bv','http://player.bilibili.com/player.html?bvid={search}',
	'Dilidili搜索#d', 'http://www.dilidili3.cc/search/-------------/?wd={search}',
    'AcFun搜索#a', 'http://www.acfun.cn/search/?#query={search}',
    'FuLiQu搜索#fl','http://www.fuliqu.com/',
	'好看视频#hk','https://haokan.baidu.com/videoui/page/search?query={search}',
	'爱奇艺视频#aqy','https://so.iqiyi.com/so/q_{search}',
	'腾讯视频#tx','https://v.qq.com/x/search/?q={search}',
	'西瓜视频#xg','https://www.ixigua.com/search/{search}/?keyword={search}',
	'央视视频#ys','https://search.cctv.com/search.php?qtext={search}&type=video',
    '百度百科#baike', 'https://baike.baidu.com/item/{search}',
    '百度图片#tupian', 'http://image.baidu.com/search/index?tn=baiduimage&fm=result&ie=utf-8&word={search}',
    //'网页翻译', 
    'CSDN搜索#csdn', 'https://so.csdn.net/so/search/s.do?q={search}',
	'慕课搜索#mk','https://www.imooc.com/search/article?words={search}',
	'思否搜索#sf','https://segmentfault.com/search?q={search}',
	'云栖搜索#yx','https://yq.aliyun.com/search?q={search}',
	'简书搜素#js','https://www.jianshu.com/search?q={search}&page=1&type=note',
	'腾讯云搜索#txy','https://cloud.tencent.com/developer/search/article-{search}',
	'知乎搜索', 'https://www.sogou.com/sogou?query={search}&insite=zhihu.com',
	'博客园搜索#bky','https://zzk.cnblogs.com/s/blogpost?w={search}',
	'51CTO博客搜索','https://blog.51cto.com/search/result?q={search}',
	'Oracle搜索#oracle','https://www.oracle.com/search/results?Ntk=SI-ALL5&Ntt={search}',
	'jar包下载#jar','https://mvnrepository.com/search?q={search}',
    'w3cshool搜索#s','https://www.w3cschool.cn/search?w={search}',
    'runoob搜索#r','http://www.runoob.com/?s={search}',
    '高德地图搜索#gd', 'https://www.amap.com/search?query={search}&city=440100&geoobj=113.299921%7C23.127141%7C113.309233%7C23.131798&zoom=17',
    '天地图搜索#tdt','http://www.tianditu.gov.cn/service/query.html?value={search}',
	'艾特网','https://iiter.cn/',
	'历史地图','https://www.ageeye.cn/search/map/{search}',
];
/*lgwind*/

var friendLink = [
    'link','{ip}/link.html',
	'bilibili', 'https://space.bilibili.com/17347104/bangumi',
	'DocTX', 'https://docs.qq.com/desktop/',
	'电视台网址大全','{ip}/module/china/index.html',
	'元素周期表','{ip}/module/elem/index.html',
	'Chat','{ip}/module/lgwindChat/index.html',
	'H5Kill','{ip}/module/H5Kill/index.html',
];

/**
 * 标题提示文字 快捷键
 *//*lgwind*/
var titleHint = 'Ctrl + F：在页面上查找'+'\n'
                +'Ctrl + H：打开历史记录面板'+'\n'
                +'Ctrl + T：新建标签页'+'\n'
                +'Ctrl + W：关闭当前标签页'+''+'\n'
                +'Ctrl + U：查看源代码'+'\n'
                +'Ctrl +加号(+)：页面缩放比例增加25%'+'\n'
                +'Ctrl +减号(-)：页面缩放比例减小25%'+'\n'
                +'Ctrl + Shift + R：进入阅读模式(需要网页提供支持)'+'\n'
                +'Ctrl + Shift + T：打开上次关闭的页面'+'\n'
                +'Ctrl + Shift + M：进入Web笔记功能'+'\n'
                +'Ctrl + Shift + F：切换输入法简繁体'+'\n'
                +'Ctrl + Shift + Delete：清缓存'+'\n'
                +'Shift + 空格键：切换全角半角输入'+'\n'
                +'Shift + win + enter / F11: 全屏'+'\n'
				+'Shift + Alt + s : Eclipse快捷鍵（生成get、set、toString）'+'\n'
				+'CTRL + SHIFT + F : 繁体简体切换'+'\n'
				+'taskschd.msc : 打开任务计划'+'\n'
				+'Alt+5 : 打开idea控制台'+'\n'
				+'ctrl+shift+" : 控制台全屏'+'\n'
				+'win+d" : 最小化/显示 所有应用'
				
				;
/*lgwind*/

/**
 * 标题 设置点击复制文字（填配置文件地址）
 *//*lgwind*/
var title_copy_text = 'E:\\lgwind\\Myweb\\Myweb\\js\\js-var-server.js';
/*lgwind*/
