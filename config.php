<?php
	//config.php
	header('Content-Type:text/html; charset=utf-8');

	define('DB_HOST','localhost');//连接地址
	define('DB_USER','root');		//管理员用户名
	define('DB_PWD','123456');		//管理员登入数据库密码
	define('DB_NAME','project1');		//数据库名称
	
	//$conn = mysql_connect(DB_HOST,DB_USER,DB_PWD);
	$conn = @mysql_connect(DB_HOST,DB_USER) or die('数据库连接失败:'.mysql_error());
	
	//指定当前数据库
	@mysql_select_db(DB_NAME)or die('数据库错误：'.mysql_error()); 		
	//指定当前数据库字符集
	@mysql_query('SET NAMES UTF8')or die('字符集错误：'.mysql_error());
	
	//若没有错误便是连接成功
?>