var tscompiler = require("./tscompiler.js");
var params = parseArguments(process.argv);
tscompiler.processDir(params.srcDirPath);



function parseArguments(argv){
	var args = argv.splice(2);

	return {
		srcDirPath : args[0]
	}
}
