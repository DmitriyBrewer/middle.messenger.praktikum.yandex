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
                onChange: (value) => {
                    this.setProps({buttonText: value});
                }
            }),
            password: new TextFieldComponent({
                type:"text", 
                id:"password",
                name:"password", 
                placeholder:"password",
                onChange: (value) => {
                    this.setProps({buttonText: value});
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
}

export default AuthPage;
