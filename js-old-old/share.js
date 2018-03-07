// JavaScript Document
//share.js
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
		$('form').form('key').Focus();
	},200);
	//上下键使光标上下移 和黏贴文本文字提示消失
	var keydown_time = 0;
	$('form .Inpdiv input').bind('keydown',function(ev){
		
		var arry = ['key','title'];
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
	
	
	if(window.name == ''){
		$('#Signin a').css('display','block');
		$('#Signup a').css('display','block');
		
		$('#Signout a').css('display','none');
		$('#Myaccount a').css('display','none');
		
//		$('#sub').attr('href','javascript:;').click(function(){
//			alert('Please registered or log in first.')
//		})
		
	}else{
		$('#Signin a').css('display','none');
		$('#Signup a').css('display','none');
		$('#Signout a').css('display','block');
		$('#Myaccount a').css('display','block').html('MyAccount('+ window.name +')');
		
		$('#sub a').attr('href','index.html');
	}
	
	$('#Signout').click(function(){
		window.name = '';
		
		
		$('#Signout a').css('display','none');
		$('#Myaccount a').css('display','none');
		$('#Signin a').css('display','block');
		$('#Signup a').css('display','block');
	});
	
	//share输入判断,key判断
	$('#ShrForm').form('key').bind('blur',function(){
		var _this = trim($(this).value());
		check_key(_this);
	});
	function check_key(_this){
		if ( _this !='' ){
			if( /[A-Z0-9]{2,40}/.test(_this) ){
				$('#key_strong').css('display','none');
				return true;
			}else{
				$('#key_strong').css('display','block');
				$('#key_strong').html("Illegal characters appear or not enough length!");
				return false;
			}
		}
	}
	//share输入判断,title判断
	$('#ShrForm').form('title').bind('blur',function(){
		var _this = trim($(this).value());
		check_title(_this);
	});
	function check_title(_this){
		if ( _this !='' && _this.length <=200 && _this.length >=2 ){
			if( /[\w\W\b]+/.test(_this) ){
				$('#title_strong').css('display','none');
				return true;
			}else{
				$('#title_strong').css('display','block');
				$('#title_strong').html("Illegal characters appear!");
				return false;
			}
		}
	}
	//share输入判断,description判断
	$('#ShrForm').form('description').bind('blur',function(){
		var _this = trim($(this).value());
		check_description(_this);
	});
	function check_description(_this){
		if(  /[\w\W\b]+/.test(_this) )return true;
		else {
			alert("Description illegal characters appear!");
			return false;
		}
	}
	
	//share表单提交
	$('#ShrForm').form('sub').click(function () {
		
		var _key = trim($('#ShrForm').form('key').value());
		var _title = trim($('#ShrForm').form('title').value());
		var _description = trim($('#ShrForm').form('description').value());
		
		if ( _key !='' && check_key(_key) ){
			if( _title !='' && check_title(_title) ){
				if( check_description(_description) ){
					
					//设置用户名和时间
					if(trim(window.name) != ''){
						
						$('#ShrForm').form('user').value(trim(window.name));
						
						var time = new Date();
						var str = time.getFullYear() + '-' + (time.getMonth()+1)+ '-' + time.getDate() + '-' + time.getHours() + '-' + time.getMinutes()+ '-' + time.getSeconds();
						$('#ShrForm').form('time').value(str);
						
						//判断kes有无内容，若无便更新即可，若有便新建
						ajax({
							method:'post',
							url:'get_data_share.php',
							//新方法：不管任何表单，只要将data传给函数serialize就可以
							//data:$('form').serialize(),
							data:{
								'user':$('#ShrForm').form('user').value()
							},
							success : function (text) {
								var json = JSON.parse(text);
								
								if(json[0].kes == ''){
									ajax({
										method:'post',
										url:'add_share.php',
										data:$('#ShrForm').serialize(),	
										success : function (text) {
											window.location.href='index.html';
										},
										async:true
									});
								}else{
									ajax({
										method:'post',
										url:'add_share1.php',
										data:$('#ShrForm').serialize(),	
										success : function (text) {
											window.location.href='index.html';
										},
										async:true
									});
								}
							},
							async:true
						});
					}else{
						$('#ShrForm').form('user').value('Unknow');
						
						var time = new Date();
						var str = time.getFullYear() + '-' + (time.getMonth()+1)+ '-' + time.getDate() + '-' + time.getHours() + '-' + time.getMinutes()+ '-' + time.getSeconds();
						$('#ShrForm').form('time').value(str);
						
						ajax({
							method:'post',
							url:'add_share1.php',
							data:$('#ShrForm').serialize(),	
							success : function (text) {
								window.location.href='index.html';
							},
							async:true
						});
					}
					//////////////////
					//description不做判断
				}
			}else{
				$('#title_strong').css('display','block');
				$('#title_strong').html("Can not be empty and the length of 2-200!");
			}
		}else{
			$('#key_strong').css('display','block');
			$('#key_strong').html("The keystring field is required.");
		}
			
	});
	
	
});