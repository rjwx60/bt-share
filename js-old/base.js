//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//前台调用
var $ = function(args){
	return new Base(args);
};

//基础库
function Base(args){
	this.elements = [];
	//预处理——判断
	if(typeof args == "string"){
		//如果有空格那么indexOf的值为-1，
		//CSS模拟(精细查找)
		if (args.indexOf(' ') != -1) {		
			//把节点拆开分别保存到数组
			var elements = args.split(' ');
			var childElements = [];	//中转站代替this.elements[],防覆盖	
			var node = [];			//用来存放父节点	
			for (var i = 0; i < elements.length; i ++) {
				if (node.length == 0) {
					node.push(document);
				}
				switch (elements[i].charAt(0)) {
					case '#' :
						childElements = [];  		//清理掉临时节点以便父节点失效子节点有效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;		//保存父节点，因为childElements要清理，所以要另外保存
						break;
					case '.' : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getClass(elements[i].substring(1), node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;	//保存父节点，因为childElements要清理，所以要另外保存
						break;
					default : 
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getTagName(elements[i], node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
					node = childElements;		//保存父节点，因为childElements要清理，所以要另外保存
				}	
			}
			//思路1：node是保存循环遍历中的父节点，而真正交上去的是childElements子节点
			this.elements = childElements;
		
		//如果没有空格执行find模式
		} else {
			//find模拟(粗略查找)
			switch (args.charAt(0)) {
				case '#' :
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.' : 
					this.elements = this.getClass(args.substring(1));
					break;
				default : 
					this.elements = this.getTagName(args);
			}
		}
	} else if (typeof args == 'object') {
		//_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
		if (args != undefined) {    
			this.elements[0] = args;
		}
	} else if (typeof args == 'function') {
		///////////////////////********************///////////////////////
		this.ready(args);
		///////////////////////********************///////////////////////
	}
}
//思路：判断string/object/function
//		若为string，判断有无空格决定模式，无空格为find模拟，有空格为css模拟
//		css模拟用for循环一个一个判断，find模拟不用，不管是前者还是后者，做完必要的判断后交由getId、getClass、getTagName作用
//		关键是getId、getClass、getTagName的运用

//addDomLoaded
Base.prototype.ready = function (fn) {
	addDomLoaded(fn);
};


//	//设置CSS选择器子节点（用于查找某个节点下的子节点）
//	Base.prototype.find = function(str){
//		var childElements = [];
//		for (var i = 0; i < this.elements.length; i ++) {
//			switch(str.charAt(0)){
//				case '#':
//					childElements.push(this.getId(str.substring(1)));
//					break;
//				case '.':
//					/*
//					var alll = this.elements[i].getElementsByTagName('*');
//					for(var j=0;j<alll.length;j++){
//						if(alll[j].className == str.substring(1)){
//							childElement.push(alll[i]);
//						}
//					}
//					*/
//					var temps = this.getClass(str.substring(1),this.elements[i]);
//					for(var j=0;j<temps.length;j++){
//						childElements.push(temps[j])
//					}
//					break;
//					
//				default:
//					/*
//					var tags = this.elements[i].getElementsByTagName(str);
//					for(var j=0;j<tags.length;j++){
//						childElements.push(tags[j]);
//					}
//					*/
//					var temps = this.getTagName(str,this.elements[i]);
//					for(var j=0;j<temps.length;j++){
//						childElements.push(temps[j])
//					}
//			}
//		}
//		this.elements = childElements; 
//		return this;
//	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取id	
Base.prototype.getId = function(id){
	return document.getElementById(id);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取Class节点数组
Base.prototype.getClass = function(className,parentNode){
	var node = null;
	var temps = [];
	if(parentNode!=undefined){
		node = parentNode;
	}else{
		node = document;
	}
	
	var alll = node.getElementsByTagName('*');
	for(var i=0;i<alll.length;i++){
//		//下面有问题，如果前面有空格或者后面有空格会提取不到
//			if(alll[i].className == className){
//				temps.push(alll[i]);
//			}
		//升级版：用正则表达式去匹配
		if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(alll[i].className)) {
			temps.push(alll[i]);
		}
	}
	return temps;
};
//思路：如果没有传入父级节点便默认为document为父节点
//		遍历全文，关键句一是var all = node.getElementsByTagName('*');找到所有标签
//		从all[i].className所有标签中循环查找符合传入的className的那一项，正则匹配，如果符合规定的便返回true，后面同名的className会被丢弃
// 		潜在问题：无法应对1个以上的classname获取，即无法获得同时具有className1和className2..的标签
//		思路：判断传入的className是否是数组，默认不是数组的处理方法，如果是数组便分别执行，并获取所在位置标签，如果位置标签相同便返回那一个，应该比较少见

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取元素标签
Base.prototype.getTagName = function(tag,parentNode){
	var node = null;
	var temps = [];
	if(parentNode!=undefined){
		node = parentNode;
	}else{
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i=0; i<tags.length;i++){
		temps.push(tags[i]);
	}
	return temps;
};
//	思路：getTagName跟getClass类似但不用判断空格
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//添加class(原型)
//	Base.prototype.addClass = function(className){
//		for(var i=0; i<this.elements.length; i++){
//			//先正则判断，避免重复添加，只能用RegExp才能将className传递进去
//			if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
//				this.elements[i].className += ' '+  className;
//			}
//		}
//		return this;
//	}

//添加Class(新型)
Base.prototype.addClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (!hasClass(this.elements[i], className)) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};
//	思路：	先用正则判断有无className,然后在添加
//移除class
Base.prototype.removeClass = function(className){
	for(var i=0; i<this.elements.length; i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
		}
	}
	return this;
};
//	思路：	先用正则判断有无className,然后在去除，判断方法同addClass
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//设置CSS

