$(document).ready(function () {
	function salert(ti, txt, dur, type) {
		Swal.fire({
			title: ti,
			icon: type,
			text: txt,
			timer: dur,
			timerProgressBar: true
		});
	}
	if (!window.localStorage) {
		salert("错误", "浏览器不支持LocalStorage", 10000, "error");
		window.history.back();
	}
	var name = window.localStorage.getItem("name");
	if (name == "TheGreatestMan") {
		name = undefined;
		window.localStorage.removeItem("name");
		salert("错误", "TheGreatestMan 为特殊权限账号", 3000, "error");
		window.location = "../";
	}
	if (name == undefined) {
		window.location = "../";
	}
	var room;
	function thenwedo() {
		$("#enterroom").remove();
		const { Realtime, Event, TextMessage } = AV;
		const realtime = new Realtime({	
			appId:"Ta3vIHMgQoo6FiqsNJKHvJEU-gzGzoHsz",
				appKey:"WWo8Bi5PPL5baVfwfN3vvYsw",
				server:"https://ta3vihmg.lc-cn-n1-shared.com"
		});
		realtime.createIMClient(name).then(function (me) {
			me.getConversation(room).then(function (conversation) {
				return conversation.join();
			}).then(function (conversation) {
				window.localStorage.setItem("roomid", room);
				function getavatarurl(name) {
					$.ajax({
						url: `https://api.github.com/users/${name}`,
						success: function (ac) {
							$("#imagegoeshere").attr("src", ac.avatar_url);
							$("#imagegoeshere").attr("id", "")
						},
						error: function (x, e) {
							console.warn(e);
							$("#imagegoeshere").attr("src", 'https://avatars.githubusercontent.com/u/10137?v=4');
							$("#imagegoeshere").attr("id", "")
						}
					});
				}
				function addmsg(name, txt) {
					$("#msgs").append(`<div class='item'>
						<img class='ui avatar image' id='imagegoeshere'>
						<div class='content' style="height:60px;width:95%">
						<div class='header' id="namegoeshere"></div>
						<div id="msggoeshere"></div>
						</div></div>`);
					$("#msggoeshere").text(txt);
					$("#msggoeshere").attr("id", "");
					$("#namegoeshere").text(name);
					$("#namegoeshere").attr("id", "");
					getavatarurl(name);
				}
				function addsys(txt) {
					var url = "https://avatars.githubusercontent.com/u/66681986";
					$("#msgs").append(`<div class='item'>
						<img class='ui avatar image' src='${url}'>
						<div class='content' style="height:60px;width:95%">
						<div class='header'>系统消息</div>
						<div id="msggoeshere"></div>
						</div></div>`);
					$("#msggoeshere").text(txt);
					$("#msggoeshere").attr("id", "");
				}
				$("#msgs").fadeIn(1000);
				$("#msg").fadeIn(1000);
				me.on(Event.MEMBERS_JOINED, function membersJoinedEventHandler(payload, conversation) {
					addsys(`${payload.members}加入了房间${conversation.name}[${conversation.id}]`);
				});
				me.on(Event.MESSAGE, function (message, conversation) {
					addmsg(message.from, message.text);
				});
				conversation.queryMessages({
					limit: 100, // limit 取值范围 1~100，默认 20
				}).then(function (messages) {
					console.log(messages)
					// 最新的十条消息，按时间增序排列
					for(var i in messages){
						var msg=messages[i]
						addmsg(msg.from,msg.text)
					}
				}).catch(console.error.bind(console));
				$("#send").click(function () {
					var sending = $("#msgholder").val();
					$("#msgholder").val("");
					conversation.send(new TextMessage(sending)).then(function (message) {
						addmsg(name, sending);
						salert("成功！", "已发送到云端！", 500, "success")
					}).catch(function (err) {
						salert("错误", `无法发送，详细信息：${err}`, 10000, "error");
					});
				});
				$("#exit").click(function () {
					conversation.quit();
					window.localStorage.removeItem("roomid");
					salert("成功", "已退出", 2000, "success");
					setTimeout(function () {
						window.location = window.location;
					}, 2000);
				});
			}).catch(function (err) {
				salert("错误", `无法找到对应房间，详细信息：${err}`, 10000, "error");
			});
		}).catch(function (err) {
			salert("错误", `无法登录系统，详细信息：${err}`, 10000, "error");
		});
	}
	if (window.localStorage.getItem("roomid") != undefined) {
		room = window.localStorage.getItem("roomid");
		thenwedo();
	}
	else {
		$("#enterroom").fadeIn(1000);
		$("#setroom").click(function () {
			room = $("#roomname").val();
			$("#enterroom").fadeOut(1000, thenwedo());
		});
	}
});