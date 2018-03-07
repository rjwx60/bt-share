<?php
	//get_data_replay.php
	//获取博文列表
	require 'config.php';
	
	//$_user = $_POST['user'];
	$_id = $_POST['id'];
	
	$query = mysql_query("SELECT replay FROM project_user WHERE id='{$_id}' ")or die('SQL错误！');
	
	//print_r(mysql_fetch_array($query,MYSQL_ASSOC));
	
	$json = '';
	
	// 将php内容转换成json格式，json_encode,逗号，最后一个逗号删掉
	while  (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	
	echo '['.substr($json, 0 , strlen($json) - 1).']';
	
	mysql_close();
?>