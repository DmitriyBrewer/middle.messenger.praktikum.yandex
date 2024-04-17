import "./index.scss";
import  ErrorPageTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";

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

export class ErrorPage500 extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            error:  new ErrorPage({
                title:"500",
                subtitle:"Мы уже фиксим"
            })
        });
    }
    render() {
        return this.compile("{{{error}}}", {});
    }
}

export class ErrorPage404 extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            error:  new ErrorPage({
                title:"404",
                subtitle:"Не туда попали"
            })
        });
    }
    render() {
        return this.compile("{{{error}}}", {});
    }
}
