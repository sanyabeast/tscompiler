var colors = require("colors");
var ts = require("typescript");

class tscompiler {

	constructor () {
		this.fileSystem = require("fs");
		this.getDirectoryTree = require("directory-tree");

		this.processFile = this.processFile.bind(this);
	}

	make (params){
		var srcDirPath = params["source-dir"];
		this.processDir(srcDirPath);
	}

	processDir (srcDirPath) {
		var srcFiles = [];
		var dir = this.getDirectoryTree(srcDirPath);

		this.traverseDir(dir, this.processFile);


	}

	traverseDir (dir, callback){
		for (var a = 0, element; a < dir.children.length; a++){
			element = dir.children[a];

			if (element.type == "directory"){
				this.traverseDir(element, callback);
			} else {
				if (element.extension == ".ts"){
					callback(element);
				}
			}

		}
	}

	processFile (file){
		this.fileSystem.readFile(file.path, "utf-8", function(err, data){
			if (err){
				this.makeError(err);
			} else {
				this.compile(file, data);
			}
		}.bind(this));
	}

	compile(srcFile, tsCode){
		var targetPath = srcFile.path.replace(".ts", ".js");
		var jsCodeData = ts.transpileModule(tsCode, {});

		// console.log(jsCode);

		this.fileSystem.writeFile(targetPath, jsCodeData.outputText, function(err) {
		    if (err) {
		        this.makeError(err);
		    } else {
			    console.log("tscompiler:".yellow, srcFile.path, "success".green);
		    }

		}); 

	}
	

	makeError (err){
		console.log(err);
	}

}


module.exports = new tscompiler();
