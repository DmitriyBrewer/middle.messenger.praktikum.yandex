import "./index.scss";
// export { default as ChatWindow } from "./index.hbs?raw";
import  ChatWindowTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";


const dafeaultWindowTemplate = "<div class=\"nochat\">Выберите чат чтобы отправить сообщение</div>";

class ChatWindow extends Block {
    constructor(props) {
        super("span", props); 
    }

    render() {
        console.log(this);
        return this.compile(ChatWindowTemplate, {
            empty:false,
            title: this.props.activeChat.title
        });
    }
}


export default ChatWindow;
