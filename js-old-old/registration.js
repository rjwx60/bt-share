// JavaScript Document
//registration.js
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
			$('#Form strong').css('display','none');
		}
	});
	
	//用户名判断
	$('form').form('user').bind('blur',function(){
		//如果不为空
		if(trim($(this).value()) != '' && check_user()){
			$('#user_strong').css('display','none');
		}
	});
	function check_user() {
		var flag = true;
		//如果格式不正确便立马退出
		if (!/[\w]{6,20}/.test(trim($('form').form('user').value()))) {
			$('#user_strong').css('display','block').html('2The username field must be at least 6 characters in length');
			return false;
		} else {
			$('#user_strong').css('display','none');
			ajax({
				method : 'post',
				url : 'is_user.php',
				data : $('form').serialize(),
				success : function (text) {
					if (text == 1) {
						$('#user_strong').css('display','block').html('2The username has been used!!');
						flag = false;
					} else {
						flag = true;
					}
				},
				async : false
			});
		}
		return flag;
	}
	
	//密码
	$('form').form('password').bind('blur', function () {
		if ( $(this).value().length >= 1 && $(this).value().length < 6) {
			$('#password_strong').css('display','block').html('2The password field must be at least 6 characters in length');
		} else {
			$('#password_strong').css('display','none');
		}
	});
	
	//密码重输
	$('form').form('repassword').bind('blur', function () {
		if (trim($(this).value()) != '' && check_notpass()) {
			$('#repassword_strong').css('display','none');
		} else if( trim($(this).value()) != '' ){
			$('#repassword_strong').css('display','block').html('2The password Confirmation field is required.');
		}
	});
	//密码确认
	function check_notpass() {
		if (trim($('form').form('password').value()) == trim($('form').form('repassword').value())) return true;
	}
	
	//电子邮件
	$('form').form('email').bind('blur', function () {
		if (trim($(this).value()) != '' && check_email()) {
			$('#email_strong').css('display','none');
		} else if( trim($(this).value()) != '' ){
			$('#email_strong').css('display','block').html('2The email field must contain a valid email address');
		}
	});
	//邮件检测
	function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) return true;
		else return false;
	}
	
	//提交表单
	//双重保护?
	$('form').form('sub').click(function () {
		var flag = true;
		if (!check_user()) {
			$('#user_strong').css('display','block').html('2The username has been used!');
			flag = false;
		}
		
		if (!check_notpass()) {
			$('#password_strong').css('display','block').html('2The password Confirmation field is required');
			flag = false;
		}
		if (!check_email()) {
			$('#email_strong').css('display','block').html('2The email field must contain a valid email address.');
			flag = false;
		}
		if (flag) {
//			//提交表单
			var _this = this;
			ajax({
				method:'post',
				url:'add.php',
				//新方法：不管任何表单，只要将data传给函数serialize就可以
				data:$('form').serialize(),	
				success : function (text) {
					if (text == 1) {
						window.location.href='regsuccess.html';
						//window.open('regsuccess.html');
					}
				},
				async:true
			});
		}
		
	});
	
});