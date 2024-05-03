import { expect } from "chai";
import  hello  from "./index";

describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
        expect(hello("mocha")).to.equal("Hello mocha");
    });
});
