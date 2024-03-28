import TextFieldComponent from "../../components/text-field";
import { conditions } from "../../constants/conditions";
import Block, { BlockProps } from "../../lib/block";
import { validationField } from "../../lib/validations/isValidLogin";
import Button from "../../ui/button";
import RegistrationTemplate from "./index.hbs?raw";
class Registration extends Block {
    constructor(props:BlockProps) {
        super("div",{
            ...props,
            events:{
                submit: (event: Event) => {
                    event.preventDefault();
                    this.handleFormData((formDataObject) => {
                        console.log("Данные формы:", formDataObject);
                    });
                }
            },
            email: new TextFieldComponent({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                helper: "Почта",
                required: true,
                // pattern: conditions.email.pattern,
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.email.pattern);
                    const errorText = isValid ? "" : conditions.email.errorText;
                    (this.children.email as Block).setProps({error:errorText});
                }
            }),
            login: new TextFieldComponent({
                type:"text", 
                id:"login",
                name:"login", 
                autocomplete:"username",
                placeholder:"Логин",
                helper: "Логин",
                required: true,
                pattern: conditions.login.pattern,
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.login.pattern);
                    const errorText = isValid ? "" : conditions.login.errorText;
                    (this.children.login as Block).setProps({error:errorText});
                }
            }),
            first_name: new TextFieldComponent({
                type:"text", 
                id:"first_name",
                name:"first_name", 
                placeholder:"Имя",
                helper: "Имя",
                required: true,
                pattern: conditions.name.pattern,
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.name.pattern);
                    const errorText = isValid ? "" : conditions.name.errorText;
                    (this.children.first_name as Block).setProps({error:errorText});
                }
            }),
            second_name: new TextFieldComponent({
                type:"text", 
                id:"second_name",
                name:"second_name", 
                placeholder:"Фамилия",
                helper: "Фамилия",
                required: true,
                pattern: conditions.name.pattern,
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.name.pattern);
                    const errorText = isValid ? "" : conditions.name.errorText;
                    (this.children.second_name as Block).setProps({error:errorText});
                }
            }),
            phone: new TextFieldComponent({
                type:"tel", 
                id:"phone",
                name:"phone", 
                placeholder:"Телефон",
                helper: "Телефон",
                pattern:conditions.phone.patten,
                requre:true,
                autocomplete:"usermane",
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.phone.patten);
                    const errorText = isValid ? "" : conditions.phone.errorText;
                    (this.children.phone as Block).setProps({error:errorText});
                }
            }),
            password: new TextFieldComponent({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"Пароль",
                helper: "Пароль",
                autocomplete:"current-password",
                pattern: conditions.password.pattern,
                required: true,
                blur: (value:string) => {
                    this.setProps({passwordValue:value});
                    const isValid = validationField(value, conditions.password.pattern);
                    const errorText = isValid ? "" : conditions.password.errorText;
                    (this.children.password as Block).setProps({error:errorText, passwordValue:value});
                }
            }),
            password2: new TextFieldComponent({
                type:"password", 
                id:"password2",
                name:"password2", 
                placeholder:"Пароль ещё раз",
                helper: "Пароль ещё раз",
                autocomplete:"current-password",
                pattern: conditions.password.pattern,
                blur: (value:string) => {
                    const passwordValue = this.props.passwordValue;
                    const errorText = value === passwordValue ? "" : "Пароли не совпадают";
                    (this.children.password2 as Block).setProps({error: errorText});
                }
            }),
            button: new Button({
                type: "submit",
                text: "Регистрация",
            }),
        });
    }

    render() {
        return this.compile(RegistrationTemplate, {});
    }
}

class RegistrationPage extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            registrationForm: new Registration({})
        });
    }

    render() {
        return this.compile("{{#> BaseLayout}}{{{ registrationForm }}}{{/ BaseLayout}}", {});
    }
}

export const registrationPage = new RegistrationPage({});