//	Base.prototype.css = function(attr,value){
//		for(var i=0;i<this.elements.length;i++){
//			//如果传参数目为1，便返回属性的值，如果数目为2便改变属性的值
//			if(arguments.length == 1){
//	
//				//解决引入css库的获取错误的问题（将获取的值改为计算后的结果）
//				if(typeof window.getComputedStyle !='undefined'){
//					return window.getComputedStyle(this.elements[i],null)[attr];
//					}
//					else if(typeof this.elements[i].currentStyle != 'undefined'){
//						return this.elements[i].currentStyle[attr];
//					}
//				
//				}	
//
//			this.elements[i].style[attr] = value;
//			}
//		return this;
//	}
//	跨浏览器获取Style
//	function getStyle(element,attr){
//		var value;
//		if(typeof window.getComputedStyle !='undefined'){//W3C
//			value = window.getComputedStyle(element,null)[attr];
//		}
//		else if(typeof element.currentStyle != 'undefined'){//IE
//			value = element.currentStyle[attr];
//		}
//		return value;
//	};

Base.prototype.css = function (attr, value) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {
			return getStyle(this.elements[i], attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};
//设置HTML
Base.prototype.html = function(str){
	for(var i=0;i<this.elements.length;i++){
		//如果没有传入参数，那么便返回传入属性的innerHTML，否则改变innerHTML
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};
//	思路：
//		两者思路相同，均为判断传入参数的数目然后执行
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//很少用到
//	//添加link或style的CSS规则
//	Base.prototype.addRule = function(num){
//		var sheet = document.styleSheets[num];
//		if(typeof sheet.insertRule != 'undefined'){
//			sheet.insertRule(body{backgroundColor:red},0);
//		}else if(typeof sheet.addRule != 'undefined'){
//			sheet.addRule('body','background:red',0);
//		}
//		return this;
//	}

//添加link或style的CSS规则
//	Base.prototype.addRule = function(num,selectorText,cssText,position){
//		var sheet = document.styleSheets[num];
//		if(typeof sheet.insertRule != 'undefined'){
//			sheet.insertRule(selectorText + '{' + cssText +'}',position);
//		}else if(typeof sheet.addRule != 'undefined'){
//			sheet.addRule(sectorText,cssText,position);
//		}
//		return this;
//	}
Base.prototype.addRule = function (num, selectorText, cssText, position) {
	var sheet = document.styleSheets[num];
	insertRule(sheet, selectorText, cssText, position);
	return this;
};
//删除link或style的css规划
//	Base.prototype.removeRule = function(num,index){
//		var sheet = document.styleSheets[num];
//		if(typeof sheet.deleteRule != 'undefined'){
//			sheet.deleteRule(index);
//		}else if(typeof sheet.removeRule != 'undefined'){
//			sheet.removeRule(index);
//		}
//		return this;
//	}
Base.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	deleteRule(sheet, index);
	return this;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//设置显示
Base.prototype.show = function(){
	for(var i=0; i<this.elements.length;i++){
		this.elements[i].style.display = 'block';
	}
	return this;
};
//设置隐藏
Base.prototype.hide = function(){
	for(var i=0; i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
	}
	return this;
};
//设置居中
Base.prototype.center = function(width,height){
	var top = (getInner().height-height)/2 + getScroll().top;
	var left = (getInner().width-width)/2 + getScroll().left;
	for(var i=0; i<this.elements.length;i++){
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';
	}
	return this;
};
//	思路：	传入目标的宽高
//			用getInner()获取视界宽高,用getScroll()获取边界与视界的距离
//			相互结合再传值
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//触发点击事件
Base.prototype.click = function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
};
//设置鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i=0;i<this.elements.length;i++){
		//this.elements[i].onmouseover = over;
		//this.elements[i].onmouseout = out;
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
};
//触发浏览器窗口事件
//	Base.prototype.resize = function (fn) {
//		window.onresize = fn;
//		return this;
//	}

