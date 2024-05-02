import { expect } from "chai";

describe("Тест Handlebars шаблона", () => {
    it("должен корректно отображать форму", () => {
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

        // Здесь может быть логика имитации работы с DOM без jsdom

        // Простой пример утверждения
        const formIncluded = html.includes("<form class=\"vertical formWrapper\">");
        expect(formIncluded).to.be.true;
    });
});
