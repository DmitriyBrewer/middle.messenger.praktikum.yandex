import "./index.scss";
import Block, { BlockProps } from "../../lib/test/block";
import  ButtonTemplate  from "./index.hbs?raw";
import { compiledTemplate } from "../../lib/compileTemplate";

class ButtonComponent extends Block {
    constructor(props: BlockProps) {
        super("button", props);
    }

    render() {
        return compiledTemplate(ButtonTemplate, {
            type: this.props.type ||  "submit",
            text: this.props.text || "54",
        });
    }
}

export default ButtonComponent;