//	//触发浏览器窗口事件 下面为改动后的与视频的不同会有错
//	Base.prototype.resize = function (fn) {
//		for (var i = 0; i < this.elements.length; i ++) {
//			var element = this.elements[i];
//			addEvent(window, 'resize', function () {
//				fn();
//				if (element.offsetLeft > getInner().width - element.offsetWidth) {
//					element.style.left = getInner().width - element.offsetWidth + 'px';
//				}
//				if (element.offsetTop > getInner().height - element.offsetHeight) {
//					element.style.top = getInner().height - element.offsetHeight + 'px';
//				}
//			});
//		}
//		return this;
//	}
//触发浏览器窗口事件升级版（改动于预加载）
Base.prototype.resize = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		var element = this.elements[i];
		addEvent(window, 'resize', function () {
			fn();
			//原本的距离offsetLeft/offsetTop
			if (element.offsetLeft > getInner().width + getScroll().left  - element.offsetWidth) {
				element.style.left = getInner().width + getScroll().left  - element.offsetWidth + 'px';
			}
			if (element.offsetTop > getInner().height + getScroll().top  - element.offsetHeight) {
				element.style.top = getInner().height + getScroll().top  - element.offsetHeight + 'px';
			}
		});
	}
	return this;
};
//	思路：
//		将原resize事件进一步封装成函数利用

//	//锁屏功能
//	Base.prototype.lock = function(){
//		for(var i=0;i<this.elements.length;i++){
//			this.elements[i].style.width = getInner().width + 'px';
//			this.elements[i].style.height = getInner().height + 'px';
//			this.elements[i].style.display = 'block';
//			//隐藏滚动条
//			document.documentElement.style.overflow = 'hidden';
//			//阻止选中文本往下拉
//			addEvent(window, 'scroll', scrollTop);
//		}
//		return this;
//	}
//	Base.prototype.unlock = function(){
//		for(var i=0;i<this.elements.length;i++){
//			this.elements[i].style.display = 'none';
//			document.documentElement.style.overflow = 'auto';
//			removeEvent(window, 'scroll', scrollTop);
//		}
//		return this;
//	}

//对于拖动滚动条时，出现的各种bug进行修复，改动于预加载
//锁屏功能
//screen.lcock();
//screen.unlock();

