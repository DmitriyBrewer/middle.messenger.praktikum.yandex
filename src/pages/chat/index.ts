import "./index.scss";
import Block from "../../lib/test/block";
// export { default as ChatPage } from "./index.hbs?raw";
import ChatTemplate from "./index.hbs?raw";
import { compiledTemplate } from "../../lib/compileTemplate";
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
