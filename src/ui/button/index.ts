import "./index.scss";
import Block, { BlockProps } from "../../lib/test/block";
import  ButtonTemplate  from "./index.hbs?raw";
import { compiledTemplate } from "../../lib/compileTemplate";

class ButtonComponent extends Block {
    constructor(props: BlockProps) {
        super("span", props);
    }

    render() {
        return compiledTemplate(ButtonTemplate, {
            type: "submit",
            text: "Вход",
        });
    }
}

export default ButtonComponent;
