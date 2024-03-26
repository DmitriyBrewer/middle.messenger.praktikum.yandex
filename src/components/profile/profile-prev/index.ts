import "./index.scss";

import ProfilePrevTemplate  from "./index.hbs?raw";
import Block from "../../../lib/test/block";

class ProfilePrev extends Block {
    constructor(props) {
        super("div",props);
    }
    render() {
        console.log(this.props);
        return this.compile(ProfilePrevTemplate, {
            href:this.props.href,
            alt:this.props.alt,
            src: this.props.src
        });
    }
}

export default ProfilePrev;
