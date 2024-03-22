import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
// import InputComponent from "../../ui/input";
import "./index.scss";

import TextFieldTemplate  from "./index.hbs?raw";
import InputComponent from "../../ui/input";

// export { default as TextField } from "./index.hbs?raw";

class TextFieldComponent extends Block {
    constructor(props) {
        super({
            ...props,
            input: new InputComponent({
                type:props.type, 
                id:props.id,
                name:props.password, 
                placeholder:props.placeholder,
                onChange: (value) => {
                    this.setProps({buttonText: 50});
                }
            }),
            events: props.events || {}
        });
    }

    render() {
        return compiledTemplate(TextFieldTemplate, {input: "{{{ input }}}", error:this.props.error});
    }
}

export default TextFieldComponent;
