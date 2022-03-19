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
	var name=window.localStorage.getItem("name");
	if(name=="TheGreatestMan"){
		name=undefined;
		window.localStorage.removeItem("name");
		salert("错误","TheGreatestMan 为特殊权限账号",3000,"error");
		window.location="../";
	}
	if(window.localStorage.getItem("roomid")!=undefined){
		window.location="../joinroom";
	}
	if(name==undefined){
		window.location="../";
	}
	var room;
	$("#enterroom").fadeIn(1000);
	$("#setroom").click(function(){
		room=$("#roomname").val();
		if(room==""){
			room=undefined;
			salert("错误","房间名不能为空",2000,"error");
			return;
		}
		$("#enterroom").fadeOut(1000,function(){
			$("#enterroom").remove();
			const {Realtime}=AV;
			const realtime=new Realtime({
				appId:"Ta3vIHMgQoo6FiqsNJKHvJEU-gzGzoHsz",
				appKey:"WWo8Bi5PPL5baVfwfN3vvYsw",
				server:"https://ta3vihmg.lc-cn-n1-shared.com"
			});
			realtime.createIMClient(name).then(function(me){
				me.createConversation({
					members:['TheGreatestMan'],
					name:room,
					unique:false
				}).then(function(conversation){
					$("#idgoeshere").text(conversation.id);
					conversation.quit();
					$("#success").fadeIn(1000);
				});
			}).catch(function(err){
				salert("错误",`无法登录，详细信息：${err}`,10000,"error");
			});
		});
	});
});