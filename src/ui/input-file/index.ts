import "./index.scss";

import InputTemplate from "./index.hbs?raw";
export {default as InputTemplate}  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import { profileController } from "../../pages/profile/controller";

class InputFileComponent extends Block {
    constructor(props: BlockProps) {
        super("input", {
            ...props,
            type: "file",
            // events: {
            //     change: (event: Event) => {
            //         const target = event.target as HTMLInputElement;
            //         const files = target.files;
            //         if (files && files.length > 0) {
            //             console.log(files[0]);
            //             const file = files[0];
            //             const element = document.getElementById("avatarFormData");
            //             console.log(element);
            //             console.log(document.forms);

            //             console.log(document.forms.avatarFormData);
            //             // avatarFormData
            //             const formData = new FormData(document.forms.avatarFormData);
            //             console.log(formData);
            //             formData.append("avatar",file);
            //             console.log(formData);

            //             profileController.updateAvatarController(formData);
            //         }
            //     },
            // },
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
