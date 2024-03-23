import "./index.scss";
import  ButtonTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";

class Button extends Block {
    constructor(props) {
        super(props);
    }

    render() {
        return this.compile(ButtonTemplate, {
            type: this.props.type === "button" ? "submit" : "reset",
            text: this.props.text || "54",
            disabled: this.props.disabled
        });
    }
}

export default Button;
