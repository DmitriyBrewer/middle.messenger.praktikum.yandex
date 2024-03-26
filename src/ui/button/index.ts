import "./index.scss";
import  ButtonTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";

class Button extends Block {
    constructor(props) {
        super("button",props);
    }

    render() {
        return this.compile(ButtonTemplate, {
            type: this.props.type,
            text: this.props.text,
            disabled: this.props.disabled,
            className: this.props.className
        });
    }
}

export default Button;
