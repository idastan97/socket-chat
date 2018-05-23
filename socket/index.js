var db = require('../db/dbRequest');

var users = new Object();

module.exports = (wss) => {
	wss.on('connection', (ws) => {

		ws.id=null;

	    ws.on('message', (message) => {
	    	console.log(message);
	    	var msgJson = JSON.parse(message);
	    	var action = msgJson.action;
	    	// var mes = msgJson.mes;
	    	if (action === "login"){
	    		//console.log(ws);
	    		db.login({ token: msgJson.token, name: msgJson.name }, (err, res) => {
	    			if (err) {
	    				console.log(err);
	    				ws.send('bad');
	    			} else {
	    				ws.id=res;
	    				users[res]=ws;
	    				ws.send('ok');
	    				
	    			}
	    		});
	    	} else if (ws.id) {
	    		if (action === "msg"){
		    		db.sendMsg( {iduser: ws.id, idchat: msgJson.idchat, content: msgJson.content}, (err, res) =>{
		    			if (err) {
		    				ws.send('bad');
		    			} else {
		    				console.log(res);
		    				var i;
		    				for (i=0; i<res.length; i++){
		    					console.log(res[i]);
		    					if (users[res[i].iduser]){
		    						users[res[i].iduser].send(JSON.stringify({iduser: ws.id, idchat: msgJson.idchat, content: msgJson.content}));
		    					}
		    				}
		    			}
		    		});
				} 
				if (action === "join"){
		    		db.joinChat({iduser: ws.id, idchat: msgJson.idchat}, (err, res) => {
		    			if (err) {
		    				ws.send('bad');
		    			} else {
		    				ws.send('ok');
		    			}
		    		});
				}
				if (action === "create") {
					db.createChat({iduser: ws.id, title: msgJson.title, members:msgJson.members}, (err, res) => {
						if (err) {
							ws.send('bad');
						} else {
							ws.send('ok');
						}
					});
				}
				if (action === "read") {
					db.readChat({iduser: ws.id, idchat:msgJson.idchat}, (err, res) => {
						if (err) {
							ws.send('bad');
						} else {
							ws.send('ok');
						}
					});
				}
	    	}
	    	
	    });

	    //send immediatly a feedback to the incoming connection    
	    ws.send('Hi there, I am a WebSocket server');
	});
}