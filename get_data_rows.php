<?php
	//get_data_rows.php
	//获取数据库总行数
	require 'config.php';
	
	//$query = mysql_query("SELECT title,content,date FROM blog_blog ORDER BY date DESC LIMIT 0, 3")or die('SQL错误！');
	
	// $json = '';
	
	// 将php内容转换成json格式，json_encode,逗号，最后一个逗号删掉
	// while  (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
	// 		$json .= json_encode($row).',';
	// }
	
	// echo '['.substr($json, 0 , strlen($json) - 1).']';
	
	$query = mysql_query("SELECT * FROM project_user")or die('SQL错误！');
	echo  mysql_num_rows($query);
	mysql_close();
?>