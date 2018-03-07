<?php
	//is_login.php
	//判断用户名和密码
	require 'config.php';
	
	$_user = $_POST['user'];
	$_pass = sha1($_POST['password']);
	
	
	$query = mysql_query("SELECT user FROM project_user WHERE user='{$_user}' AND pass='{$_pass}'") or die('SQL错误！');
	
	if (!mysql_fetch_array($query, MYSQL_ASSOC)) { //用户名和密码不正确返回0	
		echo 0;
	}else{			//用户名和密码正确返回1
		
		echo 1;
	}
	mysql_close();
?>