import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
import "./index.scss";

import TextFieldTemplate  from "./index.hbs?raw";
import InputComponent from "../../ui/input";
class TextFieldComponent extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                change: (event) => props.onChange(event.target.value),
                blur: (event) => this.validate(),
            },
            attr: {
                class: "fake"
            },
            input: new InputComponent({
                type:props.type,
                id:props.id,
                name: props.name,
                placeholder: props.placeholder,
                isRequired:props.isRequired,
                className: props.className,
                autocomplete: props.autocomplete,
                pattern: props.pattern,
                dir: props.dir,
                onChange: (value) => {
                    console.log(value);
                }
            })
        });
    }

    render() {
        return compiledTemplate(TextFieldTemplate,{
            input:"{{{ input }}}",
          
            error:"ERROR"
        });
    }

    validate() {
        console.log("validate blur");
    }
}

export default TextFieldComponent;
