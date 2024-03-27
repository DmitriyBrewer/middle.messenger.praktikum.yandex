import "./index.scss";
import  ErrorPageTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";

class ErrorPage extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }

    render() {
        return this.compile(ErrorPageTemplate, {
            title: this.props.title,
            subtitle: this.props.subtitle
        });
    }

}

export default ErrorPage;
