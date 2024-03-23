import "./index.scss";

import InputTemplate from "./index.hbs?raw";
export {default as InputTemplate}  from "./index.hbs?raw";
import Block from "../../lib/test/block";

const mockTemplate = `
<div>
{{{ input }}}
</div>`;// class InputComponent extends Block {
//     constructor(props) {
//         super({
//             ...props,
//             events: {
//                 change: (event) => props.onChange(event.target.value),
//                 blur: (event) => props.blur(event.target.value)
//             },
//             attr: {
//                 class: "fake"
//             }
//         });
//     }

//     render() {
//         return this.compile(InputTemplate, {
//             type: this.props.type,
//             id: this.props.id,
//             name: this.props.name,
//             placeholder: this.props.placeholder,
//             isRequired: this.props.isRequired,
//             className: this.props.className,
//             autocomplete: this.props.autocomplete,
//             pattern: this.props.pattern,
//             dir: this.props.dir,
//         });
//     }
// }

// class InputComponent extends Block {
//     constructor(props) {
//         super("div",props);
//     }

//     render() {
//         return this.compile(mockTemplate,{});
//     }
// }

class InputComponent extends Block {
    constructor(props) {
        super("div",{...props,
            events: {
                change: (event) => props.onChange(event.target.value),
                // blur: (event) => props.blur(event.target.value)
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
