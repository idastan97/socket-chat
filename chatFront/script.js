var socket = new WebSocket('ws://localhost:3000');

socket.onopen = function() {
  console.log("Connected.");
};

socket.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

var nameG = null;

function login(){
	var name = document.getElementById("name").value;
	var token = document.getElementById("token").value;
	socket.send(JSON.stringify({action: "login", name: name, token: token}));
	nameG=name;
}

function sendMsg(){
	var idchat = document.getElementById("chat").value;
	var content = document.getElementById("content").value;
	socket.send(JSON.stringify({action: "msg", idchat: idchat, content: content}));
}

function joinChat() {
	var idchat = document.getElementById("join").value;
	socket.send(JSON.stringify({action: "join", idchat: idchat}));
}

function createChat() {
	var title = document.getElementById("create").value;
	var members = document.getElementById("members").value.split(",");

	socket.send(JSON.stringify({action: "create", title: title, members: members}))
}
function readChat() {
	var idchat = document.getElementById("read").value;

	socket.send(JSON.stringify({action: "read", idchat: idchat}));
}
function getNewMesCount() {
	socket.send(JSON.stringify({action:"get_new_mes_count"}));
}

function getAllMessage() {
	var idchat = document.getElementById("get_all_message").value;
	socket.send(JSON.stringify({action:"get_all_message", idchat:idchat}));
}