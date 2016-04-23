import {Module} from "./module-parser";
import {FileSearcher} from "./file-searcher";

export class ModuleWriter {
  private _fileSearcher: FileSearcher;
  
  constructor() {
    this._fileSearcher = new FileSearcher();
  }
  
  public createModule(module: Module): Module {
    let includedFiles = this._fileSearcher.getFiles(module.includeFiles);
    module.content = this._createContent(includedFiles);
    return module;
  }
  
  private _createContent(includedFiles: string[]): string {
    return includedFiles.reduce((result, file) => {
      return `${result}\r\n@import "${file}";`;
    }, "");
  }
}