import through = require("through2");
import {ScssComposer} from "./scss-composer";

function composer() {
  return through.obj(function(file, encoding, callback) {
    let fileStream = this;
    if(file.isBuffer()) {
      const composer = new ScssComposer(file);
      composer.writeFiles().forEach(file => {
        fileStream.push(file);
      });
      console.log("changed file")
    } else {
      fileStream.push(file);
    }
    
    console.log("wrote file");
    callback();
  });
}

export = composer;