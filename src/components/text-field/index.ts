import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
import "./index.scss";

import TextFieldTemplate  from "./index.hbs?raw";
import InputComponent from "../../ui/input";
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
            })
        });
    }

    render() {
        console.log(this.props );
        return compiledTemplate(TextFieldTemplate,{
            input:"{{{ input }}}",
            error: this.props.error 
        });
    }



    // componentDidUpdate(prevProps) {
    //     console.log(prevProps);
    //     if (this.children.input.props.error !== prevProps.input.props.error) {
    //         console.log("update");
    //         this.children.input.setError(this.children.input.props.error);
    //     }
    // }
}

export default TextFieldComponent;
