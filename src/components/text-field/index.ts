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
import InputComponent from "../../ui/input";

class TextFieldComponent extends Block {
    constructor(props) {
        super("div",{...props,
            // events: {
            //     change: (event) => props.onChange(event.target.value),
            //     blur: (event) => props.blur(event.target.value)
            // },
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
        });
    } 
}

export default TextFieldComponent;
