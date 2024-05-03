import { expect } from "chai";

describe("HTML Template Test", () => {
    it("Должен содержать правильный класс и местозаполнитель", () => {
        const htmlString = "<h1 class=\"title\">{{title}}</h1>";
        const expectedClass = "title";
        const expectedPlaceholder = "{{title}}";

        // Проверяем наличие класса
        expect(htmlString).to.include(`class="${expectedClass}"`);

        // Проверяем наличие местозаполнителя
        expect(htmlString).to.include(expectedPlaceholder);
    });
});
