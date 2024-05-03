import { expect } from "chai";

describe("Тест Handlebars шаблона", () => {
    it("Корректное отображение формы", () => {
        const html = `
      <form class="vertical formWrapper">
        {{> Title title='Вход'}}
        {{#> FieldWrapper}}
          {{{ login }}}
          {{{ password }}}
        {{/ FieldWrapper}}
        {{#> ButtonWrapper}}
          {{{ button }}}
          {{{ link }}}
        {{/ ButtonWrapper}}
      </form>
    `;

        const formIncluded = html.includes("<form class=\"vertical formWrapper\">");
        expect(formIncluded).to.be.true;

        const titleIncluded = html.includes("{{> Title title='Вход'}}");
        expect(titleIncluded).to.be.true;
    });
});
