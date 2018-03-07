// JavaScript Document


/*	index为页面打开后的默认界面, 本网站页面流程是
		默认页面：也就是主页 index.html
		登录页面：			 login.html
		注册页面：			 regsitration.html
		注册成功显示页面：	 regsuccess.html
		还有一个是分享页面： share.html


*/



$(document).ready(function(){

	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part
	////////////////////////////////////////////////////////////////////////////////public part

	//标题 “Bit Keys Share” 变色
	$("#head h3 a").hover(function(){
		$(this).css("color","#76EE00");
	},function(){
		$(this).css("color","white");
	});

	//注册
	$("#Signup a").hover(function(){
		$(this).animate({opacity:'1'},"fast");
	},function(){
		$(this).animate({opacity:'0.9'},"fast");
	});

	//登录
	$("#Signin a").hover(function(){
		$(this).animate({opacity:'1'},"fast");
	},function(){
		$(this).animate({opacity:'0.9'},"fast");
	});

	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part
	////////////////////////////////////////////////////////////////////////////////login & index & share public part

	//注册和登录界面没有登出按钮，只能用户登出的情况下才能注册新用户
	if($("#body h2").attr("id") != "registrationhtml" && $("#body h2").attr("id") != "signinhtml" && $("#body h2").attr("id") != "regsuccesshtml" ){
		//顶部登出按钮
		$("#Signout").hover(function(){
			$(this).animate({opacity:'0.9'},"fast");
		},function(){
			$(this).animate({opacity:'1'},"fast");
		});
		

		//顶部用户按钮
		$("#Myaccount").hover(function(){
			$(this).animate({opacity:'0.9'},"fast");
		},function(){
			$(this).animate({opacity:'1'},"fast");
		});
	}

	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part
	////////////////////////////////////////////////////////////////////////////////login & registration & share public part

	//唯有不是index的页面才有提交按钮
	if($("body h2").attr("id") != "indexhtml" && $("#body h2").attr("id") != "regsuccesshtml" ){

		//提交按钮
		$('#sub').hover(function(){
			$(this).animate({opacity:'0.9'},"fast");
		},function(){
			$(this).animate({opacity:'1'},"fast");
		});

		//光标事件
		setTimeout(function(){

			if($("#body h2").attr("id") == "registrationhtml" || $("#body h2").attr("id") == "signinhtml"){
				$("form input[name='user']").focus();
			}

			if($("#body h2").attr("id") == "sharehtml"){
				$("form input[name='key']").focus();
			}
			
		},200);


		//上下键使光标上下移 和黏贴文本文字提示消失
		var keydown_time = 0;
		$("form .Inpdiv input").bind("keydown",function(ev){
			
			var arry = "undefined";
			switch($("#body h2").attr("id")){
				case "signinhtml" : arry = ["user","password"];break;
				case "registrationhtml" :  arry = ["user","email","password","repassword"];break;
				case "sharehtml" :  arry = ["key","title"];break;
				default: console.log("error");
			}

			if(ev.keyCode == 40){

				//阻止下拉菜单这一默认事件
				ev.preventDefault();

				keydown_time +=1;
				$("form input[name="+arry[keydown_time%arry.length]+"]").bind("focus");

			}else if(ev.keyCode == 38){

				keydown_time -=1;
				$("form input[name="+arry[keydown_time%arry.length]+"]").bind("focus");

			}
			if(ev.keyCode == 17){
				
				$(this).prev().hide();
				
			}	
		});

		//去除提交按钮的outline
		$("#sub").bind("mousedown",function(){
			$(this).css("outline","none");
		});
		//点击输入文字才消失提示，离开重新显示提示的效果
		$("form .Inpdiv input").bind("keypress",function(){
			$(this).prev().hide();
		});
		$("form .Inpdiv input").bind("blur",function(){
			if( $(this).attr("value").replace(/(^\s*)|(\s*$)/g,'') == ""){
				$(this).prev().show();
				$("#Form strong").css("display","none");
			}
		});
	}
	
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	////////////////////////////////////////////////////////////////////////////////index & share public part
	
	if($("body h2").attr("id") == "indexhtml" || $("#body h2").attr("id") == "sharehtml"){

		if(window.name == ""){
			$("#Signin a").css("display","block");
			$("#Signup a").css("display","block");
			
			$("#Signout a").css("display","none");
			$("#Myaccount a").css("display","none");
			
		}else{
			$("#Signin a").css("display","none");
			$("#Signup a").css("display","none");
			$("#Signout a").css("display","block");
			$("#Myaccount a").css("display","block").html("MyAccount("+ window.name +")");
			
			if($("#body h2").attr("id") == "sharehtml"){
				$("#sub a").attr("href","index.html");
			}else{
				$("#mShare a").attr("href","share.html");
			}
		}
		
		$("#Signout").click(function(){
			window.name = "";
			
			
			$("#Signout a").css("display","none");
			$("#Myaccount a").css("display","none");
			$("#Signin a").css("display","block");
			$("#Signup a").css("display","block");
		});
	}

	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part
	////////////////////////////////////////////////////////////////////////////////index part

	if($("body h2:eq(0)").attr("id") == "indexhtml"){

		/*	初始化Bt资源列表，获取存储再服务器中的数据并显示，控制每页显示的数目，建立底部导航条，通过导航条控制显示的内容  */

		//每页显示的行数
		var page_rows = 5;
		
		$.ajax({

			async : true, //true为异步, false为同步, 默认异步,所以这里其实可以不写

			type : "post",
			url : "get_data.php",
			data:{
				"page_rows":page_rows,
				"Focus":1
			},
			success : function (text) {
				
				//JSON.parse()方法解析一个JSON字符串.构造由字符串描述的JavaScript值或对象.
				//可以考虑用jQuery.parseJSON()代替
				//jQuery.parseJSON()方法用于将格式完好的JSON字符串转为与之对应的JS对象.所谓“格式完好“指的是指定字符串必须符合严格的JSON格式,否则会抛出一个JS异常

				var json = JSON.parse(text);

				//构建表单标题

				var html = "<tr><th>Title</th><th>Key</th><th>Description</th><th>Shared on</th><th>Replay</th></tr>";

				//将服务器中的数据 逐格逐行 填入到表单中

				for (var i = 0; i < json.length; i++) {
					if(json[i].kes == " ")
					{
						html +="";
					}
					else{
						html += "<tr><td><p class='firp'>"+json[i].title+"</p></td><td><p class='secp'>"+json[i].kes+"</p></td><td><div class='descrip'><p style='display:none'>"+json[i].textuser+"</p><a href='javascript:;'>Show more</a><p style='display:none'>"+json[i].id+"</p></div></td><td><p class='thip'>"+json[i].time+"</p></td><td><div class='replay'><p style='display:none'>"+json[i].textuser+"</p><a href='javascript:;''>Replay</a><p style='display:none'>"+json[i].id+"</p></div></td></tr>";
					}
				}

				//添加到DOM树结构中

				$("#tab").html(html);

				showDescrip();
				showReplay();

				//动画显示表单

				for (var i = 0; i < json.length; i++) {

					$("#tab .firp:eq("+i+")").animate({opacity:'1'},"fast");
					$("#tab .secp:eq("+i+")").animate({opacity:'1'},"fast");
					$("#tab .thip:eq("+i+")").animate({opacity:'1'},"fast");

					$("#tab .descrip a:eq("+i+")").animate({opacity:'1'},"fast");
					$("#tab .replay a:eq("+i+")").animate({opacity:'1'},"fast");
				}
			 }



		 });

		
		/*	构建底部导航条  */

		//获取数据库总行数
		$.ajax({
			type : "post",
			url : "get_data_rows.php",
			data:{},
			success : function (text) {
				$("#List").attr("data_rows",text);
			}
		});

		//体会：设置定时器是为了让服务器获取足够的数据???不知道获取数目是否耗时, 但若耗时，

		//等待200毫秒$.ajax后得到数据库总行数，初始化Bt资源列表，控制每页显示的数目，通过底部的导航条控制显示的内容

		setTimeout(function(){
			if($("#List").attr("data_rows")){

				//创建list,  last = 从数据库中拿到的总行数 / 每张页面允许显示的行数 Math.ceil()
				var last = Math.ceil(parseInt($("#List").attr("data_rows"))/page_rows);
				var start = 1;
				var row = 3;

				//初始化表单宽高

				creatList(start,last,row);  
			}
		},200);
		

		//建立导航条


		//存储焦点，初始值是1
		var Focus = 1;	
		function creatList(start,last,row){

			//两种显示模式，以页数8为界限, 如果总页数小于8便隐藏Next和Last选项, 直接上数字显示
			if(last<=8){
				$("#Next").hide();
				$("#Last").hide();
				row = last;
			}

			var html = "";
			for(start;start<=last;start++){
				html +="<li>"+ start +"</li>";
			}
			$("#list").html(html);
			
			//不管采取怎样的方法Math.ceil Math.floor Math.round，都会有问题，因为小数部分的余隙会累积
			//之前出现的问题在于list宽度不够，但是如果list宽度刻意加多便会有留空，于是将每一个li宽度固定并加到list的总宽度中
			
			//固定每一个显示的li的宽(简单粗暴)
			for(var j=0;j<row;j++){
				$("#list li:eq("+j+")").css("width","26px").css("padding","0 8px");
			}
			$("#list li").css("text-align","center");
			
			var list_width = (parseFloat($("#list li").css("width")) + parseFloat($("#list li").css("padding-left"))*2)*row;
			var list_height = parseFloat($("#list li").css("height"));
			
			$("#list").css("width",list_width+"px");
			$("#list").css("height",list_height+"px");
			
			//为导航条添加触摸效果
			$("#list li").hover(function(){
				$(this).animate({opacity:'0.8'},"fast");
			},function(){
				$(this).animate({opacity:'1'},"fast");
			});
				
					
			//为导航条添加点击事件
			//加在creatList函数内部是每次生成新的li都要为其加事件，如果放在外部便只有第一次生成的li加外部已经存在的li可以触发

			$("#List li").click(function(){

				if(/first/i.test($(this).html())){ 
					$("#First").hide();
					$("#Previous").hide();
					creatList(1,last,3);
					$("#Next").show();
					$("#Last").show();
					Focus = 1;
				}
				else if(/last/i.test($(this).html())){ 
					$("#First").show();
					$("#Previous").show();
					creatList(last-2,last,3);
					$("#Next").hide();
					$("#Last").hide();
					Focus = last;
				}
				else if(/previous/i.test($(this).html())){
					Focus-=1;
					changeList( Focus ,last);
				}
				else if(/next/i.test($(this).html())){
					Focus+=1;
					changeList( Focus ,last);
				}
				else{
					changeList(parseInt($(this).html()),last);
					Focus = parseInt($(this).html());
				}


				$.ajax({
					type : "post",
					url : "get_data.php",
					data:{
						"page_rows":page_rows,
						"Focus":Focus
					},
					success : function (text) {
						var json = JSON.parse(text);
						var html = "<tr><th>Title</th><th>Key</th><th>Description</th><th>Shared on</th><th>Replay</th></tr>";
						for (var i = 0; i < json.length; i ++) {
							if(json[i].kes == ""){
								html +="";
							}
							else{
								html += "<tr><td><p class='firp'>"+json[i].title+"</p></td><td><p class='secp'>"+json[i].kes+"</p></td><td><div class='descrip'><p style='display:none'>"+json[i].textuser+"</p><a href='javascript:;'>Show more</a><p style='display:none'>"+json[i].id+"</p></div></td><td><p class='thip'>"+json[i].time+"</p></td><td><div class='replay'><p style='display:none'>"+json[i].textuser+"</p><a href='javascript:;'>Replay</a><p style='display:none'>"+json[i].id+"</p></div></td></tr>";
							}
						}

						$("#tab").html(html);

						showDescrip();
						showReplay();

						for (var i = 0; i < json.length; i ++) {

							$("#tab .firp:eq("+i+")").animate({opacity:'1'},"fast");
							$("#tab .secp:eq("+i+")").animate({opacity:'1'},"fast");
							$("#tab .thip:eq("+i+")").animate({opacity:'1'},"fast");

							$("#tab .descrip a:eq("+i+")").animate({opacity:'1'},"fast");
							$("#tab .replay a:eq("+i+")").animate({opacity:'1'},"fast");
						}
						
					}

				});

				
			});
		}
		
		function changeList(new_num,last){
			if(last<8){
				$("#First").hide();
				$("#Previous").hide();
				creatList(1,last,7);
				$("#Next").hide();
				$("#Last").hide();
			}else{
				if(new_num == 1){
					$("#First").hide();
					$("#Previous").hide();
					creatList(1,last,3);
					$("#Next").show();
					$("#Last").show();
					Focus = 1;
				}
				else if(new_num == 2){
					$("#Previous").show();
					creatList(1,last,4);
				}
				else if( new_num == 3){
					$("#First").hide();
					$("#Previous").show();
					creatList(new_num-2,last,5);
				}
				else{
					$("#First").show();
					$("#Previous").show();
					if(last == new_num){
						$("#First").show();
						$("#Previous").show();
						creatList(last-2,last,3);
						$("#Next").hide();
						$("#Last").hide();
						Focus = last;
					}
					else if(last - new_num == 1){
						$("#Next").show();
						creatList(new_num-2,last,4);
					}
					else if(last - new_num == 2){
						creatList(new_num-2,last,5);
					}
					else{
						$("#Last").show();
						creatList(new_num-2,last,5);
					}
				}
			}
			
		}
		
		testReplay();
		//检测输入回复框的数字
		function testReplay(){
			$("#relpay_show_text").bind("keyup",function(){
				$("#replay_show_p span").html( $(this).attr("value").length );
				if($("#relpay_show_text").attr("value").replace(/(^\s*)|(\s*$)/g,'') == ""){
					$("#replay_show_p span").html(200);
				}
				if($(this).attr("value").length >200){
					$("#replay_show_p span").css("color","red");
				}else{
					$("#replay_show_p span").css("color","white");
				}
			});
		}
		function showDescrip(){
			$(".descrip a").click(function(){

				var usr = $(this).prev().html();
				$.ajax({
					type : "post",
					url : "get_data_descrip.php",
					data:{
						"user":$(this).prev().html(),
						"id":$(this).next().html()
					},
					success : function (text) {
						var json = JSON.parse(text);

						$("#descrip_show").css({"left":"400px","top":"200px"}).show();

						$("#descrip_show p").html(json[0].description);
						$("#descrip_show span").html( usr +" share on "+ json[0].time);
					}
				});
				

				$("#descrip_show a").click(function(){
					$("#descrip_show").hide();
				});
			});
		}
		
		function showReplay(){
			$("#relpay_show_text").attr("value","");
			$(".replay a").click(function(){

				var usr = $(this).prev().html();
				var id = $(this).next().html();
					$.ajax({
						type : "post",
						url : "get_data_replay.php",
						data:{
							"id":$(this).next().html()
						},
						success : function (text) {
							var json = JSON.parse(text);


							if( (json[0].replay).split("&Ta&il&").length == 1 ){
								$("#replay_list").css({"padding":"0px","height":"0px"});
							 	$("#replay_show").css({"left":"400px","top":"200px"}).show();
							}else{
								$("#replay_list").css({"padding":"30px","height":"320px"});
								$("#replay_show").css({"left":"400px","top":"200px"}).show();
							
								var html = "";
								var array = [];
								array = (json[0].replay).split("&Ta&il&");
								//alert(array.length);  匹配不到的情况下这里为1
								
								for(var i=array.length-2;i>=0;i--){
									var array_li = array[i].split("&A&Z&");
									html += "<li class='replay_list_li'><p>"+ array_li[1] +"</p><span class='replay_list_message'>"+array_li[0]+" replay on "+ array_li[2] +"</span></li>";
								}
								$("#replay_list").html(html);

								//运动效果
								for(var i=0;i<=array.length-2;i++){
									$("#replay_list li:eq("+i+")").animate({opacity:"1"},"slow");
								}
							}
						}
					});

				addReplay(id);
				
				$("#replay_show a").click(function(){
					$("#replay_show").hide();
					$("#replay_show_p span").html(200);
				});
			});
		}
		
		function addReplay(id){

			$("#relpay_show_sub").click(function(){
				//alert(usr);
				if((window.name).replace(/(^\s*)|(\s*$)/g,'') == ""){
					alert("Log in before you can reply.");
					$("#relpay_show_text").attr("value","");
					$("#replay_show").hide();
				}else{
					if($("#relpay_show_text").attr("value").replace(/(^\s*)|(\s*$)/g,'') == ""){
						alert("Please fill in the contents of the reply");
					}else if( $("#relpay_show_text").attr("value").length>200 ){
						alert("The input content exceeds the word limit");
					}else{
						//设置行末标志码Code和中间码code
						var str_code = "&A&Z&";
						var str_Code = "&Ta&il&";
						var str_content = $("#relpay_show_text").attr("value");
						var time = new Date();
						var str_time = time.getFullYear() + "-" + (time.getMonth()+1)+ "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes()+ ":" + time.getSeconds();
						
						//将要上传的字符串为操作的用户+code+内容+code+回复时间+Code
						var str_replay = window.name + str_code + str_content + str_code + str_time + str_Code;
						$.ajax({
							type : "post",
							url : "add_replay.php",
							data:{
								"replay":str_replay,
								"id":id
							},
							success : function (text) {
								$("#relpay_show_text").attr("value","");
								
								$("#replay_list").css({"padding":"30px","height":"320px"});
								var old_html = $("#replay_list").html();
								var add_html ="<li class='replay_list_li'><p>"+ str_content +"</p><span class='replay_list_message'>"+window.name+" replay on "+ str_time +"</span></li>";
								$("#replay_list").html(add_html+old_html);

								$("#replay_list li p:eq(0)").css("height","0px");
								$("#replay_list li p:eq(0)").css("opacity","0");
								$("#replay_list li p:eq(0)").animate({height:"80px",opacity:"1"},40);			  
							}

						});
					}
				}
			});
		}
	
	}

	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part
	////////////////////////////////////////////////////////////////////////////////login in part

	if($("#body h2").attr("id") == "signinhtml"){
		//登录检测（与数据库里的内容比较检测）
		$("#LogForm input[name='sub']").click(function () {
			//如果用户名合法并且密码长度必须大于等于6
			if (/[\w]{6,20}/.test($("#LogForm input[name='user']").attr("value").replace(/(^\s*)|(\s*$)/g,'')) && $("#LogForm input[name='password']").attr("value").length >= 6) {
				var _this = this;
				_this.disabled = true;

				$.ajax({
					type : "post",
					url : "is_login.php",
					data : $("#LogForm").serialize(),
					success : function (text) {
						_this.disabled = false;
						
						if (text == 0){
							alert("登录失败，用户名或密码不正确！");
						} else {
							window.name = $("#LogForm input[name='user']").attr("value");
							
							$(".Inpdiv input").attr("value","");	
							$(".Inpdiv span").show();
							window.location.href="index.html";				
						}
					}
				});
				
			} else {
				alert("登录失败，用户名或密码不合法！");
			}
		});
		
		function onload(){
			var win = $("#frame").contentWindow;
			win.postMessage("form login.html","*");
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part
	////////////////////////////////////////////////////////////////////////////////registration part

	if($("#body h2").attr("id") == "registrationhtml"){
		//用户名判断
		$("#RegForm input[name='user']").bind("blur",function(){
			//如果不为空
			if($(this).attr("value").replace(/(^\s*)|(\s*$)/g,'') != "" && check_user()){
				$("#user_strong").css("display","none");
			}
		});

		function check_user() {
			var flag = true;
			//如果格式不正确便立马退出
			if (!/[\w]{6,20}/.test($("#RegForm input[name='user']").attr("value").replace(/(^\s*)|(\s*$)/g,''))) {
				$("#user_strong").css("display","block").html("2The username field must be at least 6 characters in length");
				return false;
			} else {
				$("#user_strong").css("display","none");
				$.ajax({
					type : "post",
					url : "is_user.php",
					data : $("#RegForm").serialize(),
					success : function (text) {
						if (text == 1) {
							$("#user_strong").css("display","block").html("2The username has been used!!");
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
		$("#RegForm input[name='password']").bind("blur", function () {
			if ( $(this).attr("value").length >= 1 && $(this).attr("value").length < 6) {
				$("#password_strong").css("display","block").html("2The password field must be at least 6 characters in length");
			} else {
				$("#password_strong").css("display","none");
			}
		});
		
		//密码重输
		$("#RegForm input[name='repassword']").bind("blur", function () {
			if ($(this).attr("value").replace(/(^\s*)|(\s*$)/g,'') != "" && check_notpass()) {
				$("#repassword_strong").css("display","none");
			} else if( $(this).attr("value").replace(/(^\s*)|(\s*$)/g,'') != "" ){
				$("#repassword_strong").css("display","block").html("2The password Confirmation field is required.");
			}
		});
		//密码确认
		function check_notpass() {
			if ($("#RegForm input[name='password']").attr("value").replace(/(^\s*)|(\s*$)/g,'') == $("#RegForm input[name='repassword']").attr("value").replace(/(^\s*)|(\s*$)/g,'')) return true;
		}
		
		//电子邮件
		$("#RegForm input[name='email']").bind("blur", function () {
			if ($(this).attr("value").replace(/(^\s*)|(\s*$)/g,'') != "" && check_email()) {
				$("#email_strong").css("display","none");
			} else if( $(this).attr("value").replace(/(^\s*)|(\s*$)/g,'') != " "){
				$("#email_strong").css("display","block").html("2The email field must contain a valid email address");
			}
		});
		//邮件检测
		function check_email() {
			if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($("#RegForm input[name='email']").attr("value").replace(/(^\s*)|(\s*$)/g,''))) return true;
			else return false;
		}
		
		//提交表单
		//双重保护?
		$("#RegForm input[name='sub']").click(function () {
			var flag = true;
			if (!check_user()) {
				$("#user_strong").css("display","block").html("2The username has been used!");
				flag = false;
			}
			
			if (!check_notpass()) {
				$("#password_strong").css("display","block").html("2The password Confirmation field is required");
				flag = false;
			}
			if (!check_email()) {
				$("#email_strong").css("display","block").html("2The email field must contain a valid email address.");
				flag = false;
			}
			if (flag) {
				//提交表单
				var _this = this;
				$.ajax({
					type:"post",
					url:"add.php",
					data:$("#RegForm").serialize(),	
					success : function (text) {
						if (text == 1) {
							window.location.href="regsuccess.html";
						}
					},
					async:true
				});
			}
			
		});
	}


	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part
	////////////////////////////////////////////////////////////////////////////////share part

	if($("#body h2").attr("id") == "sharehtml"){

		//share输入判断,key判断
		$("#ShrForm input[name='key']").bind("blur",function(){
			var _this = $(this).attr("value").replace(/(^\s*)|(\s*$)/g,'');
			check_key(_this);
		});
		function check_key(_this){
			if ( _this !=" "){
				if( /[A-Z0-9]{2,40}/.test(_this) ){
					$("#key_strong").css("display","none");
					return true;
				}else{
					$("#key_strong").css("display","block");
					$("#key_strong").html("Illegal characters appear or not enough length!");
					return false;
				}
			}
		}
		//share输入判断,title判断
		$("#ShrForm input[name='title']").bind("blur",function(){
			var _this = $(this).attr("value").replace(/(^\s*)|(\s*$)/g,'');
			check_title(_this);
		});
		function check_title(_this){
			if ( _this !="" && _this.length <=200 && _this.length >=2 ){
				if( /[\w\W\b]+/.test(_this) ){
					$("#title_strong").css("display","none");
					return true;
				}else{
					$("#title_strong").css("display","block");
					$("#title_strong").html("Illegal characters appear!");
					return false;
				}
			}
		}
		//share输入判断,description判断
		$("#ShrForm textarea[name='description']").bind("blur",function(){
			var _this = $(this).attr("value").replace(/(^\s*)|(\s*$)/g,'');
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
		$("#ShrForm input[name='sub']").click(function () {
			
			var _key = $("#ShrForm input[name='key']").attr("value").replace(/(^\s*)|(\s*$)/g,'');
			console.log(_key);
			var _title = $("#ShrForm input[name='title']").attr("value").replace(/(^\s*)|(\s*$)/g,'');
			var _description = $("#ShrForm textarea[name='description']").attr("value").replace(/(^\s*)|(\s*$)/g,'');
			
			if ( _key !="" && check_key(_key) ){
				if( _title !="" && check_title(_title) ){
					if( check_description(_description) ){
						
						//设置用户名和时间
						if((window.name).replace(/(^\s*)|(\s*$)/g,'') != ""){
							
							$("#ShrForm input[name='user']").attr("value",(window.name).replace(/(^\s*)|(\s*$)/g,''));
							
							var time = new Date();
							var str = time.getFullYear() + "-" + (time.getMonth()+1)+ "-" + time.getDate() + "-" + time.getHours() + "-" + time.getMinutes()+ "-" + time.getSeconds();
							$("#ShrForm input[name='time']").attr("value",str);
							
							//判断kes有无内容，若无便更新即可，若有便新建
							$.ajax({
								type:"post",
								url:"get_data_share.php",
								data:{
									"user":$("#ShrForm input[name='user']").attr("value")
								},
								success : function (text) {
									var json = JSON.parse(text);
									
									if(json[0].kes == ""){
										$.ajax({
											type:"post",
											url:"add_share.php",
											data:$("#ShrForm").serialize(),	
											success : function (text) {
												window.location.href="index.html";
											},
											async:true
										});
									}else{
										$.ajax({
											type:"post",
											url:"add_share1.php",
											data:$("#ShrForm").serialize(),	
											success : function (text) {
												window.location.href="index.html";
											},
											async:true
										});
									}
								},
								async:true
							});
						}else{
							$("#ShrForm input[name='user']").attr("attr","Unknow");
							
							var time = new Date();

							var str = time.getFullYear() + "-" + (time.getMonth()+1)+ "-" + time.getDate() + "-" + time.getHours() + "-" + time.getMinutes()+ "-" + time.getSeconds();
							$("#ShrForm input[name='time']").attr("value",str);
							
							$.ajax({
								type:"post",
								url:"add_share1.php",
								data:$("#ShrForm").serialize(),	
								success : function (text) {
									window.location.href="index.html";
								},
								async:true
							});
						}
					}
				}else{
					$("#title_strong").css("display","block");
					$("#title_strong").html("Can not be empty and the length of 2-200!");
				}
			}else{
				$("#key_strong").css("display","block");
				$("#key_strong").html("The keystring field is required.");
			}
				
		});
		
	}


});