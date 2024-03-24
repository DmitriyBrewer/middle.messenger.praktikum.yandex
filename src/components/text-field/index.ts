import Block from "../../lib/test/block";
import "./index.scss";

import TextFieldTemplate  from "./index.hbs?raw";
import InputComponent from "../../ui/input";

class TextFieldComponent extends Block {
    constructor(props) {
        super("div",{...props,
            input: new InputComponent({
                type:props.type,
                id:props.id,
                name: props.name,
                placeholder:  props.placeholder,
                isRequired: props.isRequired,
                className:  props.className,
                autocomplete:  props.autocomplete,
                pattern:  props.pattern,
                dir:  props.dir,
                onChange: props.onChange,
                blur: props.blur,
            })
        });
    }

    render() { 
        console.log(this);
        return this.compile(TextFieldTemplate,{
            error:  this.props.error,
            helper: this.props.helper
        });
    } 
}

export default TextFieldComponent;
