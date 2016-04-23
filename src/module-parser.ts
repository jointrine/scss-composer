import {IConfigDeclaration} from "./config-loader";

export class ModuleParser {
  
  public parse(declaration: IConfigDeclaration): IConfiguration {
    const configuration = {
      modules: []
    };
    for (var name in declaration.modules) {
      if (declaration.hasOwnProperty(name)) {
        var element = declaration.modules[name];
        const module = new Module(name, element);
        configuration.modules.push(module);
      }
    }
    
    return configuration;
  }
}

export interface IConfiguration {
  modules: Module[];
}

export class Module {
  public name: string;
  public fileName: string;
  public includeFiles: string[];
  public content: string;
  
  private static _fileCheckRegex = /\.scss$/;
  
  constructor(name: string, includes: string[]) {
    const nameConfiguration = this._parseNameConfig(name);
    this.name = nameConfiguration.name;
    this.fileName = nameConfiguration.fileName;
    this.includeFiles = includes;
  }
  
  private _parseNameConfig(raw: string) {
    const isFileName = Module._fileCheckRegex.test(raw);
    return {
      name: isFileName ? raw.replace(Module._fileCheckRegex, "") : raw,
      fileName: isFileName ? raw : `${raw}.scss`
    }
  }
}