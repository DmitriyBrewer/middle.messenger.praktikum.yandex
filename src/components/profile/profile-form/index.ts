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
        if(oldProps.userData!==newProps.userData && newProps.userData) {
            (this.children.profileHeader as Block).setProps({
                name:newProps.userData.first_name,
                // TODO мжет изначально отправлять vayterнемного в другом формате ы
                src:newProps.userData.avatar
                // src: "/assets/file.svg"
                // src:newProps.userData.avatar
            });
            (this.children.profileParamList as Block).setProps(newProps.userData);
            console.log(newProps.userData);
        }
        return true;
    }

    render() {
        console.log(this);
        return this.compile(ProfileFormTemplate, {});
    }
}

export default ProfileForm;
