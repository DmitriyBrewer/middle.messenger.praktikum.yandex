import "./index.scss";
import Block, { BlockProps } from "../../../lib/block";
import  ProfileFormTemplate from "./index.hbs?raw";

class ProfileForm extends Block {
    constructor(props:BlockProps) {
        super("form",{...props,
            events:{
                submit: (event: Event) => {
                    event.preventDefault();
                    this.handleFormData((formDataObject) => {
                        console.log("Данные формы:", formDataObject);
                    });
                }
            }
        });
    }
    render() {
        console.log(this);
        return this.compile(ProfileFormTemplate, {});
    }
}

export default ProfileForm;
