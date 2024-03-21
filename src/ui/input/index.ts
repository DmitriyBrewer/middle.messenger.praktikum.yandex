import "./index.scss";

import Input  from "./index.hbs?raw";
import Block from "../../lib/test/block";
import { compiledTemplate } from "../../lib/compileTemplate";

class InputComponent extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                change: (event) => props.onChange(event.target.value),
                blur: (event) => this.validate(),
            },
            attr: {
                class: "fake"
            }
        });
    }

    render() {
        return compiledTemplate(Input,{
            type:this.props.type,
            id: this.props.id,
            name: this.props.name,
            placeholder: this.props.placeholder,
            isRequired: this.props.isRequired,
            className: this.props.className,
            autocomplete: this.props.autocomplete,
            pattern: this.props.pattern,
            dir: this.props.dir
        });
    }

    validate() {
        console.log("blur");
    }
}


export default InputComponent;
