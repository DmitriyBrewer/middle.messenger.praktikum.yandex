import TextFieldComponent from "../../components/text-field";
import { allPartials } from "../../lib/partials";
import { registerHandlebarsPartials } from "../../lib/register";
import Block, {  BlockProps } from "../../lib/block";
import Button from "../../ui/button";
import AuthTemplate from "./index.hbs?raw";
import { validationField } from "../../lib/validations/isValidLogin";
import { conditions } from "../../constants/conditions";

registerHandlebarsPartials(allPartials);

class Auth extends Block {
    constructor(props:BlockProps) {
        super("div", {
            ...props,
            events:{
                submit: (event: Event) => {
                    event.preventDefault();
                    this.handleFormData((formDataObject) => {
                        console.log("Данные формы:", formDataObject);
                    });
                }
            },
            login: new TextFieldComponent({
                type: "text",
                id: "login",
                name: "login",
                placeholder: "Логин",
                helper: "Логин",
                autocomplete: "username",
                pattern:conditions.login.pattern,
                required: true,
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.login.pattern);
                    const errorText = isValid ? "" : conditions.login.errorText;
                    (this.children.login as Block).setProps({error:errorText});
                    (this.children.button as Block).setProps({disabled:!isValid});
                }
            }),
            password: new TextFieldComponent({
                type: "password",
                id: "password",
                name: "password",
                placeholder: "Пароль",
                helper: "Пароль",
                autocomplete: "current-password",
                pattern: conditions.password.pattern,
               
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.password.pattern);
                    const errorText = isValid ? "" : conditions.password.errorText;
                    (this.children.password as Block).setProps({error:errorText});
                    (this.children.button as Block).setProps({disabled:!isValid});
                }
            }),
            button: new Button({
                type: "submit",
                text: "Вход",
                disabled: false
            })
        });
    }

    render() {
        return this.compile(AuthTemplate, {});
    }
}

class AuthPage extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            authForm: new Auth({})
        });
    }

    render() {
        return this.compile("{{#> BaseLayout}}{{{ authForm }}}{{/ BaseLayout}}", {});
    }

}

export const authPage = new AuthPage({});
