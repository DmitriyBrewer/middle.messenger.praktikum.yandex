import "./index.scss";

import ProfilePrevTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Image from "../../../ui/img";

class ProfilePrev extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            image: new Image({
                href:props.href,
                alt:props.alt,
                src: props.src,
                width:20,
                height:20
            })
        });
    }

    render() {
        return this.compile(ProfilePrevTemplate, {
            href:this.props.href,
            alt:this.props.alt,
            src: this.props.src,
        });
    }
}

export default ProfilePrev;
