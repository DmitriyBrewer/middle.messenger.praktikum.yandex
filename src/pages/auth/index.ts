// export { default as AuthPage } from "./index.hbs?raw";
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
                text: "Вход",
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
                onChange: (value) => {
                    this.setProps({buttonText: value});
                }
            }),
            password: new InputComponent({
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

    render() {
        return compiledTemplate(AuthTemplate, {button: "{{{ button }}}", login: "{{{ login }}}", password: "{{{ password }}}"});
    }
}

export default AuthPage;