Base.prototype.lock = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		
		//即便像下面那样讲document改为this.elements[i]但在IE下还是能够选中文本后能向下拖动无法锁定
		//于是便折中，锁定的同时获取到页面顶部的距离如果一旦有触发滚动条事件便回到原来的top值
		fixedScroll.top = getScroll().top;
		fixedScroll.left = getScroll().left;
		
		this.elements[i].style.width = getInner().width + getScroll().left + 'px';
		this.elements[i].style.height = getInner().height + getScroll().top + 'px';
		this.elements[i].style.display = 'block';
		
		//针对不用浏览器将滚动条清除
		parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'hidden' : document.documentElement.style.overflow = 'hidden';		
		
		//先前是addEvent Document,但因为范围太广导致后面的有问题，所以便缩小范围改为只对遮罩this.elements[i]加减Event
		addEvent(this.elements[i], 'selectstart', predef);
		addEvent(this.elements[i], 'mousedown', predef);
		addEvent(this.elements[i], 'mouseup', predef);
		
		addEvent(window,'scroll',fixedScroll);
	}
	return this;
};
//解屏功能
Base.prototype.unlock = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		
		this.elements[i].style.display = 'none';
		
		parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'auto' : document.documentElement.style.overflow = 'auto';	
		
		removeEvent(this.elements[i], 'selectstart', predef);
		removeEvent(this.elements[i], 'mousedown', predef);
		removeEvent(this.elements[i], 'mouseup', predef);
		
		removeEvent(window,'scroll',fixedScroll);
	}
	return this;
};
//禁止默认事件（禁止选择文本）
function predef(e) {
	e.preventDefault();
}
function fixedScroll(){
	//不让它多次触发，用定时器限制次数
	setTimeout(function(){
		//scrollTo() 方法可把内容滚动到指定的坐标。
		window.scrollTo(fixedScroll.left,fixedScroll.top);
	},100);
}
//	思路：
//		1.获取当前位置一旦触发滚动条便执行，即不允许往下滑动
//		2.设置锁屏大小并让其显示
//		3.针对不同浏览器处理滚动条
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	//运动版本3
Base.prototype.animate = function (obj) {
	for (var i = 0; i < this.elements.length; i ++) {
		var element = this.elements[i];
		//判断传入属性
		var attr = obj['attr'] == 'x' ? 'left' : 
				   obj['attr'] == 'y' ? 'top' : 
				   obj['attr'] == 'w' ? 'width' : 
				   obj['attr'] == 'h' ? 'height' :
				   obj['attr'] == 'o' ? 'opacity' : 
				   obj['attr'] != undefined ? obj['attr'] : 'left'; 
		
		//可选参数，定义起始位置、定时器循环时间、步长
		var start = obj['start'] != undefined ? obj['start'] : 					//可选，如果不选，start默认是CSS的起始位置
			attr == 'opacity' ? parseFloat(getStyle(element, attr))*100:		//若传入属性为opacity
								parseInt(getStyle(element, attr));	
								
		var t = obj['t'] != undefined ? obj['t'] : 10;							//可选，默认30毫秒执行一次
		var step = obj['step'] != undefined ? obj['step'] : 20;					//可选，默认每次运行10 (1)
		
		var alter = obj['alter'];												//可选，在不知道具体目标值的时候可用增量代替目标值，增长的量
		
		var target = obj['target'];
		//实现同时运动的json参数，如果有这个参数mul便为同步运动否则为单独运动
		var mul = obj['mul'];			
		
		var speed = obj['speed'] != undefined ? obj['speed'] : 6;							//可选，运动速度,默认速度为6
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';	//可选，运动模式选择,0表示匀速constant，1表示缓冲buffer，默认缓冲
		
		
		if (alter != undefined && target == undefined) {
			target = alter + start;
		} else if (alter == undefined && target == undefined && mul == undefined) {
			throw new Error('alter增量或target目标量必须传一个！');
		}
		
		
		
		if (start > target) step = -step;	//定义方向	
		
		if(attr == 'opacity'){
			//如果opacity有传入start。便先将css的值设为start。如果没有便用默认值
			element.style.opacity = parseInt(start)/100;   		
			element.style.filter = 'alpha(opacity=' + parseInt(start) + ')';
		}else{
			//转移到起始位置，如果没有便为CSS设置的位置
			element.style[attr] = start + 'px';	
		}
		//mul是个json,只有两个值，attr和target 
		//mul{attr:target,attr1:target1,...}
		//不管单个运动还是同步运动，都存到mul中才执行
		if (mul == undefined) {
			mul = {};
			mul[attr] = target;
		}
		
		//清除前面定时器,防止跑飞
		clearInterval(element.timer);		
		element.timer = setInterval(function () {
			
			//问题1：多个动画执行了多个列队动画，要求不管多少个动画只执行一个列队
			//问题2：多个动画差别太大无法达到目标值，因定时器提前收缩
			//解决1：不管多少个动画只提供一次列队动画的机会
			//解决2：多个动画按最后一个动画执行完毕后再情理
			
			//创建一个布尔值用以表示都执行完毕
			var flag = true;
			
			for(var i in mul){
				attr = i == 'x' ? 'left' : 
					   i == 'y' ? 'top' : 
					   i == 'w' ? 'width' : 
					   i == 'h' ? 'height' : 
					   i == 'o' ? 'opacity' : 
					   i != undefined ? i : 'left';
				target = mul[i];
				
				if (type == 'buffer') {					
					//如果为缓冲运动，每次循环便设置新的步长step，步长值会变小
					step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
											   (target - parseInt(getStyle(element, attr))) / speed;
					//根据step的正负选择向上取整或向下取整
					step = step > 0 ? Math.ceil(step) : Math.floor(step); 
				}
				
				if(attr == 'opacity'){
					//透明度运动动画
					if (step == 0) {
						setOpacity();
					} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr))*100 - target) <= step) {
						setOpacity();
					} else if (step < 0 && (parseFloat(getStyle(element, attr))*100 - target) <= Math.abs(step)) {
						setOpacity();
					} else {	
						var temp = parseFloat(getStyle(element,attr))*100;
						element.style.opacity = parseInt(temp+step)/100;
						element.style.filter = 'alpha(opacity='+ parseInt(temp+step) +')';
					}
					if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) flag = false;
					
				}else{
					//运动动画
					if (step == 0) {
						setTarget();
					} else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
						setTarget();
					} else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
						setTarget();
					} else {
						element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
					}
					if (parseInt(target) != parseInt(getStyle(element, attr))) flag = false;	
				}
			}
			//当flag为true时候，定时器停止，才执行列队动画
			if (flag) {
				clearInterval(element.timer);
				if (obj.fn != undefined) obj.fn();
			}
		}, t);
		
		function setTarget() {
			element.style[attr] = target + 'px';
		}
		function setOpacity(){
			element.style.opacity = parseInt(target)/100;
			element.style.fiter = 'alpha(opacity='+parseInt(target)+')';
		}
	}
	return this;
};
//	思路：
//		对各种输入参数进行预处理
//		开定时器，分别对透明度和非透明度进行运动
//		单次运动：mul为空；同时运动：mul不为空；链式运动：带有fn


