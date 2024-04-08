import "./index.scss";
import  ProfileHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import InputImageComponent from "../../input-image";
class ProfileHeader extends Block {
    constructor(props:BlockProps) {
        super("div",props);

        this.children.image = new InputImageComponent({
            src:this.props.src,
            className:"imageFile",
            type: "file",
            id: "avatarInput",
            name: "avatar",
            placeholder: "Выберите изображение",
            isRequired: true,
            accept: "image/*", 
        });
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.src !== newProps.src) {
            this.children.image.setProps({src:newProps.src});
        }
        return true;
    }
    
    render() {
        console.log(this);
        return this.compile(ProfileHeaderTemplate, {
            name: this.props.name
        });
    }
}

export default ProfileHeader;
