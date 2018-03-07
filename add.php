<?php
	//add.php
	//echo 'wwww.baidu.com';
	//print_r($_POST);
	//返回前端用post提交的内容
	
	require'config.php'; //链接到config.php
	error_reporting(0);
	
	$_user = $_POST['user'];
	$_password = $_POST['password'];
	$_email = $_POST['email'];

	
	$query ="INSERT INTO project_user (user, textuser, email, pass)
						VALUES ('{$_user}','{$_user}','{$_email}',sha1('{$_password}'))";
	/*				
	$query = "INSERT INTO blog_user (user, pass, ans, ques, email, birthday, ps) 
						VALUES ('{$_POST['user']}', sha1('{$_POST['pass']}'), '{$_POST['ans']}', '{$_POST['ques']}', '{$_POST['email']}', '{$_birthday}', '{$_POST['ps']}')";
	*/
	
	@mysql_query($query) or die('新增错误：'.mysql_error());
	
	//睡眠3秒钟:服务器停留3秒钟才返回
	//sleep(1.5);
	echo mysql_affected_rows();//返回影响了几行的行数
	mysql_close();
	
	
?>