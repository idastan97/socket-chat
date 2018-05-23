var db = require('./db.js');

module.exports = {

	login: (data, callback) => {
		db.query("SELECT iduser FROM user WHERE token=? AND name=?", [data.token, data.name], (err, res) => {
			if (err){
				callback(err.sqlMessage, null);
				return;
			}
			if (res.length>0){
				callback(null, res[0].iduser);
			} else {
				callback("error", null);
			}
			
		});
	},
	sendMsg: (data, callback) => {
		db.query("SELECT * FROM chat_members WHERE iduser=? AND idchat=?", [data.iduser, data.idchat], (err, res) => {
			if (err){
				console.log(err);
				callback("error", null);
				return;
			}
			if (res.length==0){
				callback("bad", null);
				return;
			}
			db.query("INSERT INTO message (iduser, idchat, content) VALUES (?, ?, ?)", [data.iduser, data.idchat, data.content], (err2, res2) => {
				if (err2){
					callback(err2, null);
					return;
				}
				db.query("SELECT iduser FROM chat_members WHERE idchat=?", [data.idchat], (err3, res3) => {
					if (err3){
						callback(err3, null);
					}
					callback(null, res3);
				});
				
			});
		});
	},
	joinChat: (data, callback) => {
		db.query("INSERT INTO chat_members (iduser, idchat) VALUES (?, ?)", [data.iduser, data.idchat], (err, res) => {
			if (err) {
				console.log(err);
				callback(err, null);
				return;
			}
			callback(null, 'ok')
		});
	}

}