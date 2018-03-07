<?php
	//add_share.php
	//echo 'wwww.baidu.com';
	//print_r($_POST);
	//返回前端用post提交的内容
	
	require'config.php'; //链接到config.php
	error_reporting(0);
	
	$_user = $_POST['user'];
	$_key = $_POST['key'];
	$_title = $_POST['title'];
	$_descrip = $_POST['description'];
	$_time = $_POST['time'];

	$query = mysql_query("UPDATE project_user SET kes = '{$_key}' WHERE textuser='{$_user}'") or die('SQL错误');
	$query = mysql_query("UPDATE project_user SET title = '{$_title}' WHERE textuser='{$_user}'") or die('SQL错误');
	$query = mysql_query("UPDATE project_user SET description = '{$_descrip}' WHERE textuser='{$_user}'") or die('SQL错误');
	$query = mysql_query("UPDATE project_user SET time = '{$_time}' WHERE textuser='{$_user}'") or die('SQL错误');
	
	
	echo mysql_affected_rows();//返回影响了几行的行数
	mysql_close();
	
	
?>