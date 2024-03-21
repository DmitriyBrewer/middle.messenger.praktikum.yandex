import renderComponent from "./lib/renderComponent";
import Block from "./lib/test/block";
import "./index.scss";
import Button from "./ui/button";
import AuthPage from "./pages/auth";
import { compiledTemplate } from "./lib/compileTemplate";
import  PageTemplate  from "./index.hbs?raw";

// import { BaseLayout } from "./layout/base-layout";
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

class Input extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                change: (event) => props.onChange(event.target.value),
                blur: (event) => this.validate(),
            },
            attr: {
                class: "fake"
            }
        });
    }

    render() {
        return "<input />";
    }

    validate() {
        console.log("blur");
    }
}

class AuthPages extends Block {
    constructor(props) {
        super(
            props,
        );
    }

    render() {
        console.log(this.props.button);
        return compiledTemplate(AuthPage, {button:this.props.button} );
    }
}


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
            input: new Input({
                label: "input",
                onChange: (value) => {
                    this.setProps({buttonText: value});
                }
            }),
            auth: new AuthPages({}),

        });
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }
        return true;
    }

    override render() {
        const renderedContent = compiledTemplate(PageTemplate, {
            button: "{{{ button }}}",
            button2: "{{{ button2 }}}",
            input: "{{{ input }}}",
            auth: "{{{ auth }}}"
        });
        
        console.log(renderedContent);
        return  renderedContent;
    }
}


const block = new Page({buttonText: "Text button",buttonText2: "Text button2"});

renderComponent(".root", block);


