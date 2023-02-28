#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const packPath = require('package-json-path');
const { parseArgs } = require('./helpers/parse-args');
const { log, error, info } = require('./helpers/logger');
const path = require('path');
const configKey = "componentsDir";
const CWD = process.cwd();
const pkgPath = packPath(CWD);
const argObj = parseArgs(process.argv);
const getFromCMD = argObj.componentsDir || argObj.d || false;
const componentName = argObj.value;
const withSass = argObj.s == null || argObj.sass == null || false;

let componentsPath;

if(!componentName){
	error('No se ha pasado un nombre para el componente');
	showHelp(0x1001);
}

if (!getFromCMD) {
	if (!pkgPath) {
		error('No se ha encontrado el package.json en ', CWD);
		console.log(chalk.red('Inicie un projecto de react con npm init'));
		process.exit(0x002);
	}
	const pkgStr = fs.readFileSync(pkgPath);
	info('Cargando el archivo package.json:\n\t', chalk.cyan(pkgPath));
	let pkg;
	try {
		pkg = JSON.parse(pkgStr);
	} catch (e) {
		error('No se ha podido cargar el archivo package.json:')
		console.error('\t', e.message);
		process.exit(0x003);
	}
	if(!pkg.componentsDir){
		error('No se ha encontrado el campo componentsDir en el package.json');
		process.exit(0x0004);
	}
	componentsPath = pkg.componentsDir;
}else{
	componentsPath = getFromCMD;
}
// creamos el componente
const componentDir = path.join(componentsPath, componentName);
const componentFile = path.join(componentDir, componentName);
if(fs.existsSync(componentDir)){
	error('El componente ya existe');
	process.exit(0x2001);
}
try{
	fs.mkdirSync(componentDir)
}catch(e){
	error(e.message);
	process.exit(0x2002);
}
const styleFormat = withSass ? 'scss':'css';
let content = `import react from 'react';\nimport './${componentName}.${styleFormat}';`;
content += `\n export function ${componentName}({}){\n\t return (<div></div>)\n}`;
fs.writeFileSync(`${componentFile}.jsx`, content);
info('Creado archivo JSX');
fs.writeFileSync(`${componentFile}.${styleFormat}`, "");
info(`Creado archivo ${styleFormat.toUpperCase()}`);
console.log(chalk.bgGreen.bold.hex('#000000')('\n\t\t\t   Componente Creado   '))
console.log("\n\n\t\t     mcarrion@kcramsolutions.com")
console.log(chalk.bgHex('#ffc00e').bold.hex('#000000')("\t\t\t    KCRAM SOLUTIONS   "));
console.log(chalk.hex('#a0a0a0')('\t\t\t2023 © KCRAMSOLUTIONS'));
console.log();

/*
	HELP
*/

function showHelp(code = 0){
	console.log('\n  USO: ',chalk.hex('#ffc00e')('react:component'),chalk.blue( '[OPCIONES]'),chalk.green(' <nombre>'));
	console.log("\n  OPCIONES:");
	console.log("    -d,--components-dir", chalk.green(" <dir>"), " ".repeat(10), "Selecionamos la ruta de la carpeta components");
	console.log("    -s,--sass",  " ".repeat(27), "Si usa sass el componente");
	console.log("    <nombre>", " ".repeat(28), "Nombre del componente")
	console.log("\n\n\t\t     mcarrion@kcramsolutions.com")
	console.log(chalk.bgHex('#ffc00e').bold.hex('#000000')("\t\t\t    KCRAM SOLUTIONS   "));
	console.log(chalk.hex('#a0a0a0')('\t\t\t2023 © KCRAMSOLUTIONS'));
	console.log();
}