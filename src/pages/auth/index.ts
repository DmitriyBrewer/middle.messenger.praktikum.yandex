import TextFieldComponent from "../../components/text-field";
import { allPartials } from "../../lib/partials";
import { registerHandlebarsPartials } from "../../lib/register";
import Block, {  BlockProps } from "../../lib/test/block";
import Button from "../../ui/button";
import AuthTemplate from "./index.hbs?raw";

registerHandlebarsPartials(allPartials);

class AuthPage extends Block {
    constructor(props:BlockProps) {
        super("div", {
            ...props,
            login: new TextFieldComponent({
                type: "text",
                id: "login",
                name: "login",
                placeholder: "Логин",
                helper: "Логин",
                autocomplete: "username",
                onChange: (value:string) => {
                    console.log(this);
                    this.setProps({ buttonText: value });
                },
                blur: (value:string) => {
                    this.validateLogin(value);
                }
            }),
            password: new TextFieldComponent({
                type: "password",
                id: "password",
                name: "password",
                placeholder: "Пароль",
                helper: "Пароль",
                autocomplete: "current-password",
                pattern: "(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*",
                onChange: (value:string) => {
                    this.setProps({ buttonText: value });
                },
                blur: (value:string) => {
                    this.validatePassword(value);
                }
            }),
            button: new Button({
                type: "button",
                text: props.buttonText,
                events: {
                    click: (event: Event) => {
                        console.log(event);
                    },
                },
                disabled: true
            })
        });
    }

    componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        // TODO исправить ошибки
        const isButtonDisabled = newProps.errorLogin !== "" || newProps.errorPassword !== "";
        if(oldProps.disabled !== newProps.disabled) {
            this.setProps({ disabled: isButtonDisabled });
        }
        // this.children.password!.setProps({ error: newProps.errorPassword });
        // this.children.login!.setProps({ error: newProps.errorLogin });

        return true;
    }

    render() {
        return this.compile(AuthTemplate, {});
    }

    private validateLogin(value: string): void {
        if (value.trim() === "") {
            this.setProps({ errorLogin: "Поле не может быть пустым" });
        } else {
            this.setProps({ errorLogin: "" });
        }
    }

    private validatePassword(value: string): void {
        if (value.length < 6) {
            this.setProps({ errorPassword: "Пароль должен содержать минимум 6 символов" });
        } else {
            this.setProps({ errorPassword: "" });
        }
    }
}

export const authPage = new AuthPage({
    buttonText: "Вход",
});
