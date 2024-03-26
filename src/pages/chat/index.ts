import "./index.scss";
import Block from "../../lib/test/block";
import ChatTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";

const mockChats = [
    {
        title: "Chat1",
        message: "Last message 1s",
        time: "10:30",
        counter: 4,
    },
    {
        title: "Chat2",
        message: "Last message 2",
        time: "11:45",
        counter: 2,
    },
    {
        title: "Chat3",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat4",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat5",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat6",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat7",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat8",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat9",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat10",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat11",
        message: "Last message 3",
        time: "13:15",
        counter: 5,
    },
    {
        title: "Chat12",
        message: "Last message 3",
        time: "Пн",
        counter: 4,
    },
];

class ChatPage extends Block {
    constructor(props) {
        super("div",{
            ...props,
            events: props.events,
            sidebar: new Sidebar({data: mockChats}),
            window: new ChatWindow({
                activeChat: mockChats[0]
            })
        });
    }

    render() {
        console.log(this);
        return this.compile(ChatTemplate, {});
    }

}

export default ChatPage;
