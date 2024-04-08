import "./index.scss";
import  ProfileHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import InputImageComponent from "../../input-image";
class ProfileHeader extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            // image: new InputImageComponent({
            //     src:"asdas",
            //     className:"imageFile",
            //     type: "file",
            //     id: "avatarInput",
            //     name: "avatar",
            //     placeholder: "Выберите изображение",
            //     isRequired: true,
            //     accept: "image/*", 
            // })
        });

        this.children.image = new InputImageComponent({
            src:props.src,
            className:"imageFile",
            type: "file",
            id: "avatarInput",
            name: "avatar",
            placeholder: "Выберите изображение",
            isRequired: true,
            accept: "image/*", 
        });
    }
    


    render() {
        console.log(this);
        return this.compile(ProfileHeaderTemplate, {
            name: this.props.name
        });
    }
}

export default ProfileHeader;
