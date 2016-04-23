import * as glob from "glob";

export class FileSearcher {
  public getFiles(fileGlobs: string[]): string[] {
    return fileGlobs.map(pattern => {
      return <string[]>(glob.sync(pattern));
    }).reduce((total, current) => {
      return total.concat(current);
    });
  }
}