//	function startMove(obj,json,fn){
//		//完美运动框架原理：传入各项参数，里面有for in 循环逐项循环json中的参数，循环结束停止定时器，以达到同时变化参数的效果
//		//原理补充：定时器开启，bStop为true，for in循环参数，一起变化，
//		//频率为定时器频率30ms，期间bStop经历数次false的值（同时检测json的所有参数），
//		//若一旦发现json参数其中有一个未达标的值便为false，
//		//若全部参数遍历完毕都均已达标便bStop不变为原来的true，停掉定时器，结束
//		//定时器BUG已去除
//		clearInterval(obj.time);
//		obj.time = setInterval(function(){
//			
//			var bStop = true; ////先假设代表所有的值都到达了目标值
//			
//			for(var attr in json){
//				////1. 取当前值////		
//				var iCur = 0;
//				if( attr == 'opacity'){iCur = parseInt(parseFloat(getStyle(obj,attr))*100);}
//				else{iCur = parseInt(getStyle(obj,attr));};
//				
//				////2. 算速度////
//				var iSpeed = (json[attr] - iCur)/8;
//				iSpeed=iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
//				
//				////3. 检测停止////
//				if(iCur != json[attr]){
//					bStop =false;}    ////循环过程中检测bStop的值，如果有没到目标值的便设成false
//				if(attr == 'opacity'){
//					obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';
//					obj.style.opacity = (iCur+iSpeed)/100;}
//				else{
//					obj.style[attr] = iCur + iSpeed + 'px';
//				}
//			}
//			
//			//如果全部都到了，便还是原来的true
//			if(bStop){
//				clearInterval(obj.time);
//				if(fn){fn();}
//			}
//		},30)
//	}
//	function getStyle(obj,attr){
//		if(obj.currentStyle){
//			return obj.currentStyle[attr]; //兼容IE6,7,8，可以获取filter：alpha(opacity=30);
//		}
//		else{
//			return getComputedStyle(obj,false)[attr]; //兼容标准浏览器,可以获取opacity
//		}
//	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 事件处理程序/事件侦听器:事件处理程序都以‘on’开头，故load事件的事件处理程序便为onload,click事件的便为onclick
		   分级:DOM级事件处理程序(传统)：
					1.全浏览器支持
					2.在使用的元素的作用域中运行，即this指向当前引用元素
					3.对每个事件只支持一个事件处理程序，即同名事件后者会覆盖前者				**************************
					3.btn.onclick = function(){..}/btn.onclick = null;
				DOM2级事件处理程序： 
					1.IE9及以上、FF、Chrome、Opera、Safari支持
					2.无法处理匿名函数即btn.removeEventListener('click',function(){..},false)	**************************
					3.btn.addEventListener('click',handler,false)/btn.removeEventListener('click',handler,false)
				IE事件处理程序：
					1.IE、Opera支持，其中旧版IE不能支持DOM2
					2.无法处理匿名函数即btn.detachEvent('onclick',function(){..})
					3.this指向为window，即指向错误												**************************
					4.事件要加'on'		
					5.执行事件的顺序为添加事件顺序的倒序，即执行顺序有问题						**************************
					
			事件对象：每次触发DOM上事件便会产生一个event事件对象，其包含很多信息，属性和方法
					1.全浏览器支持但方式不同
					2.DOM0：btn.onclick = function(event){..} DOM2:btn.addEventListener('click',function(event){..},false)
					3.DOM中的event:
						event.currentTarget:事件处理程序正在处理的那个元素
						event.eventPhase:当前属性1为捕获阶段2为处于目标对象上3为处于冒泡阶段调用事件处理程序
						
						event.stopPropagation():	禁止进一步的冒泡或捕获
						event.preventDefault():		阻止默认事件
						event.target:				事件的目标( !== event.currentTarget)
						event.type:					事件类型‘click’、‘mouseover’、‘mouseout’....
						
					4.IE中的event:
					
						event.cancelBubble:			设置为true便可以取消冒泡，同event.stopPropagation()
						event.returnValue:			设置为false便可以取消默认行为，同event.preventDefault()
						event.srcElement:			事件的目标，同event.target
						event.type:					事件类型‘click’、‘mouseover’、‘mouseout’....
			
			存在问题：
				1.支持同一元素的同一事件句柄可以绑定多个监听函数；														 → 用计数器
				2.W3C在同一元素的同一事件句柄上多次注册同一函数，那么第一次注册后的所有注册都被忽略	问题在于IE不会覆盖掉 → 用qual判断
				3.函数体内的this指向的应当是正在处理事件的节点（如当前正在运行事件句柄的节点）；	问题在IE this指向问题→ 用call解决
				4.监听函数的执行顺序应当是按照绑定的顺序执行；										问题在IE执行顺序问题 → 用数组存储方法解决
				5.在函数体内不用使用 event = event || window.event; 来标准化Event对象；									 → 用fixEvent整合event事件对象属性方法
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//lesson 10-12 事件绑定

