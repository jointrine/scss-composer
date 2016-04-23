import File = require("vinyl");
import vfs = require("vinyl-fs");

export class ConfigLoader {
  private _configFile: File;
  private _configuration: IConfigDeclaration;
  
  /**
   *
   */
  constructor(configFileStream: File);
  constructor(configFilePath: string);
  constructor(configFile: any) {
    if(typeof(configFile) === "string") {
      configFile = this._loadConfigFileContent(configFile);
    } else if(!this._isConfigFileValid(configFile)) {
      throw new ConfigLoadingException("Illegal configuration file");
    }
    
    this._configFile = configFile;
  }
  
  private _isConfigFileValid(file): boolean {
    return typeof(file) !== "File" && typeof(file.contents) !== "Buffer";
  }
  
  private _loadConfigFileContent(filePath: string) {
    return vfs.src([filePath]);
  }
  
  public get configuration() {
    if(this._configFile.isStream())
      throw new ConfigLoadingException("Error loading config file");
      
    if(!this._configuration)
      this._configuration = JSON.parse(this._configFile.contents.toString());
    
    return this._configuration;
  }
}

export interface IConfigDeclaration {
  modules: IScssModulesDeclaration;
}

export interface IScssModulesDeclaration {
  [name: string]: string[];
}

export class ConfigLoadingException extends Error {
  /**
   *
   */
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}