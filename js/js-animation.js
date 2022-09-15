/**
 * 鼠标特效
 */
$(function(){
	//
	//addPlayers(8);
});

/** 对象模板 */
var menuModel = new Array("①","②","③","④",'⑤','⑥','⑦','⑧','⑨','⑩');
var menuIndex = 0;

/**
 * 获取显示元素
 * @param {Object} e 点击对象 
 */
function getMenu(e) {
	var $menu = "";
	var x = e.pageX, y = e.pageY;
}



/* 鼠标特效 */
//var ani_idx = 0;
//var menu = []; //记录的菜单数组
//var ani = [];
//jQuery(document).ready(function($) {
//  $("html1").click(function(e) {
//  	var aniTemp = ani.length==0? new Array("①","②","③","④",'⑤','⑥','⑦','⑧','⑨','⑩'): $.extend(true,[],ani);
//      var $i = $("<span></span>").text(aniTemp[ani_idx]);
//      ani_idx = (ani_idx + 1) % aniTemp.length;
//      var x = e.pageX, y = e.pageY;
//      if(menu.length>=aniTemp.length && menu.length>500) {
//      	menu[0].remove();
//      	menu.splice(0,1);//删除第一个元素
//      }
//      menu[menu.length] = $i;
//      $i.css({
//          "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
//          "top": y - 20,
//          "left": x,
//          "position": "absolute",
//          "font-weight": "bold",
//          "color": "rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"
//      });
//      $("body").append($i);
//      animation(x, y, $i);
//  });
//});
//
///**
// * 对象移动
// * @param {Object} x x轴位置
// * @param {Object} y y轴位置
// * @param {Object} elem
// * @param {Object} leftChange
// * @param {Object} topChange
// */
//function animation(x, y, elem, leftChange, topChange) {
//	var leftChange = leftChange?leftChange:Math.random()*200-100;
//	var topChange = topChange?topChange:Math.random()*200-100;
//	//更改x轴移动方向
//	if(x==0) {
//		leftChange = Math.abs(leftChange);
//	}else if(x==document.body.offsetWidth-25) {
//		leftChange = -Math.abs(leftChange);
//	}
//	//更改y轴移动方向
//	if(y==0) {
//		topChange = Math.abs(topChange);		
//	}else if(y==window.screen.availHeight-25) {
//		topChange = -Math.abs(topChange);
//	}
//	//设置x轴的移动范围
//	if(x + leftChange<0) {
//		x=0;
//		leftChange=0;
//	}else if(x + leftChange > document.body.offsetWidth-25) {
//		x=document.body.offsetWidth-25;
//		leftChange=0;
//	}
//	//设置y轴的移动范围
//	if(y + topChange<0) {
//		y=0;
//		topChange=0;
//	}else if(y + topChange > window.screen.availHeight -25) {
//		y=window.screen.availHeight -25;
//		topChange=0;
//	}
//	
//  elem.animate(
//  	{
//          "top": y + topChange,
//          "left": x + leftChange,
//          "opacity": 0.8 //不透明级别
//  	},//css样式
//  	Math.sqrt(topChange*topChange+leftChange*leftChange)*4,//速度
//  	function() {
//      	animation(x+leftChange, y+topChange, elem, leftChange, topChange);
//  	}
//  );      	
//}
