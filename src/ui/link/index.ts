import "./index.scss";
export { default as Link } from "./index.hbs?raw";
import LinkTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import router from "../../main";

class LinkComponent extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            events: {click:(event:Event)=>{
                if(props.isRouter) {
                    event.preventDefault();
                    if(props.isPrev) {
                        router.back();
                    } 
                    if(props.isForward) {
                        router.forward();
                    } else router.go(props.href as string);
                }
            }}
        });
    }
    render() {
        return this.compile(LinkTemplate, {
            href:this.props.href,
            text:this.props.text,
            className:this.props.className
        });
    }
}

export default LinkComponent;
