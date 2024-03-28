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
                    const formData = new FormData(this.element as HTMLFormElement);
                    const formDataObject: Record<string, string> = {};
                    formData.forEach((value, key) => {
                        if (typeof value === "string") {
                            formDataObject[key] = value;
                        } else if (value instanceof File) {
                            formDataObject[key] = "File uploaded";
                        }
                    });
                    console.log("Данные формы:", formDataObject);
                    this.clearForm();
                }
            },
            login: new TextFieldComponent({
                type: "text",
                id: "login",
                name: "login",
                placeholder: "Логин",
                helper: "Логин",
                autocomplete: "username",
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
