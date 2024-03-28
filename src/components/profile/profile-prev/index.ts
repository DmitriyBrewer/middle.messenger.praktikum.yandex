import "./index.scss";

import ProfilePrevTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";

class ProfilePrev extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }
    render() {
        console.log(this.props);
        return this.compile(ProfilePrevTemplate, {
            href:this.props.href,
            alt:this.props.alt,
            src: this.props.src,
            arrowImage: this.props.arrowImage
        });
    }
}

export default ProfilePrev;
