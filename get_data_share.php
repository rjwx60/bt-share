<?php
	//get_data_share.php
	//获取博文列表
	require 'config.php';
	
	$_user = $_POST['user'];
	
	$query = mysql_query("SELECT kes FROM project_user WHERE user='{$_user}'")or die('SQL错误！');
	
	//print_r(mysql_fetch_array($query,MYSQL_ASSOC));
	
	$json = '';
	
	// 将php内容转换成json格式，json_encode,逗号，最后一个逗号删掉
	while  (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	
	echo '['.substr($json, 0 , strlen($json) - 1).']';
	
	mysql_close();
?>