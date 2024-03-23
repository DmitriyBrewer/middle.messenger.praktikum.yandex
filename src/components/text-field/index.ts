// import Block from "../../lib/test/block";
// import "./index.scss";

// import TextFieldTemplate  from "./index.hbs?raw";
// import InputComponent from "../../ui/input";

// const mockTemplate = `
// <div>{{{ input }}} </div>`
// class TextFieldComponent extends Block {
//     constructor(props) {
//         super({
//             ...props,
//             // input: new InputComponent({
//             //     type:props.type,
//             //     id:props.id,
//             //     name: props.name,
//             //     placeholder: props.placeholder,
//             //     isRequired:props.isRequired,
//             //     className: props.className,
//             //     autocomplete: props.autocomplete,
//             //     pattern: props.pattern,
//             //     dir: props.dir,
//             //     error: props.error,
//             //     onChange: props.onChange,
//             //     blur: props.blur,
//             // }),
//         });
//     }

//     render() {
//         console.log(this.props.error );
//         return this.compile(TextFieldTemplate,{
//             input:{{{ input }}},
//             error: this.props.error as string,
//             helper: this.props.helper
//         });
//     }
// }

// export default TextFieldComponent;
import Block from "../../lib/test/block";
import "./index.scss";

import TextFieldTemplate  from "./index.hbs?raw";

class TextFieldComponent extends Block {
    constructor(props) {
        super("div",{...props,
            events: {
                change: (event) => props.onChange(event.target.value),
                blur: (event) => props.blur(event.target.value)
            },
        });
    }

    render() { 
        return this.compile(TextFieldTemplate,{
            type:this.props.type,
            id:this.props.id,
            name: this.props.name,
            placeholder:  this.props.placeholder,
            isRequired: this.props.isRequired,
            className:  this.props.className,
            autocomplete:  this.props.autocomplete,
            pattern:  this.props.pattern,
            dir:  this.props.dir,
            error:  this.props.error,
            onChange:  this.props.onChange,
            blur:  this.props.blur,
        });
    } 
}

export default TextFieldComponent;
