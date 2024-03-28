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

export const errorPage500 = new ErrorPage({
    title:"500",
    subtitle:"Мы уже фиксим"
});

export const errorPage404 = new ErrorPage({
    title:"404",
    subtitle:"Не туда попали"
});
