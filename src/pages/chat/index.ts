import "./index.scss";
import Block from "../../lib/test/block";
import ChatTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";

class ChatPage extends Block {
    constructor(props) {
        super("div",{
            ...props,
            events: props.events,
            sidebar: new Sidebar({}),
        });
    }

    render() {
        return this.compile(ChatTemplate, {});
    }

}

export default ChatPage;
