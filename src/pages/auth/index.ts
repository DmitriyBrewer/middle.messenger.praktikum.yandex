import TextFieldComponent from "../../components/text-field";
import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
import Button from "../../ui/button";
import InputComponent from "../../ui/input";
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
            login: new InputComponent({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                error: props.errorLogin,
                onChange: (value) => {
                    this.setProps({buttonText: value});
                },
                blur: (value) => {
                    this.setProps({errorLogin:value});
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
                    this.setProps({errorPassword:value});
                }
            }),
            events: props.events || {}
        });
    }

    // TODO удалить , если не нужно
    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }
        return true;
    }

    render() {
        return compiledTemplate(AuthTemplate, {button: "{{{ button }}}", login: "{{{ login }}}", password: "{{{ password }}}"});
    }

    validate(value) {
        console.log("avlidate");
        console.log(value);
    }
}

export default AuthPage;