//跨浏览器添加事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){ 
	
		//标准浏览器(现大部分的浏览器都标准，旧版的IE才会没有addEventListener)
		obj.addEventListener(type,fn,false);
		
	}else{
		
		//判断原先是否存在一个哈希表,没有便创建一个存放事件的哈希表(散列表)
		if(!obj.events)obj.events = {};
		
		
		//判断原先是否存在一个数组,没有便创建一个存放事件处理程序的数组
		if(!obj.events[type]){
			obj.events[type]=[];
			//把第一次的事件处理程序先储存到第一个位置上，先判断如果有传入的时候存，不传入的话就不存了
			if(obj['on'+type])obj.events[type][0]=fn;
		}
		else{
			//如果已经存在了array，用equal判断传入的fn是否与数组中的fn有相同的，如果相同便不存
			//同一个注册函数进行屏蔽不添加到数组中
			if(addEvent.equal(obj.events[type],fn)) return false;
		}
		
		//从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++]=fn;
		//执行事件处理程序
		obj['on'+type] = addEvent.exec;
		
	}
}
//  思路:判断标准还是IE，问题只在IE上有，所以标准用obj.addEventListener(type,fn,false)即可解决
//		 如果是第一次，便创立存放事件的json和存放事件处理程序的array
//		 创建json接着array存放函数，如果已经存在array，便同array里的函数一个一个对比，如果有相同便不存放
//		 第二次判断后直接存fn，外部addEvent.ID控制计数
//		 意思为假如主干有多个分支，多个addEvent()默认冒泡
//		 意思为将同一事件的存在一起，{'onclick:click[fn1,fn2,fn3,...],'onmouseover':mouseover[fn1,fn2,fn3,..]',.......}
/*
	e.g  var btn = document.getElementById('mybtn');
		 btn.addEvent("onclick",funciton(){alert(1)});
		 btn.addEvent("onclick",funciton(){alert(1)});
*/
//为每个事件分配一个计数器
addEvent.ID = 1;


//执行事件处理程序
addEvent.exec = function(event){
	var ev = event||addEvent.fixEvent(window.event);
	var es = this.events[ev.type];
	for(var i in es){
		es[i].call(this,ev);
		//fn.call(this,ev);
		//obj.onclick = fn.call(this,ev);
	}
}
//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
	for( var i in es){
		if(es[i] == fn)return true;
		
	}
	return false;
}

//整合IE event对象属性和方法 只是整合，使用还得调用
addEvent.fixEvent = function(event){
	
	event.preventDefault  = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target 		  = event.srcElement;
	
	return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
}
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}

//跨浏览器删除事件绑定
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){
		// alert(11);按照视频的发现没有结果便在此行加显示11结果每个浏览器都显示了11，IE、FF、Chrome、360……是不是版本更新了……
		obj.removeEventListener(type,fn,false);
	}else{
		if(obj.events){
			for(var i in obj.events[type]){
				if(obj.events[type][i] == fn){
					delete obj.events[type][i];
				}
			}
		}
	}
}
//注册事件，简便绑定事件方法
//设置一个绑定事件的方法
Base.prototype.bind = function (event, fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i], event, fn);
	}
	return this;
};
//注册事件，简便取消绑定事件方法
//设置一个解绑事件的方法
Base.prototype.unBind = function (event, fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		removeEvent(this.elements[i], event, fn);
	}
	return this;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	//设置点击切换方法 此版本存在计数问题（共用计数器导致乱套）
//	Base.prototype.toggle = function () {
//		for (var i = 0; i < this.elements.length; i ++) {
//			var args = arguments;
//			var count = 0;
//			addEvent(this.elements[i], 'click', function () {
//				args[count++ % args.length].call(this);
//			});
//		}
//		return this;
//	};
//设置点击切换方法 ，每个对象独立计数，用闭包的形式自我执行……
Base.prototype.toggle = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		(function (element, args) {
			var count = 0;
			addEvent(element, 'click', function () {
				args[count++ % args.length].call(this);
			});
		})(this.elements[i], arguments);
	}
	return this;
};
//	//调用
//	$('#button').toggle(function () {
//		$('#box').css('background', 'blue');
//	}, function () {
//		$('#box').css('background', 'green');
//	}, function () {
//		$('#box').css('background', 'red');
//	});


//插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
}

//获取首个节点，并返回这个节点对象
Base.prototype.first = function () {
	return this.elements[0];
};
//获取末个节点，并返回这个节点对象
Base.prototype.last = function () {
	return this.elements[this.elements.length - 1];
};
//获取首个节点，并返回Base对象，后面可接属性或方法
Base.prototype.firstpoint = function () {
	var element = this.elements[0];
	this.elements = [];
	this.elements[0] = element;
	return this;
};
//获取末个节点，并返回Base对象，后面可接属性或方法
Base.prototype.lastpoint = function () {
	var element = this.elements[this.elements.length - 1];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//获取某一个节点，返回节点对象,后面不接属性或方法
Base.prototype.ge = function (num) {	
	return this.elements[num];
};
//获取某一个节点，返回Base对象，后面可接属性或方法
Base.prototype.eq = function (num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//添加Focus事件
Base.prototype.Focus = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].focus();
	}
	return this;
};
//设置一个获取表单字段的方法
Base.prototype.form = function (name) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i] = this.elements[i][name];
	}
	return this;
};
//设置表单value内容
Base.prototype.value = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
};
//设置innerText
Base.prototype.text = function (str) {

	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return getText(this.elements[i], str);
		}
		setText(this.elements[i], str);
	}
	return this;
};
//获取一个节点数组的长度
Base.prototype.length = function () {
	return this.elements.length;
};

//跨浏览器获取text
function getText(element, text) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}

