import { expect } from "chai";

describe("HTML Template Test", () => {
    it("Должен содержать правильный класс и местозаполнитель", () => {
        const htmlString = "<h1 class=\"title\">{{title}}</h1>";
        const expectedClass = "title";
        const expectedPlaceholder = "{{title}}";

        expect(htmlString).to.include(`class="${expectedClass}"`);

        expect(htmlString).to.include(expectedPlaceholder);
    });
});
