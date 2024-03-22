import TextFieldComponent from "../../components/text-field";
import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
import Button from "../../ui/button";
import  AuthTemplate  from "./index.hbs?raw";

class AuthPage extends Block {
    constructor(props) {
        super({
            ...props,
            events: props.events,
            button: new Button({
                type: "button",
                text: props.buttonText,
                // events: {
                //     click: () => {
                //         console.log("auth submit");
                //     }
                // }
            }),
            login: new TextFieldComponent({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                error: props.errorLogin,
                disabled: props.disabled,
                helper: props.helperLogin,
                onChange: (value) => {
                    this.setProps({buttonText: value});
                },
                blur: (value) => {
                    this.validateLogin(value);
                }
            }),
            password: new TextFieldComponent({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"password",
                helper: props.helperPassword,
                error: props.errorPassword,
                autocomplete:"current-password",
                onChange: (value) => {
                    this.setProps({buttonText: value});
                },
                blur: (value) => {
                    this.validatePassword(value);
                }
            }),
        });
    }

    componentDidUpdate(oldProps, newProps) {
        // if (oldProps.buttonText !== newProps.buttonText) {
        //     this.children.button.setProps({ text: newProps.buttonText });
        // }
        if (oldProps.errorLogin !== newProps.errorLogin) {
            this.children.login.setProps({ error: newProps.errorLogin });
        }
        if (oldProps.errorPassword !== newProps.errorPassword) {
            this.children.password.setProps({ error: newProps.errorPassword });
        }

        const isButtonDisabled = newProps.errorLogin !== "" || newProps.errorPassword !== "";
        this.children.button.setProps({ disabled: isButtonDisabled });
        console.log(isButtonDisabled);
        
        return true;
    }

    render() {
        const authForm = compiledTemplate(AuthTemplate, {button: "{{{ button }}}", login: "{{{ login }}}", password: "{{{ password }}}"});
        return `{{#> BaseLayout}}${authForm}{{/ BaseLayout}}`;
    }

    validateLogin(value) {
        if (value.trim() === "") {
            this.setProps({ errorLogin: "Поле не может быть пустым" });
        } else {
            this.setProps({ errorLogin: "" });
        }     
    }
    

    validatePassword(value) {
        if (value.length < 6) {
            this.setProps({ errorPassword: "Пароль должен содержать минимум 6 символов" });
        } else {
            this.setProps({ errorPassword: "" });
        }
    }
}

export default AuthPage;