//跨浏览器设置text
function setText(element, text) {
if (typeof element.textContent == 'string') {
	element.textContent = text;
} else {
	element.innerText = text;
}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//轮播器
//获取某个节点在某组的位置
Base.prototype.index = function () {
var children = this.elements[0].parentNode.children;
for (var i = 0; i < children.length; i ++) {
	if (children[i] == this.elements[0]) return i;
}
};



//设置节点元素的透明度
Base.prototype.opacity = function (num) {
for (var i = 0; i < this.elements.length; i ++) {
	this.elements[i].style.opacity = num / 100;
	this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
}
return this;
};

//延迟加载
//获取某个节点的属性 （此处用于获取图片的alt）
Base.prototype.attr = function (attr) {
return this.elements[0][attr];
};
//获取或设置属性
Base.prototype.attr = function (attr, value) {
for (var i = 0; i < this.elements.length; i ++) {
	if (arguments.length == 1) {
		return this.elements[i].getAttribute(attr);
	} else if (arguments.length == 2) {
		this.elements[i].setAttribute(attr ,value);
	}
}
return this;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//背景色渐变2
/*先不管这个了,先把Jquery搞定再说
Base.prototype.changeColor = function( currentColor,startColor,endColor,time ){
	for (var i = 0; i < this.elements.length; i ++) {

		var _this = this.elements[i];
		var timer = undefined;

		current = getRGB(currentColor);
		start = getRGB(startColor);
		end = getRGB(endColor);
		rate = getRate(start,end);
			
		this.elements[i].setAttribute('timer' ,timer);
		clearInterval(this.elements[i].getAttribute('timer'));
		
		var timer = setInterval(function(){
			
			//console.log(_this);
			//console.log(_this.elements[i].getAttribute('timer'));

			current.r = getCur(start.r, end.r, current.r, rate.r);
			current.g = getCur(start.g, end.g, current.g, rate.g);
			current.b = getCur(start.b, end.b, current.b, rate.b);

			if(Math.abs(parseInt(current.r,16)-parseInt(end.r,16))<=1 && Math.abs(parseInt(current.g,16)-parseInt(end.g,16))<=1 && Math.abs(parseInt(current.b,16)-parseInt(end.b,16))<=1)
			{
				clearInterval(_this.getAttribute('timer'));
			}

		},time)

		console.log(this.elements[i].getAttribute('timer'));
	}
	return this;
}


function getRGB(color)
{	
	//#33FFAA
	//获取颜色值的R,G,B三个通道的色值并转换为16进制整数
   var obj = new Object();
   obj.r = parseInt(color.substr(1,2), 16);
   obj.g = parseInt(color.substr(3,2), 16);
   obj.b = parseInt(color.substr(5,2), 16);
   
   return obj;
}
function getRate(start, end)
{
   var obj = new Object();
   obj.r = Math.abs(start.r - end.r) / 5;
   obj.g = Math.abs(start.g - end.g) / 5;
   obj.b = Math.abs(start.b - end.b) / 5;
   
   return obj;
}
function getCur(startRGB, endRGB, curRGB, rate)
{
   if(startRGB == endRGB)
   {
       return startRGB;
   }
   //根据始末色差决定变化率的正负
   rate = startRGB < endRGB ? rate : -rate;
   //执行变化的代码
	curRGB += rate;
	//临界
   if(curRGB < Math.min(startRGB, endRGB))
   {
       curRGB = Math.min(startRGB, endRGB);
   }
   if(curRGB > Math.max(startRGB, endRGB))
   {
       curRGB = Math.max(startRGB, endRGB);
   }
   
   return curRGB;
}
function returnColor(obj)
{
	//先将变化率转换成整数
   obj.r = Math.round(obj.r);
   obj.g = Math.round(obj.g);
   obj.b = Math.round(obj.b);
   var color = '#';
	//如果小于16单纯 0-9A-F便能表示，此时要补位，要在前面加'0'，否则不用补位
	//toString将number obj.x转换为16进制字符串
   color += (obj.r < 16 ? '0':'') + obj.r.toString(16);
   color += (obj.g < 16 ? '0':'') + obj.g.toString(16);
   color += (obj.b < 16 ? '0':'') + obj.b.toString(16);
   
   return color;
}
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////
//工具库
//我他妈最后加少了两个分号就报错了……
//获取当前同级节点的下一个元素节点
Base.prototype.next = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i] = this.elements[i].nextSibling;
		if (this.elements[i] == null) throw new Error('找不到下一个同级元素节点！');
		if (this.elements[i].nodeType == 3) this.next(); //3指的是空白文本
	}
	return this;
};

//获取当前同级节点的上一个元素节点
Base.prototype.prev = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i] = this.elements[i].previousSibling;
		if (this.elements[i] == null) throw new Error('找不到上一个同级元素节点！');
		if (this.elements[i].nodeType == 3) this.prev();
	}
	return this;
};
//获取当前节点的上一个父级节点
Base.prototype.father = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i] = this.elements[i].parentNode;
		if (this.elements[i] == null) throw new Error('找不到此元素的上一个父节点！');
		if (this.elements[i].nodeType == 3) this.prev();
	}
	return this;
};

//浏览器检测：
(function () {
window.sys = {}; //使外部可以访问闭包里面的内容 alert(sys)，作为属性放到window中，保存浏览器信息对象
var ua = navigator.userAgent.toLowerCase(); //获取浏览器的信息并将信息转成小写
var s; 		//浏览器信息数组，浏览器名称+版本 

if ((/msie ([\d.]+)/).test(ua)) {				//判断IE浏览器
	s = ua.match(/msie ([\d.]+)/);		//msie x.0 , x.0
	sys.ie = s[1];						//只获得版本号
}

if ((/firefox\/([\d.]+)/).test(ua)) {			//判断火狐浏览器
	s = ua.match(/firefox\/([\d.]+)/);	//firefox/xx.xx , xx.xx
	sys.firefox = s[1];
}

if ((/chrome\/([\d.]+)/).test(ua)) {			//判断谷歌浏览器
	s = ua.match(/chrome\/([\d.]+)/);	//chrome/xx.xx , xx.xx
	sys.chrome = s[1];
} 

if ((/opera.*version\/([\d.]+)/).test(ua)) {	//判断opera浏览器
	s = ua.match(/opera.*version\/([\d.]+)/);
	sys.opera = s[1];
}

if ((/version\/([\d.]+).*safari/).test(ua)) {	//判断safari浏览器
	s = ua.match(/version\/([\d.]+).*safari/);
	sys.safari = s[1];
} 

})();

(function (){
window.sys = {};   
var ua = navigator.userAgent.toLowerCase();   
var s;   
(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :   
(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :   
(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :   
(s = ua.match(/opera.*version\/([\d.]+)/)) ? sys.opera = s[1] :   
(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;  	

})(); 


//DOM加载
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	
	//思路1：
	//如果一切就绪便执行doReady
	//清除外部定时器然后执行fn
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	};

	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		//无论采用哪种，基本上用不着了
		/*timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) { 	//loaded是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似于onload
				doReady();
			}
		}, 1);*/

		timer = setInterval(function () { 
			if (document && document.getElementById && document.getElementsByTagName && document.body) {//非主流浏览器DOM加载
				doReady();
			}
		}, 1);
		
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
			}
		);
		
	} else if (sys.ie && sys.ie < 9){ //IE浏览器DOM加载
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
};
//	思路：	DOM加载函数作用是判断DOM加载是否完毕
//			分主流(主流又分IE和标准浏览器)和非主流浏览器两种应对模式
//			非主流用document && document.getElementById && document.getElementsByTagName && document.body是否同时加载完成来判断
//			主流标准浏览器用DOMContentLoaded判断
//			主流IE浏览器用滚动条document.documentElement.doScroll判断



