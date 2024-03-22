import "./index.scss";
import  ButtonTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";
import { compiledTemplate } from "../../lib/compileTemplate";

class Button extends Block {
    constructor(props) {
        super({
            ...props,
            events: props.events || {}
        });
    }

    render() {
        return compiledTemplate(ButtonTemplate, {
            type: this.props.type === "button" ? "submit" : "reset",
            text: this.props.text || "54",
            disabled: this.props.disabled
        });
    }
}


export default Button;
