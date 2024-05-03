import { expect } from "chai";

describe("Тест Handlebars шаблона", () => {
    it("Корректное отображение блока кнопки", () => {
        const html = `
            <div class="vertical vcenter fullWidth buttonWrapper">
                {{> @partial-block }}
            </div>
        `;

        const buttonWrapperIncluded = html.includes("<div class=\"vertical vcenter fullWidth buttonWrapper\">");
        expect(buttonWrapperIncluded).to.be.true;

        const partialBlockIncluded = html.includes("{{> @partial-block }}");
        expect(partialBlockIncluded).to.be.true;
    });
});
