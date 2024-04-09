import "./index.scss";
import  ProfileHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import InputImageComponent from "../../input-image";
import isEqual from "../../../lib/isEqual";
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
        if(isEqual(oldProps,newProps)) {
            console.log("rerender IMAGE");
            this.children.image.setProps({src:newProps.src});
            // this.props.setProps({name:newProps.name});
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
