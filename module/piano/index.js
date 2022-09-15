//# sourceURL=index.js

$(function(){	
	$play.loadState();	
	$draw.drawWhiteBtn();
	$draw.drawBlackBtn();
	$draw.drawMusicList();
	//显示按钮状态
	$draw.showBtnState();
});

/**
 * 页面大小固定
 */
function bodyScale() {
    var devicewidth = document.documentElement.clientWidth;
    var scale = devicewidth / 1368;  // 分母——设计稿的尺寸
    document.body.style.zoom = scale;
}
window.onload = window.onresize = function () {
    bodyScale();
};