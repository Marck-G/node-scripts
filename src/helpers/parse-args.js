/**
 * Parse el array de argumetnos y genera el objeto de salida
 * @param {string[]} argv la lista de argumentos de entrada
 * @returns {obje} el objeto generado
 */
 function parseArgs(argv){
	const args = argv.slice(2);
	let outObjs = {
		argv: args,
		args: args.join(' '),
		value: null,
		values: [],
		version: null
	};
	if(!args || args.length ==0){
		return outObjs;
	}

	const last = args.pop();
	if(!isOpt(last)){
		outObjs.value = last;
	}else{
		const key = parseOpt(last);
		outObjs[key] = (key == 'h' || key == 'help') ? true : null ;
	}
	let currentKey = null;
	for(let i = 0; i < args.length; i++){
		try{
			const item = args[i];
			if(!isOpt(item)){
				// es un valor
				if(currentKey){
					outObjs = addToObj(outObjs, currentKey, item);
				}
			}else{
				// es una opción
				const key = parseOpt(item);
				outObjs[key] = (key == 'h' || key == 'help') ? true : null ;
				currentKey = key;
			}
		}catch(e){
			throw new ParseError('Error al intentar parsear:' + e.message)
		}
	}

	return outObjs;
}

 class ParseError extends Error{
}

 function clone(obj){
	return JSON.parse(JSON.stringify(obj))
}

Object.clone = () => {return clone(this)};

/**
 * Agrega un valor a una propiedad teniendo en cuenta si existe esta,
 * en caso de existir crea un array con ambos valores
 * @param {object} obj el objeto 
 * @param {string} key la propiedad del objeto
 * @param {any} value el valor de la propiedad
 * @returns {object} el nuevo objeto
 */
 function addToObj(obj, key, value){
	const out = clone(obj);
	if(!key in out){
		out[key] = value;
		return out;
	}
	// cuando hay clave comprovamos si hay datos
	const datos = out[key];
	if(datos == undefined || datos == null){
		// asignamos y lo devolvemos
		out[key] = value;
		return out;
	}
	// Si hay datos comprobamos que no sea un array
	if(datos instanceof Array){
		// push y return
		out[key].push(value);
		return out;
	}
	// otro valor
	const data = [datos, value];
	out[key] = data;
	return out;
}

/**
 * Comprueba si la cadena de texto que se le pasa es una opción
 * o no
 * @param {string} opt la opcion a comprobar el estado
 * @returns {bool} si es una opción o no
 */
function isOpt(opt){
	return opt.startsWith('-') || opt.startsWith("--")
}

/**
 * Parsea una opción para convertirla en jsonfriendly
 * @param {string} opt la opción
 * @returns {string} la clave del objeto
 */
function parseOpt(opt){
	let out = opt;
	// eliminamos los guiones -
	[0,0].forEach(()=>{
		out = out.replace('-', '');
	});
	let split = out.split('-');
	out = split[0];
	split = split.slice(1);
	split.forEach(slice=>{
		out+= toCapitalLetter(slice);
	})
	return out;
}
// parseOpt('--hello-world-hi')

 function toCapitalLetter(text){
	let first = text.charAt(0);
	let out = text.substr(1);
	return first.toUpperCase() + out;
}

module.exports = {
	parseArgs
}