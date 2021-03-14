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
		salert("错误","TheGreatestMan 为特殊权限账号",3000,"error");
		window.history.back();
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
				appId:"b39Oe3mhAGl6WwMndUNc8FT8-gzGzoHsz",
				appKey:"RF7TuvH9B1756XJ8Xw0w6hOE",
				server:"https://b39oe3mh.lc-cn-n1-shared.com"
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
			}).catch(console.error);
		});
	});
});