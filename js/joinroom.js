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
		$("#enterroom").fadeOut(1000,function(){
			$("#enterroom").remove();
			const {Realtime,Event,TextMessage}=AV;
			const realtime=new Realtime({
				appId:"b39Oe3mhAGl6WwMndUNc8FT8-gzGzoHsz",
				appKey:"RF7TuvH9B1756XJ8Xw0w6hOE",
				server:"https://b39oe3mh.lc-cn-n1-shared.com"
			});
			realtime.createIMClient(name).then(function(me){
				me.getConversation(room).then(function(conversation){
					return conversation.join();
				}).then(function(conversation){
					function getavatarurl(name){
						var avatar='https://avatars.githubusercontent.com/u/10137?v=4';
						fetch(`https://api.github.com/users/${name}`).then(function(res){
							if(res.json().login!=name)
								throw JSON.stringify(res.json());
							avatar=res.json().avatar_url;
						}).catch(console.error);
						return avatar;
					}
					function addmsg(name,txt){
						var url=getavatarurl(name);
						$("#msgs").append(`<div class='item'>
							<img class='ui avatar image' src='${url}'>
							<div class='content'>
							<div class='header'>${name}</div>
							<div id="msggoeshere"></div>
							</div></div>`);
						$("#msggoeshere").text(txt);
						$("#msggoeshere").attr("id","");
					}
					function addsys(txt){
						var url="https://avatars.githubusercontent.com/u/66681986";
						$("#msgs").append(`<div class='item'>
							<img class='ui avatar image' src='${url}'>
							<div class='content' style="height:60px;width:95%">
							<div class='header'>系统消息</div>
							<div id="msggoeshere"></div>
							</div></div>`);
						$("#msggoeshere").text(txt);
						$("#msggoeshere").attr("id","");
					}
					$("#msgs").fadeIn(1000);
					$("#msg").fadeIn(1000);
					me.on(Event.MEMBERS_JOINED,function membersJoinedEventHandler(payload, conversation) {
						addsys(`${payload.members}加入了房间${conversation.id}`);
					});
					me.on(Event.MESSAGE, function(message, conversation) {
					    addmsg(message.from,message.text);
					});
					$("#send").click(function(){
						var sending=$("#msgholder").val();
						$("#msgholder").val("");
						conversation.send(new TextMessage(sending)).then(function(message) {
							addmsg(name,sending);
							salert("成功！","已发送到云端！",500,"success")
						}).catch(console.error);
					});
				}).catch(console.error.bind(console));
			}).catch(console.error);
		});
	});
});