// JavaScript Document
//regsuccess.html

//regsuccess.js功能几乎与前面的一致，可以去除


$(function(){
	//注册/登录/提交 触摸改变动画
	$('#Signup').hover(function(){
		$(this).animate({
			step:2,
			mul:{
				o:80
			}
		});
	},function(){
		$(this).animate({
			step:2,
			mul:{
				o:100
			}
		});
	});
	//登录
	$('#Signin').hover(function(){
		$(this).animate({
			step:1,
			mul:{
				o:90
			}
		});
	},function(){
		$(this).animate({
			step:1,
			mul:{
				o:100
			}
		});
	});
});