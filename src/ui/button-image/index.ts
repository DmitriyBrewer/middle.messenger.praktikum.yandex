import  ButtonImageTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import Image from "../img";

class ButtonImage extends Block {
    constructor(props: BlockProps) {
        super("button",{...props,
            image: new Image({
                alt:props.alt,
                src:props.src,
                width:props.width,
                height:props.height,
                className:props.classNameImage
            })
        });
    }

    render() {
        return this.compile(ButtonImageTemplate, {
            type: this.props.type,
            disabled: this.props.disabled,
            className: this.props.className,
        });
    }
}

export default ButtonImage;
