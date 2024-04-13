import "./index.scss";
import ChatTextTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Image from "../../../ui/img";
import { formatDate } from "../../../lib/formatDate";
class ChatText extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            statusImage:  new Image({
                alt:"file",
                src:props.is_read ? "/assets/status.svg" : "/assets/statusNotRead.svg",
            }) 
        }); 
    }

    render() {
        console.log(this);
        return this.compile(ChatTextTemplate, {
            content: this.props.content,
            date:formatDate(this.props.time),
            my:this.props.user_id === this.props.userId,
            statusImage: this.props.statusImage
        });
    }
}

export default ChatText;
