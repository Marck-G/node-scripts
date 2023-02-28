const chalk = require("chalk");

function time(){
	const now = new Date();
	let out = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
	out += ` ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`;
	return out;
}

module.exports = {
	log: (...msg)=>{
		console.log(`${time()} `,chalk.green(`::   LOG  ::`), ...msg);
	},

	error: (...msg)=>{
		console.log(`${time()} `,chalk.red(` ::  ERROR ::`), ...msg);
	},

	info: (...msg)=>{
		console.log(`${time()} `,chalk.blue(` ::  INFO  ::`), ...msg);
	}
}