//跨浏览器获取滚动条位置，即上/左边界到视界/所能目视区域的距离
function getScroll() {
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
};
//跨浏览器获取视界大小，即到所能目视区域的距离
function getInner() {
	if (typeof window.innerWidth != 'undefined') {//FF 消除锁屏右侧白边问题，用window.innerWidth取宽...
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {//IE,Chrome 其他浏览器正常取边
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
};

//判断class是否存在
function hasClass(element, className) {
	return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
};

//跨浏览器获取Style
function getStyle(element,attr){
	var value;
	if(typeof window.getComputedStyle !='undefined'){//W3C
		value = window.getComputedStyle(element,null)[attr];
	}
	else if(typeof element.currentStyle != 'undefined'){//IE
		value = element.currentStyle[attr];
	}
	return value;
};

//跨浏览器添加link规则
function insertRule(sheet, selectorText, cssText, position) {
	if (typeof sheet.insertRule != 'undefined') {//W3C
		sheet.insertRule(selectorText + '{' + cssText + '}', position);
	} else if (typeof sheet.addRule != 'undefined') {//IE
		sheet.addRule(selectorText, cssText, position);
	}
};

//跨浏览器移出link规则
function deleteRule(sheet, index) {
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule != 'undefined') {//IE
		sheet.removeRule(index);
	}
};
//获取Event对象
function getEvent(event) {
	return event || window.event;
};

//阻止默认行为
function preDef(event) {
	var ev = getEvent(event);
	if (typeof ev.preventDefault != 'undefined') {//W3C
		ev.preventDefault();
	} else {//IE
		ev.returnValue = false;
	}
};

//删除左后空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g,'');
};

//滚动条清零
function scrollTop() {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
};


//创建cookie
function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date) {
		cookieText += '; expires=' + expires;
	}
	if (path) {
		cookieText += '; expires=' + expires;
	}
	if (domain) {
		cookieText += '; domain=' + domain;
	}
	if (secure) {
		cookieText += '; secure';
	}
	document.cookie = cookieText;
}

//获取cookie
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}

//删除cookie
function unsetCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
}
//////////////////////////////////////////////////////////////////////////////////////////////