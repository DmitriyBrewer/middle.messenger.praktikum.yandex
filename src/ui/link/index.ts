import "./index.scss";
export { default as Link } from "./index.hbs?raw";
import LinkTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";

class LinkComponent extends Block {
    constructor(props) {
        super("div",props);
    }
    render() {
        return this.compile(LinkTemplate, {
            href:this.props.href,
            text:this.props.text
        });
    }
}

export default LinkComponent;
