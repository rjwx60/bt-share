/*  
	使用表单序列化，可以解决多次表单获取键值对的功能。
	表单序列化的几个要求：

	关于表单序列化的文章具体看JS高级设计教程
	1.不发送禁用的表单字段；
	2.只发送勾选的复选框和单选按钮；
	3.不发送type是reset、submit、file和button以及字段集；
	4.多选选择框中的每个选中的值单独一个条目；
	5.对于<select>，如果有value值，就指定为value作为发送的值。如果没有，就指定text值。
*/
//表单序列化
$().extend('serialize', function () {
	for (var i = 0; i < this.elements.length; i ++) {
		var parts = {};
		var field = null;
		var form = this.elements[i];
		
		for (var i = 0; i < form.elements.length; i ++) {
			field = form.elements[i];
			
			switch (field.type) {
				//下拉菜单
				case 'select-one' : 
				case 'select-multiple' : 
					for (var j = 0; j < field.options.length; j++) {
						var option = field.options[j];
						if (option.selected) {
							var optValue = '';
							if (option.hasAttribute) {//标准
								optValue = (option.hasAttribute('value') ? option.value : option.text);
							} else {//IE
								optValue = (option.attributes['value'].specified ? option.value : option.text);
							}
							parts[field.name] = optValue;
						}
					}
					break;
				case undefined : 
				case 'file' : 
				case 'submit' : 
				case 'reset' : 
				case 'button' : 
					break;
				case 'radio' : 
				case 'checkbox' : 
					if (!field.checked) {
						break;
					}
				default : 
					parts[field.name] = field.value;
			}
		}
		return parts;
	}
	return this;
});