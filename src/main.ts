import renderComponent from "./lib/renderComponent";
import Block from "./lib/test/block";
import "./index.scss";
import Button from "./ui/button";
import "../src/layout/base-layout/index.scss";
import InputComponent from "./ui/input";
import {  registerHandlebarsPartials } from "./lib/register";
import { allPartials } from "./lib/partials";
import AuthPage from "./pages/auth";
import TextFieldComponent from "./components/text-field";

registerHandlebarsPartials(allPartials);

class ChatItem extends Block {
    constructor({...props}) {
        super({
            ...props,
        });
    }

    render() {
        return `
      <div>
        <div>{{ name }}</div>
        <div>{{ message }}</div>
      </div>`;
    }
}


const auth  = new AuthPage({
    
});

const textField = new TextFieldComponent({
    type:"text", 
    id:"email",
    name:"email", 
    placeholder:"Почта",
    error: "Соощение об ошибке",
    onChange: (value) => {
        this.setProps({buttonText: value});
    }
});

console.log(textField);

class Page extends Block {
    constructor(props) {
        super({
            ...props,
            button: new Button({
                type: "button",
                text: "Click me ",
                events: {
                    click: () => {
                        console.log("Event for Button");
                    }
                }
            }),
            button2: new Button({
                type: "button2",
                text: "Click me 2",
                events: {
                    click: () => {
                        console.log("Event for Button2");
                    }
                }
            }),
            input: new InputComponent({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                onChange: (value) => {
                    this.setProps({buttonText: value});
                }
            }),
            // auth: new AuthPage({})
            // form: new FormComponent({content:"ss"})
        });
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }
        return true;
    }

    override render() {
        return `{{#> BaseLayout}}      
        {{#> Form}}
        {{{ button }}} 
        {{{ button2 }}} 
        {{{ input }}} 
        {{/ Form}}
        {{/ BaseLayout}}`;
    }
}


const block = new Page({buttonText: "Text button",buttonText2: "Text button2"});

renderComponent(".root", auth);


