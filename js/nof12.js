document.onkeydown = function () {
	if(window.location.host=="127.0.0.1:8848") //debug mode
		return;
	function salert(ti,txt,dur,type){
		Swal.fire({
			title:ti,
			icon:type,
			text:txt,
			timer:dur,
			timerProgressBar:true
		});
	}
	var e = window.event || arguments[0];
	if (e.keyCode == 123) {
		salert("错误","操作被禁止",1000,"error");
		return false;
	}
	else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
		salert("错误","操作被禁止",1000,"error");
		return false;
	}
	else if((e.ctrlKey)&&(e.keyCode == 85)) {
		salert("错误","操作被禁止",1000,"error");
		return false;
	}
	else if((e.shiftKey) && (e.keyCode == 121)) {
		salert("错误","操作被禁止",1000,"error");
		return false;
	}
	document.oncontextmenu = function(){
		salert("错误","操作被禁止",1000,"error");
		return false;
	}
}
document.oncontextmenu = function () {
	if(window.location.host=="127.0.0.1:8848")
		return;
	function salert(ti,txt,dur,type){
		Swal.fire({
			title:ti,
			icon:type,
			text:txt,
			timer:dur,
			timerProgressBar:true
		});
	}
	salert("错误","操作被禁止",1000,"error");
	return false;
}