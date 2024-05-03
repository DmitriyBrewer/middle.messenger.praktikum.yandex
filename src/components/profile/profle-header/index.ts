import "./index.scss";
import  ProfileHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import InputImageComponent from "../../input-image";
import isEqual from "../../../lib/isEqual";
import { profileController } from "../../../pages/profile/controller";
class ProfileHeader extends Block {
    constructor(props:BlockProps) {
        super("div",props);

        this.children.image = new InputImageComponent({
            src:"/assets/union.svg",
            className:"imageFile",
            type: "file",
            id: "avatarInput",
            name: "avatar",
            placeholder: "Выберите изображение",
            isRequired: true,
            accept: "image/*", 
            api:(fileData: File) => {
                profileController.updateAvatarController(fileData);
            }
        });
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(!isEqual(oldProps,newProps)) {
            if(newProps.userData) {
                const userAvatar = (newProps.userData as {avatar: string | null}).avatar;
                this.setProps({
                    name:(newProps.userData as {first_name: string}).first_name, 
                    src: userAvatar ? userAvatar : "/assets/union.svg"
                });
            }
        }
        return true;
    }
    
    render() {
        return this.compile(ProfileHeaderTemplate, {
            name: this.props.name
        });
    }
}

export default ProfileHeader;
