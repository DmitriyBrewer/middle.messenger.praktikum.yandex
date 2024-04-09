import "./index.scss";

import ProfilePrevTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Image from "../../../ui/img";
import LinkComponent from "../../../ui/link";

class ProfilePrevContent extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            image: new Image({
                alt:props.alt,
                src: props.src,
                width:20,
                height:20
            }),
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

class ProfilePrev extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            link: new LinkComponent({
                // href:"",
                text: new ProfilePrevContent({
                    // href:"",
                    alt:"prev",
                    src: "/assets/arrow-left.svg"
                }),
                isRouter: true,
                className:"profilePrev",
                isPrev:true
            }),
        });
    }

    render() {
        return this.compile("{{{ link }}}", {});
    }
}

export default ProfilePrev;
