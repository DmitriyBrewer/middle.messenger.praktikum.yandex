import "./index.scss";

import  ProfileHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Image from "../../../ui/img";

class ProfileHeader extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            image: new Image({
                src:"/assets/union.svg",
                alt:"avatar",
                className:"profileHeader__avatarDefault"
            })
        });
    }
    render() {
        return this.compile(ProfileHeaderTemplate, {
            name: this.props.name
        });
    }
}

export default ProfileHeader;
