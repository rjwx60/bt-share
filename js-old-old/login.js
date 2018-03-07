// JavaScript Document
//login.js

$(function(){
	//注册/登录/提交 触摸改变动画
	$('#Signup a').hover(function(){
		$(this).animate({
			step:2,
			mul:{
				o:90
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
	$('#Signin a').hover(function(){
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








	//提交
	$('#sub').hover(function(){
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
	
	//光标事件
	setTimeout(function(){
		$('form').form('user').Focus();
	},200);
	//上下键使光标上下移 和黏贴文本文字提示消失
	var keydown_time = 0;
	$('form .Inpdiv input').bind('keydown',function(ev){
		
		var arry = "undefined";
		switch($('#body h2').attr('id')){
			case "signinhtml" : arry = ['user','password'];break;
			case "registrationhtml" :  arry = ['user','email','password','repassword'];break;
			case "sharehtml" :  arry = ['key','title'];break;
			default: alert("error");
		}
		//arry = ['user','password'];
		
		
		if(ev.keyCode == 40){
			//阻止下拉菜单这一默认事件
			//必须加在这里面不然每次按键都会清除默认事件导致把有用的事件清除
			//只加在"按下"的事件上，即只会把"按下"这一事件的默认事件清除
			ev.preventDefault();
			
			keydown_time +=1;
			$('form').form(arry[keydown_time%arry.length]).Focus();
			

		}else if(ev.keyCode == 38){
			
			keydown_time -=1;
			$('form').form(arry[keydown_time%arry.length]).Focus();
			

		}
		if(ev.keyCode == 17){
			//$(this).unBind('keydown',function(ev){})
			$(this).prev().hide();
			//BIFHJ7GHEB7WJVOLYP5EVILJ4NDLVMNBV
		}	
	});
	
	//去除提交按钮的outline
	$('#sub').bind('mousedown',function(){
		$(this).css('outline','none');
	});
	//点击输入文字才消失提示，离开重新显示提示的效果
	$('form .Inpdiv input').bind('keypress',function(){
		$(this).prev().hide();
	});
	$('form .Inpdiv input').bind('blur',function(){
		if( trim($(this).value()) == ''){
			$(this).prev().show();
		}
	});
	


	
	

	//登录检测（与数据库里的内容比较检测）
	$('#LogForm').form('sub').click(function () {
		//如果用户名合法并且密码长度必须大于等于6
		if (/[\w]{6,20}/.test(trim($('#LogForm').form('user').value())) && $('#LogForm').form('password').value().length >= 6) {
			var _this = this;
			_this.disabled = true;

			ajax({
				method : 'post',
				url : 'is_login.php',
				data : $('#LogForm').serialize(),
				success : function (text) {
					_this.disabled = false;
					
					if (text == 0) {//失败
						alert('登录失败，用户名或密码不正确！');
					} else {//成功
						window.name = $('#LogForm').form('user').value();
						
						$('.Inpdiv input').value('');	
						$('.Inpdiv span').show();
						window.location.href='index.html';				
					}
				},
				async : true
			});
			
		} else {
			alert('登录失败，用户名或密码不合法！');
		}
	});
	
	function onload(){
		var win = $('#frame').contentWindow;
		win.postMessage('form login.html','*');
	}
	
});