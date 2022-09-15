//# sourceURL=link.js
$(function(){
	window.onresize = function () {
    	bodyScale();
   	};
   	bodyScale();
   	/**
	 * 页面大小固定
	 */
	function bodyScale() {
	    var devicewidth = document.documentElement.clientWidth;
	    var scale = devicewidth / 1349;  // 分母——设计稿的尺寸	
	    if(document.documentElement.clientWidth/document.documentElement.clientHeight<1.8) {
	    	var scale = document.documentElement.clientHeight / 666;
	    	$(".sou").css("width", "100px");
	    	$(".menu").css("padding-right", "4px");
	    }
	    document.body.style.zoom = scale;
	}
});