import File = require("vinyl");
import {ConfigLoader} from "./config-loader";
import {ModuleParser, IConfiguration} from "./module-parser";
import {ModuleWriter} from "./module-creator";

export class ScssComposer {
  private _configuration: IConfiguration;
  private _writer: ModuleWriter;
  
  /**
   *
   */
  constructor(file) {
    const declaration = new ConfigLoader(file).configuration;
    this._configuration = new ModuleParser().parse(declaration);
    this._writer = new ModuleWriter();
  }
  
  public writeFiles(): File[] {
    return this._configuration.modules.map((module) => {
      return this._writer.createModule(module);
    }).map((module) => {
      return new File({
        path: module.fileName,
        contents: new Buffer(module.content)
      })
    });
  }
}