import "./index.scss";
import  ProfilePageTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";

class ProfilePage extends Block {
    constructor(props) {
        super("div",props);
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}

export default ProfilePage;
