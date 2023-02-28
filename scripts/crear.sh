#!/bin/bash
#
# COLORS
RED='\033[0;31m'
RED_BOLD='\033[0;31;1m'
GREEN='\033[1;32m'
GREEN_BOLD='\033[1;32m'
CYAN='\033[0;39m'
BLUE='\033[0;34m'
YLL='\033[1;33m'
GREY='\033[0;37m'
NC='\033[0m' # reset

p_red(){
	printf "${RED}$1${NC}"
}

p_grey(){
	printf "${GREY}$1${NC}"
}

p_green(){
	printf "${GREEN}$1${NC}"
}

p_cyan(){
	printf "${CYAN}$1${NC}"
}

p_blue(){
	printf "${BLUE}$1${NC}"
}

p_yellow(){
	printf "${YLL}$1${NC}"
}
# /COLORS
#

help(){
	p_blue "\t🛠  kcs: crear-script\n"
	echo "\t______________________\n"
	echo "Genera un script en src/script de forma automática"
	echo "\n📦 Herramienta interna de KCramSolutions OÜ y de sus filiales\n  (KCRAM SOLUTIONS S.I. | KCRAM SOLUTIONS S.L.)"
	echo "\nUSO:"
	p_green " create-script"
	p_blue "     \t<nombre>\n"
	p_green " yarn crear:script"
	p_blue " \t<nombre>\n"
	p_green " npm run crear:script"
	p_blue " \t<nombre>\n\n"
	echo " 🧰 PARÁMETROS:"
	p_blue "\t<nombre>\t"
	echo "Nombre del script"
	p_green "\t-h      "
	echo "\tMostrar esta ayuda"
	p_grey "\n\n 2023 © KCRAMSOLUTIONS OÜ | KCRAM SOLUTIONS S.I. | KCRAM SOLUTIONS S.L.\n\n"
}

if [ -z $1 ]; then
p_red "\t*************************************\n"
p_red "\t*                                   *\n"
p_red "\t* "; printf "❌❗️  Falta el nombre del script"; p_red "  *\n";
p_red "\t*                                   *\n"
p_red "\t*************************************\n\n"
exit 1
fi

if [ $1 = "-h" ]; then
help
exit 0
fi

if [ $1 = "--help" ]; then
help
exit 0
fi

scriptsDir=src/scripts
scriptName=$1.js
scriptPath=$scriptsDir/$scriptName
mkdir -p $scriptsDir > /dev/null 2> /dev/null
p_grey "		📜 Generando nuevo script de node\n\n"
sleep 1
printf "\t ✅ ";
p_yellow "Nomre del script $scriptName\n"
sleep 1
mkdir $scriptsDir >/dev/null 2>/dev/null
p_blue "\t ✅ Rellenando archivo  $scriptPath\n"
sleep 1
printf "#!/usr/bin/env node\n" > $scriptPath
printf "\nconsole.log('Dentro del script');" >> $scriptPath
sleep 1.5
p_green "\n\t ✅ Terminado \n\n"