import File = require("vinyl");
import {ConfigLoader} from "./config-loader";
import {ModuleParser, IConfiguration} from "./module-parser";

export class ScssComposer {
  private _configuration: IConfiguration;
  
  /**
   *
   */
  constructor(file) {
    const declaration = new ConfigLoader(file).configuration;
    this._configuration = new ModuleParser().parse(declaration);
  }
  
  public writeFiles(): File[] {
    return [
      new File({
        path: "./configuration.json",
        contents: new Buffer(JSON.stringify(this._configuration.modules))
      })
    ]
  }
}