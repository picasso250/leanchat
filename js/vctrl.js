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
	var lsv=window.localStorage.getItem("version");
	$.ajax({
		url: "../version/version.json",
		success: function(res){
			if(res.version==lsv)
				return;
			else{
				window.localStorage.removeItem("roomid");
				window.localStorage.setItem("version",res.version);
				salert("更新成功","已成功更新",1000,"success");
				setInterval(function(){
					window.location="../";
				},1000)
			}
		},
		error: function(x,e){
			salert("错误",`获取最新版本失败！详细信息：${e}`,500,"error");
		}
	})
});