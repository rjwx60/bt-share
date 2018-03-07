<?php
	//is_user.php
	require'config.php';
	
	//在新增之前，要判断用户名是否重复
	$query = mysql_query("SELECT user FROM project_user WHERE user='{$_POST['user']}'") or die('SQL错误');
	//如果查找到便返回1
	if (mysql_fetch_array($query,MYSQL_ASSOC)) {
		echo 1;
	}
	mysql_close();
?>