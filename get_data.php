<?php
	//get_data.php
	//获取BT资源列表
	require 'config.php';
	
	//获取每页能显示的条数page_rows和焦点,传入的数据类型是number、string的都变成了string，所以要转换
	$_page_rows = $_POST['page_rows'];
	$_Focus = $_POST['Focus'];
	
	$_start = ($_page_rows+0) * ($_Focus+0 - 1);
	
	$query = mysql_query("SELECT textuser,title,kes,time,id FROM project_user ORDER BY id DESC LIMIT {$_start},{$_page_rows}")or die('SQL错误！');
	
	//$_length = mysql_num_rows(mysql_query("SELECT * FROM project_user"));
	//$query = mysql_query("SELECT title,kes,time FROM project_user LIMIT 0,{$_length}")or die('SQL错误！');
	//print_r(mysql_fetch_array($query,MYSQL_ASSOC));
	
	$json = '';
	 
	// 将php内容转换成json格式，json_encode,逗号，最后一个逗号删掉
	while  (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	
	echo '['.substr($json, 0 , strlen($json) - 1).']';
	
	mysql_close();
?>