import "./index.scss";

import  ProfileHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/test/block";

class ProfileHeader extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }
    render() {
        return this.compile(ProfileHeaderTemplate, {
            name: this.props.name
        });
    }
}

export default ProfileHeader;
