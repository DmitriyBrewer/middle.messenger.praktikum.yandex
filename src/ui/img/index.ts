import Block, { BlockProps } from "../../lib/block";
import  ImageTemplate from "./index.hbs?raw";

class Image extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
    }

    render() {
        return this.compile(ImageTemplate, {
            alt:this.props.alt, 
            src:this.props.src,
            className: this.props.className,
            width:this.props.width,
            height:this.props.height
        });
    }
}

export default Image;
