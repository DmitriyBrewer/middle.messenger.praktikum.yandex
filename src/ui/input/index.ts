import "./index.scss";

import InputTemplate from "./index.hbs?raw";
export {default as InputTemplate}  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";

class InputComponent extends Block {
    constructor(props: BlockProps) {
        super("div", {
            ...props,
            events: {
                blur: (event: FocusEvent) => {
                    if (props.blur) {
                        const target = event.target as HTMLInputElement | null;
                        if (target && props.blur) {
                            props.blur(target.value);
                        }
                    }
                },
            },
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

export default InputComponent;
