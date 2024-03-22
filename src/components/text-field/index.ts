import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
import "./index.scss";

import TextFieldTemplate  from "./index.hbs?raw";
import InputComponent from "../../ui/input";
import Button from "../../ui/button";
class TextFieldComponent extends Block {
    constructor(props) {
        super({
            ...props,
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
                error: props.error,
                onChange: props.onChange,
                blur: props.blur
            }),
        });
    }

    render() {
        console.log(this.props.error );
        return compiledTemplate(TextFieldTemplate,{
            input:"{{{ input }}}",
            error: this.props.error as string
        });
    }
}

export default TextFieldComponent;
