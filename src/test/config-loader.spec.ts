import {expect} from "chai";
import {ConfigLoader} from "../lib/config-loader";
import * as File from "vinyl";

let testConfig = {
  "modules": {
    "mod1": [
      "test/**/*.test",
      "specs/**/*.spec"
    ]
  }
}

describe("config-loader", () => {
  var cf;
  beforeEach(() => {
    cf = new ConfigLoader(new File({
      path: "test/file.test",
      contents: new Buffer(JSON.stringify(testConfig))
    }));
  });
  
  it("loads the configuration", () => {
    expect(cf.configuration).to.deep.equal(testConfig);
  })
})