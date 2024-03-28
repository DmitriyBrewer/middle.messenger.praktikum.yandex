import TextFieldComponent from "../../components/text-field";
import { allPartials } from "../../lib/partials";
import { registerHandlebarsPartials } from "../../lib/register";
import Block, {  BlockProps } from "../../lib/block";
import Button from "../../ui/button";
import AuthTemplate from "./index.hbs?raw";

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
                pattern:"^(?=.{1,20}$)[a-zA-Z_\\-]+[0-9_\\-a-zA-Z]*$",
                blur: (value:string) => {
                    // this.validateLogin(value);
                }
            }),
            password: new TextFieldComponent({
                type: "password",
                id: "password",
                name: "password",
                placeholder: "Пароль",
                helper: "Пароль",
                autocomplete: "current-password",
                // pattern:"^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$",
                // pattern: "(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*",
                blur: (value:string) => {
                    // this.validatePassword(value);
                }
            }),
            button: new Button({
                type: "submit",
                text: props.buttonText,
                disabled: false
            })
        });
    }


    

    // componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    //     // TODO исправить ошибки
    //     const isButtonDisabled = newProps.errorLogin !== "" || newProps.errorPassword !== "";
    //     if(oldProps.disabled !== newProps.disabled) {
    //         this.setProps({ disabled: isButtonDisabled });
    //     }
    //     // this.children.password!.setProps({ error: newProps.errorPassword });
    //     // this.children.login!.setProps({ error: newProps.errorLogin });

    //     return true;
    // }

    render() {
        return this.compile(AuthTemplate, {});
    }

    // private validateLogin(value: string): void {
    //     if (value.trim() === "") {
    //         this.setProps({ errorLogin: "Поле не может быть пустым" });
    //     } else {
    //         this.setProps({ errorLogin: "" });
    //     }
    // }

    // private validatePassword(value: string): void {
    //     if (value.length < 6) {
    //         this.setProps({ errorPassword: "Пароль должен содержать минимум 6 символов" });
    //     } else {
    //         this.setProps({ errorPassword: "" });
    //     }
    // }
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
