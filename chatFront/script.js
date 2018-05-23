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