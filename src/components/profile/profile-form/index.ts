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
                        (props as {api: (arg:Record<string, string>)=>void}).api(formDataObject);
                    });
                }
            }
        });
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.userData !== newProps.userData) {
            (this.children.profileParamList as Block).setProps(newProps.userData);
        }
        return true;
    }

    render() {
        return this.compile(ProfileFormTemplate, {});
    }
}

export default ProfileForm;
