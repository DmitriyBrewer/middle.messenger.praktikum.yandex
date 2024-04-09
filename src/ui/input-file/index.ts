import "./index.scss";

import InputTemplate from "./index.hbs?raw";
export {default as InputTemplate}  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";

class InputFileComponent extends Block {
    constructor(props: BlockProps) {
        super("input", {
            ...props,
            type: "file"
        });
    }

    render() { 
        return this.compile(InputTemplate,{
            type: this.props.type,
            id: this.props.id,
            name: this.props.name,
            placeholder: this.props.placeholder,
            isRequired: this.props.isRequired,
            className: this.props.className,
            autocomplete: this.props.autocomplete,
            pattern: this.props.pattern,
            dir: this.props.dir,
        });
    } 
}

export default InputFileComponent;
