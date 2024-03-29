import "./index.scss";
import Block, { BlockProps } from "../../../lib/block";
import  ProfileFormTemplate from "./index.hbs?raw";

class ProfileForm extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }
    render() {
        return this.compile(ProfileFormTemplate, {});
    }
}

export default ProfileForm;
