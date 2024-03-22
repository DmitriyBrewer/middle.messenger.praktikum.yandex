import TextFieldComponent from "../../components/text-field";
import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
import Button from "../../ui/button";
import  AuthTemplate  from "./index.hbs?raw";

class AuthPage extends Block {
    constructor(props) {
        super({
            ...props,
            button: new Button({
                type: "submit",
                text: props.buttonText,
                events: {
                    click: () => {
                        console.log("auth submit");
                    }
                }
            }),
            login: new TextFieldComponent({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                error: props.errorLogin,
                onChange: (value) => {
                    this.setProps({buttonText: value});
                },
                blur: (value) => {
                    this.validateLogin(value);
                }
            }),
            password: new TextFieldComponent({
                type:"text", 
                id:"password",
                name:"password", 
                placeholder:"password",
                error: props.errorPassword,
                onChange: (value) => {
                    this.setProps({buttonText: value});
                },
                blur: (value) => {
                    this.validatePassword(value);
                }
            }),
            events: props.events || {}
        });
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }
        if (oldProps.errorLogin !== newProps.errorLogin) {
            this.children.login.setProps({ error: newProps.errorLogin });
        }
        if (oldProps.errorPassword !== newProps.errorPassword) {
            this.children.password.setProps({ error: newProps.errorPassword });
        }
        return true;
    }

    render() {
        return compiledTemplate(AuthTemplate, {button: "{{{ button }}}", login: "{{{ login }}}", password: "{{{ password }}}"});
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
