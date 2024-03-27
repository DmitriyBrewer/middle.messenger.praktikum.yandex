import "./index.scss";
import  ProfilePageTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";

class ProfilePage extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}

export default ProfilePage;
