<?php
	//add_share1.php
	//echo 'wwww.baidu.com';
	//print_r($_POST);
	//返回前端用post提交的内容
	
	//链接到config.php
	require'config.php'; 
	error_reporting(0);
	
	$_user = $_POST['user'];
	$_key = $_POST['key'];
	$_title = $_POST['title'];
	$_descrip = $_POST['description'];
	$_time = $_POST['time'];
	$query ="INSERT INTO project_user (textuser, kes, title, description, time)
						VALUES ('{$_user}','{$_key}','{$_title}','{$_descrip}','{$_time}')";
	
	@mysql_query($query) or die('新增错误：'.mysql_error());
						
	/*
	//问题在于不能同一个id进行多个share。改进版在上
	$_user = $_POST['user'];
	$_key = $_POST['key'];
	$_title = $_POST['title'];
	$_descrip = $_POST['description'];
	$_time = $_POST['time'];

	$query = mysql_query("UPDATE project_user SET kes = '{$_key}' WHERE user='{$_user}'") or die('SQL错误');
	$query = mysql_query("UPDATE project_user SET title = '{$_title}' WHERE user='{$_user}'") or die('SQL错误');
	$query = mysql_query("UPDATE project_user SET description = '{$_descrip}' WHERE user='{$_user}'") or die('SQL错误');
	$query = mysql_query("UPDATE project_user SET time = '{$_time}' WHERE user='{$_user}'") or die('SQL错误');
	*/
	
	/*
	//下面的这种方法不行，暂时只会逐个改
	$query = mysql_query("UPDATE project_user SET kes = '{$_key}' AND SET title = '{$_title}' AND SET description = '{$_descrip}'
			WHERE user='{$_user}'") or die('SQL错误');
	*/
	
	/*				
	$query = "INSERT INTO blog_user (user, pass, ans, ques, email, birthday, ps) 
			VALUES ('{$_POST['user']}', sha1('{$_POST['pass']}'), '{$_POST['ans']}', '{$_POST['ques']}', '{$_POST['email']}','{$_birthday}','{$_POST['ps']}')";
	*/
	
	
	//返回影响了几行的行数 
	echo mysql_affected_rows();
	mysql_close();
?>