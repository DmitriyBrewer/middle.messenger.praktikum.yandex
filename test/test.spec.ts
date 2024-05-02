import { expect } from "chai";
import { hello } from "./index";

describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
        // Используйте expect с методом to.equal для сравнения результатов
        expect(hello("mocha")).to.equal("Hello mocha");
    });
});
