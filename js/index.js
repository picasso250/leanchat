$(document).ready(function(){
	function salert(ti,txt,dur,type){
		Swal.fire({
			title:ti,
			icon:type,
			text:txt,
			timer:dur,
			timerProgressBar:true
		});
	}
	if(!window.localStorage){
		salert("错误","浏览器不支持LocalStorage",10000,"error");
		window.history.back();
	}
	var name;
	$("#entername").fadeIn(1000);
	$("#setname").click(function(){
		name=$("#nickname").val();
		if(name==""){
			name=undefined;
			salert("错误","用户名不能为空",2000,"error");
			return;
		}
		if(name=="TheGreatestMan"){
			name=undefined;
			salert("错误","TheGreatestMan 为特殊权限账号",2000,"error");
			return;
		}
		$("#entername").fadeOut(1000,function(){
			$("#entername").remove();
			$("#roomsetting").fadeIn(1000);
			$("#createroom").click(function(){
				$("#joinroom").attr("class","ui disabled button");
				window.localStorage.setItem("name",name);
				$("#roomsetting").fadeOut(1000,function(){
					window.location="createroom/";
				});
			});
			$("#joinroom").click(function(){
				$("#createroom").attr("class","ui disabled primary button");
				window.localStorage.setItem("name",name);
				$("#roomsetting").fadeOut(1000,function(){
					window.location="joinroom/";
				});
			});
		});
	});
});