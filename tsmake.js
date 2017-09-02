var tscompiler = require("./tscompiler.js");
var params = require(parseArguments(process.argv));
tscompiler.make(params);



function parseArguments(argv){
	var args = argv.splice(2);

	return args[0];
}
