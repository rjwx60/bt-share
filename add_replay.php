<?php
	//add_replay.php
	
	//print_r($_POST);
	//返回前端用post提交的内容
	
	//链接到config.php
	require'config.php'; 
	error_reporting(0);
	
	$_user = $_POST['user'];
	$_replay = $_POST['replay'];
	$_id = $_POST['id'];
	
	//以追加的方式为mysql某字段添加字符串
	$query = mysql_query("UPDATE project_user SET replay = CONCAT(replay,'{$_replay}') WHERE id='{$_id}' ") or die('SQL错误');
	
	
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