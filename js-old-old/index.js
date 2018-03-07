// JavaScript Document


/*	index为页面打开后的默认界面, 本网站页面流程是
		默认页面：也就是主页 index.html
		登录页面：			 login.html
		注册页面：			 regsitration.html
		注册成功显示页面：	 regsuccess.html
		还有一个是分享页面： share.html

		他们均有的为S “Sign in” & “Sign up” 和 “BitKeys Share”
*/

//index.js
$(function(){
	//标题变色
	$('#head h3 a').hover(function(){
		$(this).css('color','#76EE00');
	},function(){
		$(this).css('color','white');
	});

	/*
	//注册/登录/提交 触摸改变动画
	//注册
	$('#Signup a').hover(function(){
		$(this).changeColor('#f5b043','#f5b043','#FFB90F',50);
	},function(){
		$(this).changeColor('#FFB90F','#FFB90F','#f5b043',50);
	});
	//登录
	$('#Signin a').hover(function(){
		$(this).changeColor('#1dccaa','#1dccaa','#3CB371',50);
	},function(){
		$(this).changeColor('#3CB371','#3CB371','#1dccaa',50);
	});
	*/


	//注册/登录/提交 触摸改变动画

	//注册
	$('#Signup a').hover(function(){
		$(this).animate({
			step:1,
			mul:{
				o:100
			}
		});
	},function(){
		$(this).animate({
			step:1,
			mul:{
				o:90
			}
		});
	});

	//登录
	$('#Signin a').hover(function(){
		$(this).animate({
			step:1,
			mul:{
				o:100
			}
		});
	},function(){
		$(this).animate({
			step:1,
			mul:{
				o:90
			}
		});
	});



	//顶部登出按钮
	$('#Signout').hover(function(){
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
	
	//顶部用户按钮
	$('#Myaccount').hover(function(){
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
	//下方共享按钮
	$('#mShare').hover(function(){
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
	//下方注册按钮
	$('#mSign').hover(function(){
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
	//导航条
	$('#List li').hover(function(){
		$(this).animate({
			step:1,
			mul:{
				o:80
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
	
	
	
	
	if(window.name == ''){
		$('#Signin a').css('display','block');
		$('#Signup a').css('display','block');
		
		$('#Signout a').css('display','none');
		$('#Myaccount a').css('display','none');
		
//		$('#mShare a').attr('href','javascript:;').click(function(){
//			alert('Please registered or log in first.')
//		})
		
	}else{
		$('#Signin a').css('display','none');
		$('#Signup a').css('display','none');
		$('#Signout a').css('display','block');
		$('#Myaccount a').css('display','block').html('MyAccount('+ window.name +')');
		
		$('#mShare a').attr('href','share.html');
		
	}
	
	$('#Signout').click(function(){
		window.name = '';
	
		$('#Signout a').css('display','none');
		$('#Myaccount a').css('display','none');
		$('#Signin a').css('display','block');
		$('#Signup a').css('display','block');
	});
	
	//每页显示的行数
	var page_rows = 5;
	
	//初始化Bt资源列表，控制每页显示的数目，通过底部的导航条控制显示的内容
	ajax({
		method : 'post',
		url : 'get_data.php',
		data:{
			//'page_rows':$('form').form('page_rows').value(page_rows),
			//'Focus':$('form').form('Focus').value()
			'page_rows':page_rows,
			'Focus':1
		},
		success : function (text) {
			//alert(typeof text);
			var json = JSON.parse(text);
			var html = '<tr><th>Title</th><th>Key</th><th>Description</th><th>Shared on</th><th>Replay</th></tr>';
			for (var i = 0; i < json.length; i++) {
				if(json[i].kes == ''){
					html +='';
				}
				else{
					html += '<tr><td><p class="firp">'+json[i].title+'</p></td><td><p class="secp">'+json[i].kes+'</p></td><td><div class="descrip"><p style="display:none">'+json[i].textuser+'</p><a href="javascript:;">Show more</a><p style="display:none">'+json[i].id+'</p></div></td><td><p class="thip">'+json[i].time+'</p></td><td><div class="replay"><p style="display:none">'+json[i].textuser+'</p><a href="javascript:;">Replay</a><p style="display:none">'+json[i].id+'</p></div></td></tr>';
				}
			}
			$('#tab').html(html);
			showDescrip();
			showReplay();
			for (var i = 0; i < json.length; i ++) {
				$('#tab .firp').eq(i).animate({
					attr : 'o',
					target : 100,
					t : 70,
				});
				$('#tab .secp').eq(i).animate({
					attr : 'o',
					target : 100,
					t : 80,
				});
				$('#tab .descrip a').eq(i).animate({
					attr : 'o',
					target : 100,
					t : 90,
				});
				$('#tab .thip').eq(i).animate({
					attr : 'o',
					target : 100,
					t : 100,
				});
				$('#tab .replay a').eq(i).animate({
					attr : 'o',
					target : 100,
					t : 100,
				});
				
			}
		 },
		 async : true
	 });

	

	//构建导航条
	//获取数据库总行数
	ajax({
		method : 'post',
		url : 'get_data_rows.php',
		//data : {},
		//传统方法：一个一个的提交，造成大量的冗余，
		data:{},
		success : function (text) {
			$('#List').attr('data_rows',text);
		},
		async : true
	});
	//等待200毫秒ajax后得到数据库总行数，初始化Bt资源列表，控制每页显示的数目，通过底部的导航条控制显示的内容
	setTimeout(function(){
		if($('#List').attr('data_rows')){
			//创建list,last = 从数据库中拿到的总行数 / 每张页面允许显示的行数 Math.ceil()
			var last = Math.ceil(parseInt($('#List').attr('data_rows'))/page_rows);
			var start = 1;
			var row = 3;
			creatList(start,last,row);  //初始化宽高
		}
	},200);
	
	//存储焦点，初始值是1
	var Focus = 1;	
	function creatList(start,last,row){
		//两种显示模式，以页数8为界限
		if(last<=8){
			$('#Next').hide();
			$('#Last').hide();
			row = last;
		}
		var html = '';
		for(start;start<=last;start++){
			html +='<li>'+ start +'</li>';
		}
		$('#list').html(html);
		
		//不管采取怎样的方法Math.ceil Math.floor Math.round，都会有问题，因为小数部分的余隙会累积
		//之前出现的问题在于list宽度不够，但是如果list宽度刻意加多便会有留空，于是将每一个li宽度固定并加到list的总宽度中
		
		//固定每一个显示的li的宽(简单粗暴)
		for(var j=0;j<row;j++){
			$('#list li').eq(j).css('width','26px').css('padding','0 8px');
		}
		$('#list li').css('text-align','center');
		
		var list_width = (parseFloat($('#list li').css('width')) + parseFloat($('#list li').css('padding-left'))*2)*row;
		var list_height = parseFloat($('#list li').css('height'));
		
		$('#list').css('width',list_width+'px');
		$('#list').css('height',list_height+'px');
		
		//为导航条添加触摸效果
		$('#list li').hover(function(){
		$(this).animate({
			step:1,
			mul:{
				o:80
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
			
				
		//为导航条添加点击事件
		//加在creatList函数内部是每次生成新的li都要为其加事件，如果放在外部便只有第一次生成的li加外部已经存在的li可以触发
		$('#List li').click(function(){
			//alert(Focus);
			//alert(typeof NaN) = number
			//alert(parseInt($(this).html()))
			if(/first/i.test($(this).html())){ 
				$('#First').hide();
				$('#Previous').hide();
				creatList(1,last,3);
				$('#Next').show();
				$('#Last').show();
				Focus = 1;
			}
			else if(/last/i.test($(this).html())){ 
				$('#First').show();
				$('#Previous').show();
				creatList(last-2,last,3);
				$('#Next').hide();
				$('#Last').hide();
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
			//alert(page_rows)
			//alert(Focus)
			ajax({
				method : 'post',
				url : 'get_data.php',
				data:{
					'page_rows':page_rows,
					'Focus':Focus
				},
				success : function (text) {
					var json = JSON.parse(text);
					var html = '<tr><th>Title</th><th>Key</th><th>Description</th><th>Shared on</th><th>Replay</th></tr>';
					for (var i = 0; i < json.length; i ++) {
						if(json[i].kes == ''){
							html +='';
						}
						else{
							html += '<tr><td><p class="firp">'+json[i].title+'</p></td><td><p class="secp">'+json[i].kes+'</p></td><td><div class="descrip"><p style="display:none">'+json[i].textuser+'</p><a href="javascript:;">Show more</a><p style="display:none">'+json[i].id+'</p></div></td><td><p class="thip">'+json[i].time+'</p></td><td><div class="replay"><p style="display:none">'+json[i].textuser+'</p><a href="javascript:;">Replay</a><p style="display:none">'+json[i].id+'</p></div></td></tr>';
						}
					}
					$('#tab').html(html);
					showDescrip();
					showReplay();
					for (var i = 0; i < json.length; i ++) {
						$('#tab .firp').eq(i).animate({
							attr : 'o',
							target : 100,
							t : 60,
						});
						$('#tab .secp').eq(i).animate({
							attr : 'o',
							target : 100,
							t : 70,
						});
						$('#tab .descrip a').eq(i).animate({
							attr : 'o',
							target : 100,
							t : 80,
						});
						$('#tab .thip').eq(i).animate({
							attr : 'o',
							target : 100,
							t : 90,
						});
						$('#tab .replay a').eq(i).animate({
							attr : 'o',
							target : 100,
							t : 100,
						});
					}
					
				},
				async : true
			});
			
		});
	}
	
	function changeList(new_num,last){
		if(last<8){
			$('#First').hide();
			$('#Previous').hide();
			creatList(1,last,7);
			$('#Next').hide();
			$('#Last').hide();
		}else{
			if(new_num == 1){
				$('#First').hide();
				$('#Previous').hide();
				creatList(1,last,3);
				$('#Next').show();
				$('#Last').show();
				Focus = 1;
			}
			else if(new_num == 2){
				$('#Previous').show();
				creatList(1,last,4);
			}
			else if( new_num == 3){
				$('#First').hide();
				$('#Previous').show();
				creatList(new_num-2,last,5);
			}
			else{
				$('#First').show();
				$('#Previous').show();
				if(last == new_num){
					$('#First').show();
					$('#Previous').show();
					creatList(last-2,last,3);
					$('#Next').hide();
					$('#Last').hide();
					Focus = last;
				}
				else if(last - new_num == 1){
					$('#Next').show();
					creatList(new_num-2,last,4);
				}
				else if(last - new_num == 2){
					creatList(new_num-2,last,5);
				}
				else{
					$('#Last').show();
					creatList(new_num-2,last,5);
				}
			}
		}
		
	}
	
	testReplay();
	//检测输入回复框的数字
	function testReplay(){
		$('#relpay_show_text').bind('keyup',function(){
			$('#replay_show_p span').html( $(this).value().length );
			if(trim($('#relpay_show_text').value()) == ''){
				$('#replay_show_p span').html(200);
			}
			if($(this).value().length >200){
				$('#replay_show_p span').css('color','red');
			}else{
				$('#replay_show_p span').css('color','white');
			}
		});
	}
	function showDescrip(){
		$('.descrip a').click(function(){
			//alert($(this).next().html())
			//alert($(this).prev().html())
			//$('#descrip_show p').html($(this).prev().html());
			var usr = $(this).prev().html();
			ajax({
				method : 'post',
				url : 'get_data_descrip.php',
				data:{
					'user':$(this).prev().html(),
					'id':$(this).next().html()
				},
				success : function (text) {
					var json = JSON.parse(text);
					$('#descrip_show').center(500,100).show();
					$('#descrip_show p').html(json[0].description);
					$('#descrip_show span').html( usr +' share on '+ json[0].time);
				},
				async : true
			});
			
			$('#descrip_show a').click(function(){
				$('#descrip_show').hide();
			});
		});
	}
	
	function showReplay(){
		$('#relpay_show_text').value('');
		$('.replay a').click(function(){
			//alert($(this).prev().html())
			//alert($(this).next().html())
			var usr = $(this).prev().html();
			var id = $(this).next().html();
				ajax({
					method : 'post',
					url : 'get_data_replay.php',
					data:{
						'id':$(this).next().html()
					},
					success : function (text) {
						var json = JSON.parse(text);
						//alert(text);
						//alert(json[0].replay == null);
						if( (json[0].replay).split("&Ta&il&").length == 1 ){
							$('#replay_list').css('padding','0px').css('height','0px');
						 	$('#replay_show').center(500,300).show();
						}else{
							$('#replay_list').css('padding','16px').css('height','300px');
							$('#replay_show').center(500,300).show();
						
							var html = '';
							var array = [];
							array = (json[0].replay).split("&Ta&il&");
							//alert(array.length);  匹配不到的情况下这里为1
							
							for(var i=array.length-2;i>=0;i--){
								var array_li = array[i].split("&A&Z&");
								html += '<li class="replay_list_li"><p>'+ array_li[1] +'</p><span class="replay_list_message">'+array_li[0]+' replay on '+ array_li[2] +'</span></li>';
							}
							$('#replay_list').html(html);
							//运动效果
							for(var i=0;i<=array.length-2;i++){
								$('#replay_list li').eq(i).animate({
									attr : 'o',
									start:0,
									target : 100,
									t : 100,
								});
							}
						}
					},
					async : true
				});
			addReplay(id);
			
			$('#replay_show a').click(function(){
				$('#replay_show').hide();
				$('#replay_show_p span').html(200);
			});
		});
	}
	
	function addReplay(id){
		$('#relpay_show_sub').click(function(){
			//alert(usr);
			if(trim(window.name)==''){
				alert('Log in before you can reply.');
				$('#relpay_show_text').value('');
				$('#replay_show').hide();
			}else{
				if(trim($('#relpay_show_text').value()) == ''){
					alert('Please fill in the contents of the reply');
				}else if( $('#relpay_show_text').value().length>200 ){
					alert('The input content exceeds the word limit');
				}else{
					//设置行末标志码Code和中间码code
					var str_code = '&A&Z&';
					var str_Code = '&Ta&il&';
					var str_content = $('#relpay_show_text').value();
					var time = new Date();
					var str_time = time.getFullYear() + '-' + (time.getMonth()+1)+ '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()+ ':' + time.getSeconds();
					
					//将要上传的字符串为操作的用户+code+内容+code+回复时间+Code
					var str_replay = window.name + str_code + str_content + str_code + str_time + str_Code;
					ajax({
						method : 'post',
						url : 'add_replay.php',
						//data : {},
						//传统方法：一个一个的提交，造成大量的冗余
						data:{
							//'user':usr,
							'replay':str_replay,
							'id':id
						},
						success : function (text) {
							$('#relpay_show_text').value('');
							
							$('#replay_list').css('padding','16px').css('height','300px');
							var old_html = $('#replay_list').html();
							var add_html ='<li class="replay_list_li"><p>'+ str_content +'</p><span class="replay_list_message">'+window.name+' replay on '+ str_time +'</span></li>';
							$('#replay_list').html(add_html+old_html);
							
							//alert($('#replay_list li').eq(0).html())
							$('#replay_list li p').eq(0).css('height','0px');
							$('#replay_list li p').eq(0).css('opacity',0);
							$('#replay_list li p').eq(0).animate({
								start:0,
								t:40,
								step:20,
								mul:{
									o:100,
									h:80
								}
							});		
								       
						},
						async : true
					});
				}
			}
		});
	}
	
//	//初始化Bt资源列表，控制每页显示的数目，通过底部的导航条控制显示的内容
//	 ajax({
//		 method : 'post',
//		 url : 'get_data.php',
//		 data : {},
////传统方法：一个一个的提交，造成大量的冗余，
////		data:{
////			'name':$('form').form('user').value(),
////			'pass':$('form').form('pass').value()
////		},
//		 success : function (text) {
//			 var json = JSON.parse(text);
//			 var html = '';
//			 for (var i = 0; i < json.length; i ++) {
//				 html += '<div class="content"><h2>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
//			 }
//			 $('#index').html(html);
//			 for (var i = 0; i < json.length; i ++) {
//				 $('#index .content').eq(i).animate({
//					 attr : 'o',
//					 target : 100,
//					 t : 30,
//					 step : 10
//				 });
//			 }
//		 },
//		 async : true
//	 });
	 
	 
});