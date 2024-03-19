import "./index.scss";
import Block from "../../lib/test/block";
import handlebars from "handlebars";
import  ButtonTemplate  from "./index.hbs?raw";

class ButtonComponent extends Block {
    constructor(props) {
        super("span", props);
    }

    render() {
        const template = handlebars.compile(ButtonTemplate);
        console.log(template);
        const html = template({
            type: "submit",
            text: "Вход",
        });
        return html;
    }
}

export default ButtonComponent;
