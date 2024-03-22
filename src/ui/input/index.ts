import "./index.scss";

import InputTemplate from "./index.hbs?raw";
export {default as InputTemplate}  from "./index.hbs?raw";
import Block from "../../lib/test/block";
import { compiledTemplate } from "../../lib/compileTemplate";

class InputComponent extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                change: (event) => props.onChange(event.target.value),
                blur: (event) => props.blur(event.target.value)
                // console.log(props.blur);
                // console.log(event.target.value);}
                // blur: (event) => this.validate(),
            },
            attr: {
                class: "fake"
            }
        });
    }

    render() {
        return compiledTemplate(InputTemplate, {
            type: this.props.type,
            id: this.props.id,
            name: this.props.name,
            placeholder: this.props.placeholder,
            isRequired: this.props.isRequired,
            className: this.props.className,
            autocomplete: this.props.autocomplete,
            pattern: this.props.pattern,
            dir: this.props.dir,
            error:this.props.error
        });
    }

    // validate() {
    //     const inputElement = this.getContent();
    //     if (inputElement) {
    //         console.log(this);
    //         const value = inputElement.value;
    //         if (this.props.type === "text") {
    //             if (value.trim() === "") {
    //                 this.setProps({ error: "Поле не может быть пустым" });
    //             } else {
    //                 this.setProps({ error: "" });
    //             }
    //         } else if (this.props.type === "password") {
    //             if (value.length < 6) {
    //                 this.setProps({ error: "Пароль должен содержать минимум 6 символов" });
    //             } else {
    //                 this.setProps({ error: "" });
    //             }
    //         }
    //     }
    // }

    // componentDidUpdate(oldProps) {
    //     console.log("did");
    //     if (oldProps.error !== this.props.error) {
    //         console.log("did propd");

    //         this.validate();
    //     }
    // }
}

export default InputComponent;
